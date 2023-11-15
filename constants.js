const CELL_DIMENSION = 20;
const ROWS = 32;
const COLUMNS = 72;
const DARK_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--dark-color');
const LIGHT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--light-color');
const MODELS = {
  glider: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  blinker: [[1, 1, 1]],
  beacon: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
  ],
  lightweight_spaceship: [
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  gosper_glider_Gun: [
    [0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 1,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0],
    [0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 1, 0, 1,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0],
    [0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 1,1, 0, 0, 0,0, 0, 0, 1,1, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 1, 1],
    [0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 1, 0,0, 0, 1, 0,0, 0, 0, 1,1, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 1, 1],
    [1,1, 0, 0, 0,0, 0, 0, 0,0, 1, 0, 0,0, 0, 0, 1,0, 0, 0, 1,1, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0],
    [1,1, 0, 0, 0,0, 0, 0, 0,0, 1, 0, 0,0, 1, 0, 1,1, 0, 0, 0,0, 1, 0, 1,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0],
    [0,0, 0, 0, 0,0, 0, 0, 0,0, 1, 0, 0,0, 0, 0, 1,0, 0, 0, 0,0, 0, 0, 1,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0],
    [0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 1, 0,0, 0, 1, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0],
    [0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 1,1, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0],
  ],
};
