/* Mellow Hours — the room: parallax, hover tips, the cat, the lamp, the clock, dust, idle mischief. */
(function () {
  'use strict';
  const M = window.M, { $, $$, clamp, damp } = M, S = M.S;
  const R = { grid: null, room: null, tips: null, tipEls: new Map(), pX: 0, pY: 0, cat: null, pupils: null, awakeT: 0, sec: -1, sAng: 0, nextYawn: 0, nextBird: 0, hands: null };

  /* ---------- hover tips: speech bubbles (the shelf fans out polaroids of the work) ---------- */
  function buildTips() {
    R.tips = $('#tips');
    $$('.hot').forEach(el => {
      const [title, sub] = (el.dataset.tip || '').split('|'), polas = el.dataset.kind === 'polas';
      const tip = document.createElement('div'); tip.className = 'tip' + (polas ? ' polas' : ''); tip.dataset.side = el.dataset.side || 'top';
      const fan = polas ? `<div class="fan">${[0, 1, 2].map(i => `<div class="pola" style="--i:${i}"><div class="pa">${M.art.proj[i]}</div><em>${M.projects[i].n}</em></div>`).join('')}</div>` : '';
      tip.innerHTML = `<div class="tip-in">${fan}<b>${title}</b><span>${sub || ''}</span></div>`;
      R.tips.appendChild(tip); R.tipEls.set(el, tip);
      const on = () => tip.classList.add('show'), off = () => tip.classList.remove('show');
      el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') on(); });
      el.addEventListener('pointerleave', off); el.addEventListener('focus', on); el.addEventListener('blur', off);
    });
  }
  M.peek = (key, on) => {
    const el = $('.hot.' + key); if (!el) return;
    el.classList.toggle('peek', on); R.tipEls.get(el).classList.toggle('peek', on);
  };

  /* ---------- little interactions ---------- */
  function hearts() {
    const r = R.cat.getBoundingClientRect(), host = $('#tips');
    for (let i = 0; i < 7; i++) {
      const h = document.createElement('i'); h.className = 'pheart';
      h.style.cssText = `left:${r.left + r.width * (0.18 + Math.random() * 0.3)}px;top:${r.top + r.height * 0.25}px;--dx:${((Math.random() - 0.5) * 90).toFixed(0)}px;--s:${(0.7 + Math.random() * 0.8).toFixed(2)};animation-delay:${(i * 70)}ms`;
      h.innerHTML = '<svg viewBox="0 0 28 24"><path d="M14 22C-6 10 4-4 14 5C24-4 34 10 14 22Z" fill="#E8587A"/></svg>';
      h.addEventListener('animationend', () => h.remove()); host.appendChild(h);
    }
  }
  function wake(ms) { R.cat.classList.add('awake'); clearTimeout(R.awakeT); R.awakeT = setTimeout(() => R.cat.classList.remove('awake'), ms); }
  const ACT = {
    hour: () => M.nextHour(),
    lamp: () => { R.room.classList.toggle('lampoff'); const l = $('.lamp'); l.classList.remove('flick'); void l.offsetWidth; l.classList.add('flick'); },
    pet: () => { hearts(); wake(2600); R.cat.classList.remove('purr'); void R.cat.offsetWidth; R.cat.classList.add('purr'); }
  };

  function setClock(force) {
    const d = new Date(), s = d.getSeconds();
    if (!force && s === R.sec) return;
    R.sAng += R.sec < 0 ? s * 6 : 6; R.sec = s;
    R.hands.h.style.transform = `rotate(${((d.getHours() % 12) + d.getMinutes() / 60) * 30}deg)`;
    R.hands.m.style.transform = `rotate(${d.getMinutes() * 6 + s * 0.1}deg)`;
    R.hands.s.style.transform = `rotate(${R.sAng}deg)`;
  }

  function motes() {
    const host = $('.motes'); let h = '';
    for (let i = 0; i < 26; i++) h += `<i style="left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * 100).toFixed(1)}%;--s:${(2 + Math.random() * 4).toFixed(1)}px;--d:${(9 + Math.random() * 11).toFixed(1)}s;animation-delay:-${(Math.random() * 14).toFixed(1)}s"></i>`;
    host.innerHTML = h;
  }

  function init() {
    R.room = $('.room'); R.grid = $('#grid'); R.cat = $('.cat'); R.pupils = $('.c-pupils', R.cat);
    R.hands = { h: $('.ck-h'), m: $('.ck-m'), s: $('.ck-s') };
    buildTips(); motes(); setClock(true);
    $$('.hot[data-act]').forEach(el => {
      el.addEventListener('click', ACT[el.dataset.act]);
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
    });
    R.cat.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') wake(1e5); });
    R.cat.addEventListener('pointerleave', () => wake(900));
    $$('#nav a[data-hl]').forEach(a => {
      a.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && S.page === 'home') M.peek(a.dataset.hl, true); });
      a.addEventListener('pointerleave', () => M.peek(a.dataset.hl, false));
    });
    addEventListener('mh:leave', () => $$('.hot.peek').forEach(el => { el.classList.remove('peek'); R.tipEls.get(el).classList.remove('peek'); }));
  }

  function frame(dt, t) {
    if (S.page !== 'home') return;
    /* parallax: follows the mouse, drifts on its own when idle / on touch */
    const live = S.mouse && S.idle < 4, tx = live ? (S.mx - 0.5) * 2 : Math.sin(t * 0.35) * 0.7, ty = live ? (S.my - 0.5) * 2 : Math.cos(t * 0.27) * 0.35;
    const nx = damp(R.pX, tx * 16, 4, dt), ny = damp(R.pY, ty * 10, 4, dt);
    if (Math.abs(nx - R.pX) + Math.abs(ny - R.pY) > 0.004) { R.grid.style.setProperty('--px', nx.toFixed(2)); R.grid.style.setProperty('--py', ny.toFixed(2)); }
    R.pX = nx; R.pY = ny;
    /* tips follow their object while it drifts */
    R.tipEls.forEach((tip, el) => {
      if (!tip.classList.contains('show') && !tip.classList.contains('peek')) return;
      const r = el.getBoundingClientRect(), side = tip.dataset.side;
      const x = side === 'right' ? r.right : r.left + r.width / 2, y = side === 'right' ? r.top + r.height / 2 : r.top + r.height * 0.04;
      let cx = x, cy = y;
      if (side !== 'right') {                                   // keep the bubble on screen and clear of the top bar
        const bub = tip.firstChild, w = bub.offsetWidth, h = bub.offsetHeight;
        cx = clamp(x, w / 2 + 12, S.vw - w / 2 - 12); cy = Math.max(y, h + 84);
        tip.style.setProperty('--off', (x - cx).toFixed(1) + 'px');
      }
      tip.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
    });
    /* the cat watches your cursor once awake */
    if (R.cat.classList.contains('awake')) {
      const r = R.cat.getBoundingClientRect(), dx = (S.mx * S.vw - (r.left + r.width * 0.3)) / (S.vw * 0.25), dy = (S.my * S.vh - (r.top + r.height * 0.5)) / (S.vh * 0.25);
      R.pupils.style.transform = `translate(${clamp(dx, -1, 1) * 3.4}px,${clamp(dy, -1, 1) * 2.4}px)`;
    }
    setClock(false);
    /* sleepy mischief: yawns and a passing bird */
    if (document.body.classList.contains('sleepy')) {
      if (t > R.nextYawn) { R.nextYawn = t + 10 + Math.random() * 6; R.cat.classList.add('yawn'); setTimeout(() => R.cat.classList.remove('yawn'), 2400); }
      if (t > R.nextBird) { R.nextBird = t + 16 + Math.random() * 8; const b = $('.bird'); b.classList.remove('fly'); void b.getBoundingClientRect(); b.classList.add('fly'); }
    } else { R.nextYawn = t + 3; R.nextBird = t + 6; }
  }

  M.mods.push({ init, frame });
})();
