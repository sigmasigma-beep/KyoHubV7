/* Shared between index.html (Settings UI) and emulator.html (actual launch).
   Single source of truth so both always agree on the current bindings. */

const CONTROL_ACTIONS = [
    { key: 'up',     label: 'Up',        button: 'DPAD_UP' },
    { key: 'down',   label: 'Down',      button: 'DPAD_DOWN' },
    { key: 'left',   label: 'Left',      button: 'DPAD_LEFT' },
    { key: 'right',  label: 'Right',     button: 'DPAD_RIGHT' },
    { key: 'a',      label: 'Button A',  button: 'BUTTON_3' },
    { key: 'b',      label: 'Button B',  button: 'BUTTON_1' },
    { key: 'x',      label: 'Button X',  button: 'BUTTON_2' },
    { key: 'y',      label: 'Button Y',  button: 'BUTTON_4' },
    { key: 'l',      label: 'L Shoulder', button: 'LEFT_TOP_SHOULDER' },
    { key: 'r',      label: 'R Shoulder', button: 'RIGHT_TOP_SHOULDER' },
    { key: 'select', label: 'Select',    button: 'SELECT' },
    { key: 'start',  label: 'Start',     button: 'START' },
];

const DEFAULT_CONTROLS = {
    up: 'up arrow', down: 'down arrow', left: 'left arrow', right: 'right arrow',
    a: 'a', b: 'z', x: 'x', y: 's', l: 'q', r: 'e', select: 'v', start: 'enter'
};

function getControls() {
    try { return { ...DEFAULT_CONTROLS, ...JSON.parse(localStorage.getItem('kyohub-controls') || '{}') }; }
    catch (e) { return { ...DEFAULT_CONTROLS }; }
}

function saveControls(controls) { localStorage.setItem('kyohub-controls', JSON.stringify(controls)); }
function resetControlsStorage() { localStorage.removeItem('kyohub-controls'); }

// EmulatorJS's EJS_defaultControls uses FIXED slot numbers 0-19 per their own
// docs (slot 0 is always the X-button/BUTTON_2, slot 4 is always D-pad Up,
// etc.) — the slot number itself carries meaning, so every slot must be
// present, in this exact position, even ones we don't expose in the UI.
const EJS_SLOT_MAP = [
    { idx: 0,  button: 'BUTTON_2',            fallback: 'x' },
    { idx: 1,  button: 'BUTTON_4',            fallback: 's' },
    { idx: 2,  button: 'SELECT',              fallback: 'v' },
    { idx: 3,  button: 'START',               fallback: 'enter' },
    { idx: 4,  button: 'DPAD_UP',             fallback: 'up arrow' },
    { idx: 5,  button: 'DPAD_DOWN',           fallback: 'down arrow' },
    { idx: 6,  button: 'DPAD_LEFT',           fallback: 'left arrow' },
    { idx: 7,  button: 'DPAD_RIGHT',          fallback: 'right arrow' },
    { idx: 8,  button: 'BUTTON_1',            fallback: 'z' },
    { idx: 9,  button: 'BUTTON_3',            fallback: 'a' },
    { idx: 10, button: 'LEFT_TOP_SHOULDER',   fallback: 'q' },
    { idx: 11, button: 'RIGHT_TOP_SHOULDER',  fallback: 'e' },
    { idx: 12, button: 'LEFT_BOTTOM_SHOULDER',  fallback: 'tab' },
    { idx: 13, button: 'RIGHT_BOTTOM_SHOULDER', fallback: 'r' },
    { idx: 14, button: 'LEFT_STICK',          fallback: '' },
    { idx: 15, button: 'RIGHT_STICK',         fallback: '' },
    { idx: 16, button: 'LEFT_STICK_X:+1',     fallback: 'h' },
    { idx: 17, button: 'LEFT_STICK_X:-1',     fallback: 'f' },
    { idx: 18, button: 'LEFT_STICK_Y:+1',     fallback: 'g' },
    { idx: 19, button: 'LEFT_STICK_Y:-1',     fallback: 't' },
];

function buildEJSDefaultControls() {
    const controls = getControls();
    const player0 = {};
    EJS_SLOT_MAP.forEach(slot => {
        const action = CONTROL_ACTIONS.find(a => a.button === slot.button);
        const value = action ? controls[action.key] : slot.fallback;
        player0[slot.idx] = { value: value, value2: slot.button };
    });
    return { 0: player0 };
}
