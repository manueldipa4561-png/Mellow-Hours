# Mellow Hours

A fictional studio that makes *soft things for slow brands* — a concept site by **Punto Due Studio**.
Plain static files: no build step, no dependencies, every illustration is inline SVG drawn in `js/art.js`.

## Run it

```bash
python3 -m http.server 5317   # then open http://localhost:5317
```

Or just double-click `index.html` (fonts load from Google Fonts, so stay online for the real typefaces).

## What's in it

| Mechanic | Where |
| --- | --- |
| **Hours** — the whole room re-lights for morning / noon / evening / night (registered CSS custom properties, one transition on `:root`) | `css/style.css` |
| **Hover previews** — speech bubbles on every object; the bookshelf fans out polaroids of the work | `js/scene.js` |
| **Blanket page transition** — two scalloped quilts slide over, the page swaps underneath, they slide away | `js/main.js` |
| **Shared-element project sheet** — the card's artwork flies into the full page (FLIP) | `js/work.js` |
| **Idle animations** — breathing cat, tail, steam, drifting clouds, dust; after 7 s of no input the room gets *sleepy* (yawn, zzz, a bird) | `css/style.css`, `js/scene.js` |
| **Play** — pet the cat (hearts), click the lamp, click the window to move the sun | `js/scene.js` |

## URL flags

- `?auto` — hands-free tour of every page (loops). `?auto=3600` sets the dwell time in ms. Made for screen recordings.
- `?skip` — skip the loader.
- `?hour=night` — start at `morning`, `noon`, `evening` or `night`.
- `#/work`, `#/about`, `#/hello` — deep links.

## Files

```
index.html     markup (room, pages, nav, sheet)
css/style.css  all styling + animation
js/main.js     loop, router, blanket transition, loader, cursor, hours, tour
js/art.js      every illustration (SVG strings) + the project stills list
assets/img/    six project photos (1000px JPEGs, ~1.2 MB total)
js/scene.js    the room: parallax, tips, cat, lamp, clock, idle mischief
js/work.js     project cards, tilt, FLIP sheet, About eyes
```

Mellow Hours is not a real studio. Concept & build by Punto Due Studio.
