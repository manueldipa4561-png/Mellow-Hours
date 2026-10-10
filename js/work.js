/* Mellow Hours — work page: squishy cards with 3D tilt, and a shared-element (FLIP) project sheet. */
(function () {
  'use strict';
  const M = window.M, { $, $$, wait } = M;

  const P = M.projects = [
    { n: 'Tea &amp; Tangle', k: 'Packaging', y: '2026', c: '#CFE0C3', who: 'a loose-leaf tea house', tags: ['Identity', 'Packaging', 'Ritual cards'],
      b: 'They wanted the tins to feel like a quiet afternoon. We cut every leaf by hand, built a cream-and-terracotta tin nobody throws away, and slipped a tiny ritual card inside each one: how long to steep, when to stop checking your phone.' },
    { n: 'Little Loaf', k: 'Brand & web', y: '2026', c: '#FFD98A', who: 'a neighbourhood bakery with a sleepy mascot', tags: ['Brand', 'Website', 'Mascot'],
      b: 'A bread-coloured palette, a loaf that naps while the page loads, and an order form that feels like scribbling on a paper bag. Orders went up. So did naps.' },
    { n: 'Pillow Talk', k: 'App design', y: '2025', c: '#5B4B93', who: 'a bedtime app that tells you to put it down', tags: ['Product design', 'Motion', 'Illustration'],
      b: 'No streaks, no scores, no notifications. One big “sleep now” button that actually locks the phone, and a moon that rises a little slower every night.' },
    { n: 'Moss &amp; Mug', k: 'Café identity', y: '2025', c: '#FFC9A8', who: 'a café with a living-moss wall and no wifi', tags: ['Identity', 'Signage', 'Stickers'],
      b: 'Hand-drawn menus, a mushroom sticker on every takeaway cup, and signage that grows a little greener each season. The wall is real. The wifi is not.' },
    { n: 'Honey Hush', k: 'Candles', y: '2025', c: '#3B2A52', who: 'soy candles for people who whisper', tags: ['Packaging', 'Label design', 'Web'],
      b: 'A deep plum label, a honeycomb pattern you can feel with your thumb, and a box that glows faintly from the inside when you open it in the dark.' },
    { n: 'Soft Launch', k: 'Knitwear', y: '2024', c: '#F4B8C5', who: 'a tiny label launching without a launch', tags: ['Brand', 'Ecommerce', 'Lookbook'],
      b: 'No countdown, no drop. A ball of yarn, two needles, and a shop that opens when the first sweater is finished. It took five months. Nobody minded.' }
  ];
  const TILT = [-1.4, 1.1, -0.8, 1.6, -1.1, 0.9], pad = n => String(n).padStart(2, '0');
  const sh = { el: null, art: null, in: null, cur: -1, busy: false };

  /* ---------- cards ---------- */
  function buildCards() {
    const host = $('#cards');
    host.innerHTML = P.map((p, i) => `<button class="card rise" style="--bg:${p.c};--i:${i + 2};--r:${TILT[i]}deg" data-i="${i}" data-cursor="Open">
      <div class="cv">${M.art.proj[i]}<span class="tag">${p.k}</span></div>
      <div class="cap"><span class="n">${pad(i + 1)}</span><h3>${p.n}</h3><span class="y">${p.y}</span></div></button>`).join('');
    $$('.card', host).forEach(card => {
      card.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg'); card.style.setProperty('--ry', (x * 11).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => { card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); });
      card.addEventListener('click', () => open(+card.dataset.i, card));
    });
  }

  /* ---------- project sheet ---------- */
  function fill(i) {
    const p = P[i];
    $('.sh-k').textContent = `${pad(i + 1)} / ${pad(P.length)} — ${p.k.replace('&amp;', '&')} · ${p.y}`;
    $('.sh-t').innerHTML = p.n; $('.sh-w').textContent = 'for ' + p.who; $('.sh-b').textContent = p.b;
    $('.sh-tags').innerHTML = p.tags.map(t => `<li>${t}</li>`).join('');
    sh.el.style.setProperty('--sb', p.c); sh.el.classList.toggle('dark', i === 2 || i === 4);
    sh.art.innerHTML = M.art.proj[i];
  }
  const ghostFor = (i, r) => {
    const g = document.createElement('div'); g.className = 'ghost'; g.innerHTML = M.art.proj[i];
    Object.assign(g.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' }); document.body.appendChild(g); return g;
  };
  const fly = (g, from, to, r0, r1) => {
    const k = to.width / from.width;
    return g.animate([
      { transformOrigin: '0 0', transform: 'none', borderRadius: r0 + 'px' },
      { transformOrigin: '0 0', transform: `translate(${to.left - from.left}px,${to.top - from.top}px) scale(${k})`, borderRadius: (r1 / k) + 'px' }
    ], { duration: 760, easing: 'cubic-bezier(.2,.9,.2,1)', fill: 'forwards' }).finished;
  };

  async function open(i, card) {
    if (sh.busy) return; sh.busy = true; sh.cur = i; fill(i); M.cursorReset();
    sh.el.classList.add('open'); sh.el.setAttribute('aria-hidden', 'false');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const to = sh.art.getBoundingClientRect(), from = card.querySelector('.cv').getBoundingClientRect();
    sh.art.style.visibility = 'hidden';
    const g = ghostFor(i, to), k = from.width / to.width;
    await g.animate([
      { transformOrigin: '0 0', transform: `translate(${from.left - to.left}px,${from.top - to.top}px) scale(${k})`, borderRadius: (30 / k) + 'px' },
      { transformOrigin: '0 0', transform: 'none', borderRadius: '36px' }
    ], { duration: 760, easing: 'cubic-bezier(.2,.9,.2,1)' }).finished;
    sh.art.style.visibility = ''; g.remove(); sh.busy = false;
  }

  async function close(instant) {
    if (sh.cur < 0 || (sh.busy && !instant)) return;
    const card = $$('.card')[sh.cur];
    if (instant || !card) { sh.el.classList.remove('open'); sh.el.setAttribute('aria-hidden', 'true'); sh.cur = -1; sh.busy = false; return; }
    sh.busy = true; M.cursorReset();
    const from = sh.art.getBoundingClientRect(), to = card.querySelector('.cv').getBoundingClientRect();
    const g = ghostFor(sh.cur, from); sh.art.style.visibility = 'hidden'; sh.el.classList.remove('open'); sh.el.setAttribute('aria-hidden', 'true');
    await fly(g, from, to, 36, 30); g.remove(); sh.art.style.visibility = ''; sh.cur = -1; sh.busy = false;
  }

  async function swap(dir) {
    if (sh.busy || sh.cur < 0) return; sh.busy = true;
    sh.in.style.setProperty('--dir', dir); sh.in.classList.add('out'); await wait(260);
    sh.cur = (sh.cur + dir + P.length) % P.length; fill(sh.cur);
    sh.in.classList.remove('out'); sh.in.classList.add('inn'); await wait(560); sh.in.classList.remove('inn'); sh.busy = false;
  }

  function init() {
    sh.el = $('#sheet'); sh.art = $('.sh-art'); sh.in = $('.sh-in');
    buildCards();
    $('.sh-x').addEventListener('click', () => close());
    $('.sh-prev').addEventListener('click', () => swap(-1)); $('.sh-next').addEventListener('click', () => swap(1));
    addEventListener('keydown', e => {
      if (sh.cur < 0) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') swap(-1); else if (e.key === 'ArrowRight') swap(1);
    });
    addEventListener('mh:leave', () => close(true));
  }

  /* the little people on the About page follow your cursor with their eyes */
  function look() {
    if (M.S.page !== 'about') return;
    $$('.av').forEach(av => {
      const r = av.getBoundingClientRect(), S = M.S, p = $('.av-p', av); if (!p) return;
      const dx = M.clamp((S.mx * S.vw - (r.left + r.width / 2)) / (S.vw * 0.3), -1, 1), dy = M.clamp((S.my * S.vh - (r.top + r.height / 2)) / (S.vh * 0.3), -1, 1);
      p.style.transform = `translate(${(dx * 4).toFixed(1)}px,${(dy * 3.5).toFixed(1)}px)`;
    });
  }

  M.work = { open: i => open(i, $$('.card')[i]), close, swap };
  M.mods.push({ init, frame: look });
})();
