/**
 * @type {number[][]}
 */
let state = [...Array(ROWS)].map((e) => Array(COLUMNS).fill(0));
/**
 * @type {number[][]}
 */
let nextState = [...Array(ROWS)].map((e) => Array(COLUMNS).fill(0));
/**
 * @type {number}
 */
let timer;
let playing = false;
let aliveCell = 0;
let deathCell = ROWS * COLUMNS;

const play = document.getElementById('play');
const clear = document.getElementById('clear');
const speed = document.getElementById('speed');
const model = document.getElementById('model');
const modal = document.querySelector('.modal');
const modalWrapper = document.querySelector('.modal__wrapper');

next.disabled = true;

modalWrapper.addEventListener('click', stopPropagation);
modal.addEventListener('click', closeModal);
next.addEventListener('click', () => nextGeneration());
clear.addEventListener('click', () => clearBoard());
play.addEventListener('click', onPlayClicked);
model.addEventListener('change', onPatternChange);

window.addEventListener('load', () => {
  initInfosModal();
  generatePatterOption();
  scrollToMiddleOfPage();
  renderPopulation();
});

function scrollToMiddleOfPage() {
  window.scrollTo(50, document.body.scrollHeight / 4, { behavior: 'smooth' });
}

function renderPopulation() {
  const death = document.querySelector('#death');
  const alive = document.querySelector('#alive');

  if (death && alive) {
    death.innerHTML = deathCell;
    alive.innerHTML = aliveCell;
  }
}

/**
 *
 * @param {Event} e
 */
function onPlayClicked(e) {
  e.preventDefault();

  const i = document.querySelector('#play i');
  const tooltip = document.querySelector('#play .tooltiptext');

  if (playing) {
    i?.classList.remove('fa-pause');
    i?.classList.add('fa-play');
    next.disabled = false;
    clear.disabled = false;
    if (tooltip) tooltip.innerHTML = 'Play';

    clearInterval(timer);
    playing = false;
  } else {
    i?.classList.remove('fa-play');
    i?.classList.add('fa-pause');
    next.disabled = true;
    clear.disabled = true;
    if (tooltip) tooltip.innerHTML = 'Pause';
    timer = setInterval(
      () => nextGeneration(1),
      Number(speed.max) - Number(speed.value) + Number(speed.min),
    );
    playing = true;
  }
}

/**
 *
 * @param {Event} e
 */
function onPatternChange(e) {
  aliveCell = 0;
  deathCell = ROWS * COLUMNS;
  clearBoard();
  scrollToMiddleOfPage();
  const selected = e.target.value;
  const model = MODELS[selected];

  if (model) {
    const row = Math.floor(ROWS / 2) - Math.floor(model.length / 2);
    const column = Math.floor(COLUMNS / 2) - Math.floor(model[0].length / 2);

    for (let i = 0; i < model.length; ++i) {
      for (let j = 0; j < model[0].length; ++j) {
        state[row + i][column + j] = model[i][j];
        if (model[i][j] === 1) {
          getHtmlCell(row + i, column + j).classList.remove('dead');
          aliveCell++;
          deathCell--;
        } else {
          getHtmlCell(row + i, column + j).classList.add('dead');
        }
      }
    }
    renderPopulation();
  }
}

function initInfosModal() {
  const showInfos = localStorage.getItem('showInfos');

  if (showInfos === null) {
    openModal();
    localStorage.setItem('showInfos', 'false');
  }
}

function generatePatterOption() {
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.innerHTML = 'Example de pattern';
  const selectModel = document.getElementById('model');
  selectModel.appendChild(defaultOption);
  Object.keys(MODELS).map((model) => {
    const option = document.createElement('option');
    option.value = model;
    option.innerHTML = model.split('_').join(' ');
    selectModel.appendChild(option);
  });
}

function createBoard() {
  for (let i = 0; i < ROWS; ++i) {
    const row = document.createElement('tr');
    for (let j = 0; j < COLUMNS; ++j) row.appendChild(createCell(i, j));
    board.appendChild(row);
  }

  function createCell(i, j) {
    const cell = document.createElement('td');
    const nucleus = document.createElement('div');
    nucleus.classList.add('nucleus');

    cell.appendChild(nucleus);
    cell.classList.add('cell', 'dead');
    cell.id = `${i} ${j}`;

    cell.style.height = `${CELL_DIMENSION}px`;
    cell.style.width = `${CELL_DIMENSION}px`;

    cell.onmousedown = () => toggle(i, j);
    cell.onmouseenter = (ev) => ev.buttons == 1 && toggle(i, j);

    return cell;
  }
}

/**
 * For filling the board with alive cells.
 * or for killing cells.
 *
 * @param {number} i
 * @param {number} j
 */
function toggle(i, j) {
  if (state[i][j] === 0) {
    state[i][j] = 1;
    getHtmlCell(i, j).classList.remove('dead');
    aliveCell++;
    deathCell--;
  } else {
    state[i][j] = 0;
    getHtmlCell(i, j).classList.add('dead');
    aliveCell--;
    deathCell++;
  }

  next.disabled = false;
  renderPopulation();
}

/**
 * Calculates the next generation of the game of life based on the current state.
 * @param {number} [repeat=0] - If 1, sets a timer to repeat the calculation.
 */
function nextGeneration(repeat = 0) {
  aliveCell = 0;
  deathCell = ROWS * COLUMNS;
  for (let i = 0; i < ROWS; ++i) {
    for (let j = 0; j < COLUMNS; ++j) {
      const cell = state[i][j];
      let liveNeighbors = 0;

      for (let x = -1; x <= 1; ++x) {
        for (let y = -1; y <= 1; ++y) {
          if (i + x > 0 && j + y > 0 && i + x < ROWS && j + y < COLUMNS) {
            liveNeighbors += state[i + x][j + y];
          }
        }
      }

      liveNeighbors -= cell;

      if (cell === 1 && liveNeighbors < 2) nextState[i][j] = 0;
      else if (cell === 1 && liveNeighbors > 3) nextState[i][j] = 0;
      else if (cell === 0 && liveNeighbors === 3) nextState[i][j] = 1;
      else nextState[i][j] = cell;
    }
  }

  // render state
  for (let i = 0; i < ROWS; ++i) {
    for (let j = 0; j < COLUMNS; j++) {
      if (nextState[i][j] === 1) {
        getHtmlCell(i, j).classList.remove('dead');
        aliveCell++;
        deathCell--;
      } else {
        getHtmlCell(i, j).classList.add('dead');
      }
    }
  }

  state = nextState;
  nextState = [...Array(ROWS)].map((e) => Array(COLUMNS).fill(0));

  renderPopulation();

  if (repeat === 1) {
    clearInterval(timer);
    timer = setInterval(
      () => nextGeneration(1),
      Number(speed.max) - Number(speed.value) + Number(speed.min),
    );
  }
}

function clearBoard() {
  for (let i = 0; i < ROWS; ++i) {
    for (let j = 0; j < COLUMNS; j++) {
      state[i][j] = 0;
      getHtmlCell(i, j).classList.add('dead');
    }
  }

  aliveCell = 0;
  deathCell = ROWS * COLUMNS;
  renderPopulation();

  next.disabled = true;
}

/**
 * Returns the html element of a cell.
 *
 * @param {number} i
 * @param {number} j
 */
function getHtmlCell(i, j) {
  return document.getElementById(`${i} ${j}`);
}

function closeModal() {
  modal.classList.remove('active');
}

function openModal() {
  modal.classList.add('active');
}

/**
 *
 * @param {Event} e
 */
function stopPropagation(e) {
  e.stopPropagation();
}

createBoard();
