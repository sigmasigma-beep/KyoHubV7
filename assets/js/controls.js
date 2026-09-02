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

function buildEJSDefaultControls() {
    const controls = getControls();
    const player0 = {};
    CONTROL_ACTIONS.forEach((action, i) => {
        player0[i] = { value: controls[action.key], value2: action.button };
    });
    return { 0: player0 };
}
