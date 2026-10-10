/* Mellow Hours — every illustration is inline SVG drawn here (no image files, nothing to download). */
(function () {
  'use strict';
  const M = window.M, A = M.art = {};
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* ---------------- the window ---------------- */
  A.frame = `<svg viewBox="0 0 380 300" aria-hidden="true">
    <path fill="#C98B5B" fill-rule="evenodd" d="M10 300V130A180 124 0 0 1 370 130V300ZM34 280V132A156 102 0 0 1 346 132V280Z"/>
    <path fill="none" stroke="#8E5A39" stroke-width="3" d="M10 300V130A180 124 0 0 1 370 130V300"/>
    <path fill="none" stroke="#E7B690" stroke-width="3" d="M34 280V132A156 102 0 0 1 346 132V280"/>
    <rect x="184" y="30" width="12" height="250" fill="#C98B5B"/><rect x="34" y="150" width="312" height="11" fill="#C98B5B"/>
    <path d="M184 30h12v250h-12zM34 150h312v11H34z" fill="none" stroke="#E7B690" stroke-width="2" opacity=".65"/>
    <rect x="0" y="278" width="380" height="22" rx="9" fill="#B8764A"/><rect x="0" y="278" width="380" height="6" rx="3" fill="#E4A978"/>
  </svg>`;

  const stars = (() => { const r = rng(11); let s = ''; for (let i = 0; i < 18; i++) s += `<circle class="st" style="animation-delay:${(r() * 3).toFixed(2)}s" cx="${(8 + r() * 296).toFixed(0)}" cy="${(6 + r() * 118).toFixed(0)}" r="${(0.8 + r() * 1.5).toFixed(1)}" fill="#FFF6D8"/>`; return s; })();
  const cloud = 'M10 42Q-2 40 6 30Q12 20 26 24Q32 6 54 10Q68 0 84 14Q106 10 110 28Q122 34 114 42Z';

  A.glass = `
    <div class="sky"></div>
    <svg class="stars" viewBox="0 0 312 250" aria-hidden="true">${stars}</svg>
    <div class="sun"></div>
    <svg class="moon" viewBox="0 0 60 60" aria-hidden="true"><defs><mask id="mmask"><rect width="60" height="60" fill="#fff"/><circle cx="40" cy="24" r="19" fill="#000"/></mask></defs><circle cx="28" cy="32" r="22" fill="#FFF3C4" mask="url(#mmask)"/></svg>
    <svg class="cloud c1" viewBox="0 0 120 50" aria-hidden="true"><path d="${cloud}" fill="#fff" opacity=".92"/></svg>
    <svg class="cloud c2" viewBox="0 0 120 50" aria-hidden="true"><path d="${cloud}" fill="#fff" opacity=".8"/></svg>
    <svg class="cloud c3" viewBox="0 0 120 50" aria-hidden="true"><path d="${cloud}" fill="#fff" opacity=".7"/></svg>
    <svg class="bird" viewBox="0 0 40 20" aria-hidden="true"><path d="M2 12Q10 0 20 10Q30 0 38 12" fill="none" stroke="#4A2F27" stroke-width="2.4" stroke-linecap="round"/></svg>
    <svg class="hills" viewBox="0 0 312 250" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path fill="#9DBB93" d="M0 250V172Q60 132 130 166T260 150 312 166V250Z"/>
      <g transform="translate(196 134)"><rect x="0" y="10" width="36" height="26" fill="#F6E6CF"/><path d="M-5 12L18-8 41 12Z" fill="#D9663F"/><rect x="26" y="-2" width="6" height="12" fill="#B8764A"/><rect x="12" y="19" width="11" height="17" rx="2" fill="#FFD36B" style="opacity:calc(.3 + var(--lamp) * .7)"/></g>
      <path fill="#6E8F6A" d="M0 250V206Q80 170 170 200T312 190V250Z"/>
      <g fill="#587A55"><circle cx="40" cy="196" r="11"/><rect x="38" y="196" width="4" height="14"/><circle cx="268" cy="186" r="9"/><rect x="266" y="186" width="4" height="12"/></g>
    </svg>`;

  const curt = flip => `<svg viewBox="0 0 90 340" aria-hidden="true" ${flip ? 'style="transform:scaleX(-1)"' : ''}>
    <path fill="#E8A07C" d="M0 0H90C80 70 90 190 64 340H0Z"/>
    <path fill="#F4BA9B" d="M14 0H30C26 100 34 220 22 340H8C16 220 8 100 14 0ZM50 0H62C58 90 70 200 46 340H38C54 210 44 100 50 0Z" opacity=".55"/>
    <path fill="#D98862" d="M0 0H8C4 110 10 230 0 340Z"/>
    <rect x="0" y="196" width="76" height="16" rx="8" fill="#FFD98A"/>
  </svg>`;
  A.curtL = curt(false); A.curtR = curt(true);

  /* ---------------- armchair ---------------- */
  const tuft = [[160, 100], [210, 100], [260, 100], [185, 140], [235, 140], [160, 180], [210, 180], [260, 180]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#C95A34"/>`).join('');
  A.chair = `<svg viewBox="0 0 420 330" aria-hidden="true">
    <path d="M70 288l-12 40h22l10-40zM350 288l12 40h-22l-10-40z" fill="#7B4A32"/><path d="M124 292l-5 34h17l5-34zM296 292l5 34h-17l-5-34z" fill="#5E3623"/>
    <rect x="64" y="28" width="292" height="236" rx="106" fill="#C95A34"/>
    <rect x="86" y="52" width="248" height="196" rx="86" fill="#E27A52"/>
    <path d="M110 70Q210 44 310 70" fill="none" stroke="#F4A67F" stroke-width="6" stroke-linecap="round" opacity=".7"/>
    ${tuft}
    <g stroke="#C95A34" stroke-width="2" stroke-dasharray="3 6" fill="none" opacity=".55"><path d="M160 100l25 40 25-40 25 40 25-40M160 180l25-40 25 40 25-40 25 40"/></g>
    <rect x="20" y="130" width="90" height="162" rx="45" fill="#D9663F"/><rect x="310" y="130" width="90" height="162" rx="45" fill="#D9663F"/>
    <rect x="30" y="138" width="70" height="44" rx="22" fill="#EE9066" opacity=".75"/><rect x="320" y="138" width="70" height="44" rx="22" fill="#EE9066" opacity=".75"/>
    <rect x="70" y="188" width="280" height="80" rx="36" fill="#F09A70"/><rect x="70" y="238" width="280" height="30" rx="15" fill="#D9663F" opacity=".32"/>
    <path d="M86 204Q210 190 334 204" fill="none" stroke="#FFC9A8" stroke-width="5" stroke-linecap="round" opacity=".7"/>
    <rect x="32" y="258" width="356" height="42" rx="16" fill="#C95A34"/><path d="M46 268h328" stroke="#F3B896" stroke-width="2" stroke-dasharray="5 7" opacity=".75"/>
    <g><path fill="#FFD98A" d="M12 120Q60 104 104 126L112 262Q64 276 20 258Z"/><path d="M14 150Q62 134 106 156M16 188Q64 172 108 194M18 226Q66 210 110 232" stroke="#F3B94F" stroke-width="9" fill="none"/>
      <path d="M20 258Q64 276 112 262L112 280Q64 296 22 276Z" fill="#FFE9B0"/><path d="M26 268v14M42 272v14M58 275v14M74 275v14M90 272v14M104 268v14" stroke="#FFD98A" stroke-width="4" stroke-linecap="round"/></g>
    <g transform="rotate(14 306 192)"><rect x="262" y="148" width="84" height="84" rx="28" fill="#A9C3A1"/><rect x="272" y="158" width="64" height="64" rx="20" fill="none" stroke="#FBF1E3" stroke-width="2.4" stroke-dasharray="4 6"/><circle cx="304" cy="190" r="5" fill="#6E8F6A"/></g>
  </svg>`;

  /* ---------------- the cat ---------------- */
  A.cat = `<svg viewBox="0 0 200 140" aria-hidden="true">
    <g class="c-tail"><path d="M150 112C188 108 200 80 184 56" fill="none" stroke="#F2A65A" stroke-width="17" stroke-linecap="round"/><path d="M184 56l-2 4" stroke="#FCE3C0" stroke-width="17" stroke-linecap="round"/></g>
    <g class="c-body"><ellipse cx="102" cy="100" rx="72" ry="38" fill="#F2A65A"/>
      <g stroke="#D9822B" stroke-width="6" stroke-linecap="round" fill="none"><path d="M112 64q-4 14 0 26M132 66q-3 13 1 24M152 72q-2 12 2 20"/></g>
      <ellipse cx="100" cy="126" rx="46" ry="11" fill="#FBD9A5" opacity=".65"/></g>
    <ellipse cx="50" cy="128" rx="17" ry="10" fill="#FCE3C0"/><ellipse cx="82" cy="131" rx="16" ry="9" fill="#FCE3C0"/>
    <g class="c-head">
      <path class="c-ear" d="M30 60L26 20Q44 26 56 44Z" fill="#F2A65A"/><path class="c-ear" d="M90 60L94 20Q76 26 64 44Z" fill="#F2A65A"/>
      <path d="M33 52L32 34Q41 38 48 46Z" fill="#F3A9A0"/><path d="M87 52L88 34Q79 38 72 46Z" fill="#F3A9A0"/>
      <circle cx="60" cy="78" r="36" fill="#F2A65A"/>
      <g stroke="#D9822B" stroke-width="4" stroke-linecap="round" fill="none"><path d="M60 44v10M50 46l2 8M70 46l-2 8"/></g>
      <ellipse cx="60" cy="93" rx="15" ry="11" fill="#FCE3C0"/>
      <path d="M55 86h10l-5 6z" fill="#E58A8A"/>
      <path d="M60 92v3M60 95q-5 5-9 1M60 95q5 5 9 1" stroke="#7B4A32" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path class="c-shut" d="M38 76q7 7 14 0M68 76q7 7 14 0" stroke="#4A2F27" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <g class="c-open"><ellipse cx="45" cy="76" rx="8.5" ry="10" fill="#FFF3C4"/><ellipse cx="75" cy="76" rx="8.5" ry="10" fill="#FFF3C4"/>
        <g class="c-pupils"><ellipse cx="45" cy="77" rx="4.2" ry="7.5" fill="#4A2F27"/><ellipse cx="75" cy="77" rx="4.2" ry="7.5" fill="#4A2F27"/><circle cx="46.5" cy="73" r="1.6" fill="#fff"/><circle cx="76.5" cy="73" r="1.6" fill="#fff"/></g></g>
      <ellipse class="c-yawn" cx="60" cy="99" rx="8" ry="9" fill="#B84E2B"/>
      <ellipse cx="34" cy="90" rx="6" ry="4" fill="#F3A9A0" opacity=".55"/><ellipse cx="86" cy="90" rx="6" ry="4" fill="#F3A9A0" opacity=".55"/>
      <path d="M44 91L22 87M44 95L22 97M76 91L98 87M76 95L98 97" stroke="#fff" stroke-width="1.4" opacity=".75" stroke-linecap="round"/>
    </g>
  </svg>`;

  /* ---------------- floor lamp ---------------- */
  A.lamp = `<svg viewBox="0 0 120 560" aria-hidden="true">
    <defs><linearGradient id="lampSh" x1="0" x2="1"><stop offset="0" stop-color="#F6C98F"/><stop offset=".45" stop-color="#FFEFCF"/><stop offset="1" stop-color="#F2BE82"/></linearGradient></defs>
    <ellipse cx="60" cy="542" rx="46" ry="12" fill="#5A3B2E"/><ellipse cx="60" cy="538" rx="40" ry="9" fill="#7B4A32"/>
    <rect x="56" y="150" width="8" height="390" rx="4" fill="#7B4A32"/><rect x="56" y="150" width="3" height="390" rx="1.5" fill="#A8704E"/>
    <path d="M16 150L40 34Q60 26 80 34L104 150Q60 164 16 150Z" fill="url(#lampSh)"/>
    <path d="M40 34L34 150M60 30V160M80 34L86 150" stroke="#E9B27A" stroke-width="1.5" opacity=".5" fill="none"/>
    <ellipse cx="60" cy="150" rx="44" ry="9" fill="#FFF3C9" opacity=".95"/>
    <path d="M96 150v50" stroke="#C9A15A" stroke-width="2"/><circle cx="96" cy="204" r="4.5" fill="#C9A15A"/>
  </svg>`;

  /* ---------------- side table, books, plant, mug ---------------- */
  A.table = `<svg viewBox="0 0 190 250" aria-hidden="true">
    <path d="M52 128L38 246h16l16-118zM138 128l14 118h-16l-16-118zM95 130v116h13l-3-116z" fill="#8E5A39"/>
    <ellipse cx="95" cy="122" rx="82" ry="14" fill="#B8764A"/><ellipse cx="95" cy="118" rx="82" ry="14" fill="#D49A68"/><ellipse cx="95" cy="116" rx="72" ry="10" fill="#E2B188" opacity=".7"/>
    <g><rect x="22" y="92" width="72" height="16" rx="3" fill="#5B3A57"/><rect x="28" y="78" width="60" height="15" rx="3" fill="#FFD98A"/><rect x="24" y="64" width="64" height="15" rx="3" fill="#A9C3A1"/>
      <path d="M26 100h66M32 86h54M28 72h58" stroke="#fff" stroke-width="1.4" opacity=".5" stroke-dasharray="3 4"/></g>
    <g class="t-plant"><path d="M40 64h32l-5-22H45z" fill="#D9663F"/><path d="M42 50h28" stroke="#F09A70" stroke-width="3"/>
      <path d="M56 44C42 38 40 22 46 16c6 6 12 14 10 28zM56 44C70 38 74 24 68 18c-6 6-12 14-12 26zM56 44C56 30 58 18 56 8c-4 10-4 22 0 36z" fill="#6E8F6A"/></g>
    <g class="t-mug"><path d="M112 66h46v40q0 12-12 12h-22q-12 0-12-12z" fill="#FFF3E0"/><path d="M112 84h46v10h-46z" fill="#E58A5F"/>
      <path d="M158 74q16 0 16 14t-16 14" fill="none" stroke="#FFF3E0" stroke-width="7" stroke-linecap="round"/><ellipse cx="135" cy="67" rx="23" ry="5" fill="#8A5A3C"/>
      <g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".85"><path class="steam s1" d="M124 58q-9-12 0-24t0-24"/><path class="steam s2" d="M138 58q-9-12 0-24t0-24"/><path class="steam s3" d="M152 58q-9-12 0-24t0-24"/></g></g>
  </svg>`;

  /* ---------------- bookshelf (books are generated) ---------------- */
  const shelfSVG = () => {
    const r = rng(7), C = ['#D9663F', '#FFD98A', '#A9C3A1', '#5B3A57', '#F2A65A', '#7F9FB5', '#E58A8A', '#6E8F6A', '#FBF1E3', '#C95A34'];
    const level = (base, hmax, from, to, lean) => {
      let x = from, s = '';
      while (x < to - 14) {
        const w = 13 + r() * 13, h = hmax * (0.62 + r() * 0.34), c = C[(r() * C.length) | 0];
        if (x + w > to) break;
        s += `<g><rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${c}"/><rect x="${(x + 2).toFixed(1)}" y="${(base - h + 8).toFixed(1)}" width="${(w - 4).toFixed(1)}" height="3" fill="#fff" opacity=".4"/><rect x="${(x + 2).toFixed(1)}" y="${(base - 14).toFixed(1)}" width="${(w - 4).toFixed(1)}" height="2" fill="#fff" opacity=".3"/></g>`;
        x += w + 1.5;
      }
      if (lean) s += `<g transform="rotate(14 ${to - 4} ${base})"><rect x="${to - 30}" y="${base - hmax * 0.8}" width="20" height="${hmax * 0.8}" rx="2" fill="#E58A8A"/></g>`;
      return s;
    };
    const board = y => `<rect x="24" y="${y}" width="292" height="12" fill="#C98B5B"/><rect x="24" y="${y}" width="292" height="4" fill="#E2B188"/>`;
    return `<svg viewBox="0 0 340 470" aria-hidden="true">
      <rect x="10" y="40" width="320" height="422" rx="14" fill="#8E5A39"/><rect x="24" y="54" width="292" height="392" rx="6" fill="#6B3F27"/>
      ${level(150, 88, 34, 200, false)}
      <g transform="rotate(-4 243 121)"><rect x="214" y="92" width="58" height="58" rx="4" fill="#FBF1E3"/><rect x="222" y="100" width="42" height="42" fill="#F4B8C5"/><circle cx="240" cy="114" r="9" fill="#FFD98A"/><path d="M222 142l16-16 10 8 16-12v20z" fill="#6E8F6A"/></g>
      ${board(150)}
      <g><path d="M40 260l6-52h26l6 52z" fill="#7F9FB5"/><g stroke="#6E8F6A" stroke-width="3" fill="none" stroke-linecap="round"><path d="M56 210q-8-24-4-40M62 210q-1-30 3-46M68 210q8-24 14-36"/></g><circle cx="52" cy="170" r="5" fill="#FFD98A"/><circle cx="65" cy="164" r="5" fill="#E58A8A"/><circle cx="82" cy="174" r="5" fill="#FFD98A"/></g>
      ${level(260, 90, 100, 262, true)}
      <g><rect x="270" y="222" width="36" height="38" rx="8" fill="#FFF3E0"/><rect x="274" y="214" width="28" height="9" rx="3" fill="#D9663F"/><path d="M286 214l4-6 4 6z" fill="#FFD36B"/></g>
      ${board(260)}
      ${level(370, 90, 34, 214, false)}
      <g><path d="M232 370l6-30h30l6 30z" fill="#D9663F"/><path d="M252 340c-10-8-14-22-8-32 8 6 12 18 8 32zM252 340c10-8 16-20 12-32-8 6-14 16-12 32zM252 340c0-12 2-24-2-34 6 8 6 22 2 34z" fill="#6E8F6A"/></g>
      ${board(370)}
      <g><rect x="38" y="392" width="106" height="54" rx="12" fill="#D4A56B"/><path d="M42 408h98M42 424h98" stroke="#B8864E" stroke-width="3"/><path d="M50 392q40-22 82 0z" fill="#F4B8C5"/></g>
      <g><rect x="160" y="392" width="140" height="54" rx="12" fill="#D4A56B"/><path d="M164 408h132M164 424h132" stroke="#B8864E" stroke-width="3"/><path d="M170 392q60-26 120 0z" fill="#FFD98A"/></g>
      <rect x="10" y="446" width="320" height="16" rx="8" fill="#8E5A39"/>
    </svg>`;
  };
  A.shelf = shelfSVG();

  A.plant = `<svg viewBox="0 0 200 200" aria-hidden="true">
    <path d="M62 196h76l-8-50H70z" fill="#D9663F"/><rect x="58" y="138" width="84" height="16" rx="6" fill="#E58A5F"/><path d="M70 168h60" stroke="#F09A70" stroke-width="4" stroke-linecap="round" opacity=".8"/>
    ${[[-52, '#6E8F6A', 0], [-26, '#7FA073', .4], [0, '#6E8F6A', .8], [26, '#7FA073', .2], [52, '#6E8F6A', .6], [-80, '#5E8059', 1], [80, '#5E8059', .3]].map(l => `<g transform="rotate(${l[0]} 100 142)"><g class="lf" style="animation-delay:-${l[2]}s"><path d="M100 142C74 108 80 56 100 18C120 56 126 108 100 142Z" fill="${l[1]}"/><path d="M100 138V32" stroke="#4D6E49" stroke-width="2.4" opacity=".6"/></g></g>`).join('')}
  </svg>`;

  /* ---------------- wall bits ---------------- */
  A.f1 = `<svg viewBox="0 0 120 150" aria-hidden="true"><rect width="120" height="150" rx="6" fill="#5B3A57"/><rect x="8" y="8" width="104" height="134" rx="3" fill="#FBF1E3"/>
    <rect x="18" y="18" width="84" height="114" fill="#FFD98A"/><circle cx="60" cy="74" r="24" fill="#F4846A"/><path d="M18 132v-28q22-18 42-6t42-8v42z" fill="#6E8F6A"/><path d="M18 132v-12q30-14 84-2v14z" fill="#587A55"/></svg>`;
  A.f2 = `<svg viewBox="0 0 120 150" aria-hidden="true"><rect width="120" height="150" rx="60" ry="60" fill="#C98B5B"/><rect x="8" y="8" width="104" height="134" rx="52" fill="#FBF1E3"/>
    <rect x="16" y="16" width="88" height="118" rx="44" fill="#A9C3A1"/><path d="M60 40c-16 20-20 44 0 70 20-26 16-50 0-70z" fill="#FBF1E3"/><path d="M60 110V52" stroke="#6E8F6A" stroke-width="3"/><circle cx="60" cy="38" r="7" fill="#FFD98A"/></svg>`;
  A.clock = `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="58" fill="#D9663F"/><circle cx="60" cy="60" r="50" fill="#FBF1E3"/><circle cx="60" cy="60" r="44" fill="none" stroke="#E7D3B7" stroke-width="1.6" stroke-dasharray="1 8.2" stroke-linecap="round"/>
    ${[0, 3, 6, 9].map(i => `<rect x="58" y="14" width="4" height="9" rx="2" fill="#4A2F27" transform="rotate(${i * 30} 60 60)"/>`).join('')}
    <g class="ck ck-h"><rect x="57" y="30" width="6" height="34" rx="3" fill="#4A2F27"/></g><g class="ck ck-m"><rect x="58" y="20" width="4" height="44" rx="2" fill="#4A2F27"/></g>
    <g class="ck ck-s"><rect x="59.2" y="16" width="1.8" height="52" rx=".9" fill="#D9663F"/></g><circle cx="60" cy="60" r="4.5" fill="#D9663F"/></svg>`;

  A.rug = `<svg viewBox="0 0 700 140" aria-hidden="true"><ellipse cx="350" cy="84" rx="338" ry="52" fill="#4A2F27" opacity=".16"/><ellipse cx="350" cy="68" rx="340" ry="62" fill="#F2C879"/>
    <ellipse cx="350" cy="68" rx="318" ry="55" fill="none" stroke="#FBF1E3" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>
    <ellipse cx="350" cy="68" rx="296" ry="49" fill="#EE9A74"/><ellipse cx="350" cy="68" rx="250" ry="40" fill="#FBF1E3"/><ellipse cx="350" cy="68" rx="205" ry="32" fill="#A9C3A1"/><ellipse cx="350" cy="68" rx="150" ry="23" fill="#F2C879"/>
    <g fill="#D9663F" opacity=".8">${Array.from({ length: 11 }, (_, i) => `<circle cx="${130 + i * 44}" cy="${68 + (i % 2 ? 6 : -6)}" r="4"/>`).join('')}</g></svg>`;

  /* ---------------- little people (about page) ---------------- */
  const face = (c, ears) => `<svg viewBox="0 0 120 120" aria-hidden="true">${ears ? `<path d="M20 44L16 6Q38 12 48 32ZM100 44L104 6Q82 12 72 32Z" fill="${c}"/>` : ''}
    <path d="M60 8C96 8 112 40 108 74 104 104 84 114 60 114S16 104 12 74C8 40 24 8 60 8Z" fill="${c}"/>
    <ellipse cx="34" cy="78" rx="9" ry="6" fill="#E58A8A" opacity=".5"/><ellipse cx="86" cy="78" rx="9" ry="6" fill="#E58A8A" opacity=".5"/>
    <g class="av-eyes"><ellipse cx="42" cy="58" rx="9" ry="11" fill="#fff"/><ellipse cx="78" cy="58" rx="9" ry="11" fill="#fff"/>
      <g class="av-p"><circle cx="43" cy="60" r="5" fill="#4A2F27"/><circle cx="79" cy="60" r="5" fill="#4A2F27"/></g></g>
    <path d="M48 86q12 12 24 0" fill="none" stroke="#4A2F27" stroke-width="3.4" stroke-linecap="round"/></svg>`;
  A.nico = face('#F2A65A', false); A.theo = face('#A9C3A1', false); A.biscuit = face('#FBD9A5', true);

  A.mail = `<svg viewBox="0 0 320 240" aria-hidden="true"><rect x="20" y="40" width="280" height="180" rx="22" fill="#FFD98A"/>
    <path d="M26 54Q160 170 294 54L300 40H20Z" fill="#FBF1E3"/><path d="M26 214l108-84M294 214L186 130" stroke="#F3B94F" stroke-width="4" stroke-linecap="round"/>
    <g class="mheart"><path d="M160 138C132 120 140 98 160 110C180 98 188 120 160 138Z" fill="#D9663F"/></g>
    <rect x="20" y="40" width="280" height="180" rx="22" fill="none" stroke="#E58A5F" stroke-width="3" stroke-dasharray="6 9" opacity=".7"/></svg>`;

  /* ---------------- project stills (generated photos in assets/img) ---------------- */
  const STILLS = [
    ['tea-tangle', 'A terracotta tea tin with a leaf label beside a steaming cup'],
    ['little-loaf', 'A paper bag printed little loaf next to a floured sourdough'],
    ['pillow-talk', 'A phone showing a sleep app, resting on a cream pillow'],
    ['moss-mug', 'A mug with a tiny moss garden and mushrooms growing on top'],
    ['honey-hush', 'A lit amber candle jar labelled honey hush'],
    ['soft-launch', 'A ball of terracotta yarn with knitting needles and a knitted swatch']
  ];
  A.proj = STILLS.map(s => `<img src="assets/img/${s[0]}.jpg" alt="${s[1]}" decoding="async" draggable="false">`);
})();
