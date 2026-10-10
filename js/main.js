/* Mellow Hours — core: helpers, frame loop, hash router with the "blanket" page transition, loader, cursor, hours, idle. */
(function () {
  'use strict';
  const M = window.M = {};
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v)), lerp = (a, b, t) => a + (b - a) * t, damp = (a, b, k, dt) => lerp(a, b, 1 - Math.exp(-k * dt));
  const wait = ms => new Promise(r => setTimeout(r, ms)), nextFrame = () => new Promise(r => requestAnimationFrame(() => r()));
  const Q = new URLSearchParams(location.search);
  const S = { vw: innerWidth, vh: innerHeight, mx: .5, my: .5, mouse: false, t: 0, idle: 0, page: 'home', hour: 'evening' };
  Object.assign(M, { $, $$, clamp, lerp, damp, wait, S, Q, mods: [] });

  const PAGES = {
    home: { title: 'Mellow Hours — soft things for slow brands', c: '#FFD98A', c2: '#FFB48A', label: 'the room' },
    work: { title: 'Work — Mellow Hours', c: '#A9C3A1', c2: '#E4EED6', label: 'work' },
    about: { title: 'About — Mellow Hours', c: '#FFB48A', c2: '#FFD9BE', label: 'about' },
    hello: { title: 'Hello — Mellow Hours', c: '#D9663F', c2: '#F09A70', label: 'hello' }
  };

  /* ---------- toast ---------- */
  let toastT = 0;
  M.toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600); };

  /* ---------- the blanket: two scalloped quilts slide over the screen, the page swaps underneath, they slide away ---------- */
  const bl = { el: $('#blanket'), a: $('#blanket .b1'), b: $('#blanket .b2'), label: $('#blanket .bl-label') };
  const EASE = 'cubic-bezier(.72,0,.2,1)', DUR = 820;
  const blanketH = () => { const r = clamp(innerWidth * 0.05, 22, 64); bl.el.style.setProperty('--r', r + 'px'); return innerHeight + r; };
  const slide = (l, from, to, delay) => {
    const a = l.animate([{ transform: `translateY(${from}px)` }, { transform: `translateY(${to}px)` }], { duration: DUR, delay, easing: EASE, fill: 'both' });
    return a.finished.then(() => { l.style.transform = `translateY(${to}px)`; a.cancel(); });
  };
  async function cover(page) {
    const H = blanketH();
    bl.a.style.setProperty('--bc', page.c); bl.b.style.setProperty('--bc', page.c2); bl.label.textContent = page.label; bl.el.classList.add('on');
    await Promise.all([slide(bl.b, H, 0, 0), slide(bl.a, H, 0, 120)]);
  }
  async function reveal() {
    const H = blanketH();
    await Promise.all([slide(bl.a, 0, -H, 0), slide(bl.b, 0, -H, 120)]);
    bl.el.classList.remove('on');
  }

  /* ---------- router ---------- */
  let busy = false;
  const routeOf = () => { const h = location.hash.replace(/^#\/?/, ''); return PAGES[h] ? h : 'home'; };
  function moveInd() {
    const a = $('#nav a.on'), ind = $('#nav .ind'); if (!a) return;
    ind.style.width = a.offsetWidth + 'px'; ind.style.transform = `translateX(${a.offsetLeft}px)`;
  }
  function show(name) {
    S.page = name; document.body.dataset.page = name; document.title = PAGES[name].title;
    $$('.page').forEach(p => p.classList.toggle('on', p.id === 'p-' + name));
    $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.page === name));
    moveInd();
    const pg = $('#p-' + name); pg.scrollTop = 0; pg.classList.remove('enter'); void pg.offsetWidth; pg.classList.add('enter');
    dispatchEvent(new CustomEvent('mh:page', { detail: name }));
  }
  async function navigate() {
    const name = routeOf();
    if (busy || name === S.page) return;
    busy = true;
    dispatchEvent(new CustomEvent('mh:leave'));
    await cover(PAGES[name]); show(name); await nextFrame(); await nextFrame();
    await reveal(); busy = false;
    if (routeOf() !== S.page) navigate();
  }
  addEventListener('hashchange', navigate);
  M.go = name => { if (location.hash !== '#/' + name) location.hash = '#/' + name; };

  /* ---------- hours ---------- */
  const HOURS = ['morning', 'noon', 'evening', 'night'], THEME = { morning: '#F7E4CB', noon: '#FFF0D9', evening: '#F2C9A4', night: '#2A2552' };
  M.setHour = h => {
    if (!HOURS.includes(h)) return;
    S.hour = h; document.documentElement.dataset.hour = h;
    $$('#hours button').forEach(b => b.classList.toggle('on', b.dataset.h === h));
    $('meta[name=theme-color]').content = THEME[h];
  };
  M.nextHour = () => M.setHour(HOURS[(HOURS.indexOf(S.hour) + 1) % HOURS.length]);

  /* ---------- cursor ---------- */
  const cur = { el: $('#cursor'), lbl: $('#cursor .lbl'), x: -100, y: -100, tx: -100, ty: -100, on: false };
  let lastInput = performance.now();
  const poke = () => { lastInput = performance.now(); };
  addEventListener('pointermove', e => {
    poke(); if (e.pointerType !== 'mouse') return;
    S.mouse = true; S.mx = e.clientX / S.vw; S.my = e.clientY / S.vh; cur.tx = e.clientX; cur.ty = e.clientY;
    if (!cur.on) { cur.on = true; cur.x = cur.tx; cur.y = cur.ty; document.body.classList.add('cursor-on'); }
    const t = e.target.closest && e.target.closest('[data-cursor],[data-tip],a,button,.card,input,textarea');
    const label = t ? (t.dataset.cursor || (t.dataset.tip || '').split('|')[0]) : '';
    cur.el.classList.toggle('hot', !!t); cur.el.classList.toggle('lab', !!label); if (cur.lbl.textContent !== label) cur.lbl.textContent = label;
  }, { passive: true });
  addEventListener('pointerdown', e => { poke(); cur.el.classList.add('down'); S.hint = true; document.body.classList.add('touched'); });
  addEventListener('pointerup', () => cur.el.classList.remove('down'));
  M.cursorReset = () => cur.el.classList.remove('hot', 'lab');
  addEventListener('mh:leave', M.cursorReset);
  ['keydown', 'wheel', 'touchstart'].forEach(ev => addEventListener(ev, poke, { passive: true }));
  document.addEventListener('mouseleave', () => { cur.el.classList.add('away'); });
  document.addEventListener('mouseenter', () => { cur.el.classList.remove('away'); });

  /* ---------- loop ---------- */
  let last = performance.now();
  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; S.t += dt; S.idle = (now - lastInput) / 1000;
    if (cur.on) { cur.x = damp(cur.x, cur.tx, 22, dt); cur.y = damp(cur.y, cur.ty, 22, dt); cur.el.style.transform = `translate3d(${cur.x.toFixed(1)}px,${cur.y.toFixed(1)}px,0)`; }
    const sleepy = S.idle > 7 && S.page === 'home' && !document.hidden;
    if (sleepy !== document.body.classList.contains('sleepy')) document.body.classList.toggle('sleepy', sleepy);
    for (const m of M.mods) if (m.frame) m.frame(dt, S.t);
    requestAnimationFrame(loop);
  }

  let rz = 0;
  addEventListener('resize', () => {
    clearTimeout(rz); rz = setTimeout(() => { S.vw = innerWidth; S.vh = innerHeight; moveInd(); M.mods.forEach(m => m.resize && m.resize()); }, 120);
  });

  /* ---------- About counters, Hello form, email chip ---------- */
  function counters() {
    $$('.cnt').forEach(el => {
      const to = +el.dataset.to, t0 = performance.now();
      const step = now => { const k = clamp((now - t0) / 1400, 0, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
  addEventListener('mh:page', e => { if (e.detail === 'about') setTimeout(counters, 500); });

  function wireHello() {
    const chip = $('#email');
    chip.addEventListener('click', () => {
      const addr = chip.dataset.mail;
      (navigator.clipboard ? navigator.clipboard.writeText(addr) : Promise.reject()).then(() => M.toast('Copied — ' + addr), () => M.toast(addr));
    });
    $('#hf').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.currentTarget, plane = $('#plane');
      plane.classList.remove('fly'); void plane.offsetWidth; plane.classList.add('fly');
      f.classList.add('sent'); f.querySelector('button').textContent = 'Sent ✓';
      M.toast('Sent! (it is a concept site — nobody is reading, but Biscuit approves)');
      setTimeout(() => { f.reset(); f.classList.remove('sent'); f.querySelector('button').textContent = 'Send it off'; }, 3200);
    });
  }

  /* ---------- ?auto — hands-free tour for screen recordings (loops forever; ?auto=3200 sets the dwell in ms) ---------- */
  M.tour = async function tour() {
    const d = +Q.get('auto') || 2600, hold = f => wait(d * f), go = async (name, f) => { M.go(name); await wait(2400); await hold(f); };
    document.body.classList.add('touched');
    for (;;) {
      await go('home', 0); M.setHour('morning'); await hold(1.1);
      M.peek('shelf', true); await hold(1.3); M.peek('shelf', false);
      M.setHour('noon'); await hold(.9);
      M.peek('chair', true); await hold(1); M.peek('chair', false);
      M.setHour('evening'); await hold(.9);
      M.peek('table', true); await hold(1); M.peek('table', false);
      $('.lamp').click(); await hold(.6); $('.lamp').click(); await hold(.4);
      M.setHour('night'); await hold(1);
      $('.cat').click(); await hold(1.2);
      await go('work', 1);
      $('#p-work').scrollTo({ top: 460, behavior: 'smooth' }); await hold(1.4);
      M.work.open(1); await hold(1.7); M.work.swap(1); await hold(1.2); M.work.swap(1); await hold(1.2); M.work.close(); await wait(1000);
      await go('about', 1.2);
      $('#p-about').scrollTo({ top: 520, behavior: 'smooth' }); await hold(1.6);
      await go('hello', 1.8);
    }
  };

  /* ---------- boot ---------- */
  async function boot() {
    $$('[data-art]').forEach(el => { el.innerHTML = M.art[el.dataset.art]; });
    $$('[data-av]').forEach(el => { el.innerHTML = M.art[el.dataset.av]; });
    M.setHour(HOURS.includes(Q.get('hour')) ? Q.get('hour') : 'evening');
    $$('#hours button').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); M.setHour(b.dataset.h); }));
    wireHello();
    M.mods.forEach(m => m.init && m.init());
    show(routeOf());
    requestAnimationFrame(loop);
    const born = performance.now();
    if (Q.has('skip')) { $('#loader').remove(); document.body.classList.add('ready'); }
    else {
      await Promise.race([document.fonts.ready, wait(3000)]);
      await wait(Math.max(0, 1700 - (performance.now() - born)));
      await cover(PAGES[S.page]); $('#loader').remove();
      const r = reveal(); document.body.classList.add('ready'); await r;
    }
    if (Q.has('auto') && M.tour) M.tour();
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
