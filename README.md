# KyoHubV7

A self-hosted game hub for GitHub Pages: Unity WebGL builds + retro ROM
emulation (via EmulatorJS), with a themeable UI and remappable controls.

## Setup

1. Push this whole folder's contents to a **public** GitHub repo.
2. Enable GitHub Pages (Settings → Pages → deploy from the branch root).
3. That's it — the Games tab auto-detects the repo it's running in from
   the page's own URL (username.github.io/repo-name/), no config needed.
   This only works once it's actually live on a *.github.io address.
4. Add games — see `games/README.md`.
5. Add ROMs for the Cores tab (manual browsing) — see the READMEs inside
   each `roms/<system>/` folder.

## Themes

Settings tab → Umbreon (default, purple/black/blue with a night-scene
backdrop from `assets/backgrounds/umbreon-scene.svg`), Cyan, Red,
Dark Mode, Light Mode. Saved per-browser.

## Controls

Settings tab → Controls: click a button, press the key you want it bound
to, for Up/Down/Left/Right/A/B/X/Y/L/R/Select/Start. Shared logic lives in
`assets/js/controls.js` so both the settings page and the emulator agree
on the current bindings. Each running game also has EmulatorJS's own
control menu (gear icon) for gamepad binding or additional players.

## How ROMs actually launch

Every ROM launch opens `assets/emulator.html` inside a fresh iframe rather
than loading EmulatorJS into the main page. This matters: EmulatorJS
declares some top-level variables that can't be declared twice in one
document, so if it were loaded straight into index.html a second launch
in the same session would throw a syntax error and show a black screen.
A fresh iframe means a fresh JS environment every time — no collisions.

## Notes

- Only put ROMs/games in the repo that you actually have the rights to
  distribute if the repo is public — a public GitHub repo is public
  distribution.
- The background art in assets/backgrounds/ is original, not the actual
  Umbreon artwork/character.
