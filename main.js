/**
 * @fileoverview Main file of the game of life.
 * @version 0.0.1
 * @module main
 * @author jjgcoly164@gmail.com
 * Represents a game object.
 * @typedef {Object} Game
 * @property {number[][]} state - The current state of the game grid.
 * @property {number[][]} nextState - The next state of the game grid.
 * @property {any[]} savedState - The saved state of the game grid.
 * @property {number} timer - The timer used for the game loop.
 * @property {boolean} playing - Indicates whether the game is currently playing or not.
 * @property {number} aliveCell - The number of alive cells in the game grid.
 * @property {boolean} isDown - Indicates whether the mouse is down or not.
 * @property {number} startX - The x coordinate of the mouse when it is down.
 * @property {number} startY - The y coordinate of the mouse when it is down.
 * @property {number} scrollLeft - The scroll left value of the game board.
 * @property {number} scrollTop - The scroll top value of the game board.
 * @property {number} deathCell - The number of dead cells in the game grid.
 * @property {number} generation - The current generation of the game.
 * @property {boolean} editMode - Indicates whether the game is in edit mode or not.
 *
 * @property {HTMLElement} play - The play button element.
 * @property {HTMLElement} clear - The clear button element.
 * @property {HTMLElement} speed - The speed input element.
 * @property {HTMLElement} model - The model select element.
 * @property {HTMLElement} modal - The modal element.
 * @property {HTMLElement} next - The next button element.
 * @property {HTMLElement} infos - The information button element.
 * @property {HTMLElement} skip - The skip button element.
 * @property {HTMLElement} modalWrapper - The modal wrapper element.
 * @property {HTMLElement} board - The game board element.
 * @property {HTMLElement} random - The random button element.
 * @property {HTMLElement} save - The save button element.
 * @property {HTMLElement} savedStateSelect - The saved state select element.
 * @property {HTMLElement} cellColor - The cell color input element.
 * @property {HTMLElement} nucColor - The nucleus color input element.
 * @property {HTMLElement} editModeBtn - The edit mode button element.
 *
 * @property {function} initializeGrid - Initializes the game grid.
 * @property {function} initState - Initializes the game state and next state.
 * @property {function} init - Initializes the game.
 * @property {function} centerBoard - Centers the game board.
 * @property {function} onBoardMouseDown - Handles the board mouse down event.
 * @property {function} onBoardMouseLeave - Handles the board mouse leave event.
 * @property {function} onBoardMouseUp - Handles the board mouse up event.
 * @property {function} onBoardMouseMove - Handles the board mouse move event.
 * @property {function} changeColor - Handles the color change event.
 * @property {function} renderPopulation - Renders the population statistics.
 * @property {function} onPlayClicked - Handles the play button click event.
 * @property {function} togglePlayButton - Toggles the play button icon and tooltip.
 * @property {function} onStateChange - Handles the state change event.
 * @property {function} saveState - Saves the current state of the game.
 * @property {function} loadSavedState - Loads the saved state of the game.
 * @property {function} calculateSpeed - Calculates the game speed based on the speed input value.
 * @property {function} onPatternChange - Handles the pattern change event.
 * @property {function} initInfosModal - Initializes the information modal.
 * @property {function} generatePatternOption - Generates the pattern options for the model select element.
 * @property {function} createOptionElement - Creates an option element for the model select element.
 * @property {function} createBoard - Creates the game board.
 * @property {function} createCell - Creates a cell element for the game board.
 * @property {function} toggle - Toggles the state of a cell.
 * @property {function} nextGeneration - Advances the game to the next generation.
 * @property {function} clearBoard - Clears the game board.
 * @property {function} getHtmlCell - Retrieves the HTML element of a cell.
 * @property {function} closeModal - Closes the modal.
 * @property {function} openModal - Opens the modal.
 * @property {function} stopPropagation - Stops the event propagation.
 */
const game = {
  state: [],
  nextState: [],
  savedState: [],
  timer: null,
  playing: false,
  aliveCell: 0,
  isDown: false,
  startX: null,
  startY: null,
  scrollLeft: null,
  scrollTop: null,
  deathCell: ROWS * COLUMNS,
  generation: 0,
  editMode: true,
  play: document.getElementById('play'),
  clear: document.getElementById('clear'),
  speed: document.getElementById('speed'),
  model: document.getElementById('model'),
  modal: document.querySelector('.modal'),
  next: document.getElementById('next'),
  infos: document.getElementById('infos'),
  skip: document.getElementById('skip'),
  modalWrapper: document.querySelector('.modal__wrapper'),
  board: document.querySelector('#board'),
  random: document.getElementById('random'),
  save: document.getElementById('save'),
  savedStateSelect: document.getElementById('savedState'),
  cellColor: document.getElementById('cellColor'),
  nucColor: document.getElementById('nucColor'),
  editModeBtn: document.getElementById('editMode'),

  initializeGrid() {
    return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
  },

  initState() {
    this.state = this.initializeGrid();
    this.nextState = this.initializeGrid();
  },

  init() {
    this.initState();
    this.modalWrapper.addEventListener('click', this.stopPropagation.bind(this));
    this.modal.addEventListener('click', this.closeModal.bind(this));
    this.infos.addEventListener('click', this.openModal.bind(this));
    this.skip.addEventListener('click', () => {
      this.closeModal();
      localStorage.setItem('showInfos', 'true');
    });
    this.play.addEventListener('click', this.onPlayClicked.bind(this));
    this.clear.addEventListener('click', this.clearBoard.bind(this));
    this.model.addEventListener('change', this.onPatternChange.bind(this));
    this.next.addEventListener('click', () => this.nextGeneration(0));
    this.random.addEventListener('click', this.randomPopulation.bind(this));
    this.save.addEventListener('click', this.saveState.bind(this));
    this.savedStateSelect.addEventListener('change', this.onStateChange.bind(this));
    this.nucColor.addEventListener('change', this.changeColor.bind(this));
    this.cellColor.addEventListener('change', this.changeColor.bind(this));
    this.editModeBtn.addEventListener('click', this.toggleEditMode.bind(this));
    this.board.addEventListener('mousedown', this.onBoardMouseDown.bind(this), false);
    this.board.addEventListener('mouseleave', this.onBoardMouseLeave.bind(this), false);
    this.board.addEventListener('mouseup', this.onBoardMouseUp.bind(this), false);
    this.board.addEventListener('mousemove', this.onBoardMouseMove.bind(this), false);

    window.addEventListener('load', () => {
      this.initInfosModal();
      this.generatePatternOption();
      this.loadSavedState();
      this.renderPopulation();
      this.changeColor();
      this.centerBoard();
    });

    this.createBoard();
  },

  centerBoard() {
    this.board.scrollLeft = (this.board.scrollWidth - this.board.clientWidth) / 2;
    this.board.scrollTop = (this.board.scrollHeight - this.board.clientHeight) / 2;
  },

  onBoardMouseDown(e) {
    this.isDown = true;
    this.startX = e.pageX - this.board.offsetLeft;
    this.startY = e.pageY - this.board.offsetTop;
    this.scrollLeft = this.board.scrollLeft;
    this.scrollTop = this.board.scrollTop;
  },
  onBoardMouseLeave(e) {
    this.isDown = false;
  },
  onBoardMouseUp(e) {
    this.isDown = false;
  },
  onBoardMouseMove(e) {
    if (!this.isDown || this.editMode) return;
    e.preventDefault();
    const x = e.pageX - this.board.offsetLeft;
    const y = e.pageY - this.board.offsetTop;
    const walkX = (x - this.startX) * 3;
    const walkY = (y - this.startY) * 3;
    this.board.scrollLeft = this.scrollLeft - walkX;
    this.board.scrollTop = this.scrollTop - walkY;
  },

  changeColor(e) {
    document.documentElement.style.setProperty('--cell-color', this.cellColor.value);
    document.documentElement.style.setProperty('--cell-color-2', this.cellColor.value + '4D');
    document.documentElement.style.setProperty('--nuc-color', this.nucColor.value);
  },

  renderPopulation() {
    const death = document.querySelector('#death');
    const alive = document.querySelector('#alive');
    const generation = document.querySelector('#generation');

    if (death && alive) {
      death.innerHTML = this.deathCell;
      alive.innerHTML = this.aliveCell;
      generation.innerHTML = this.generation;
    }
  },
  toggleEditMode(e) {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editModeBtn.classList.add('active');
      this.board.classList.add('editMode');
      this.editModeBtn.querySelector('.tooltipText').innerHTML = 'Déactiver Edit mode';
    } else {
      this.editModeBtn.classList.remove('active');
      this.board.classList.remove('editMode');
      this.editModeBtn.querySelector('.tooltipText').innerHTML = 'Activer Edit mode';
    }
  },

  onPlayClicked(e) {
    e.preventDefault();

    if (this.playing) {
      this.togglePlayButton('fa-pause', 'fa-play', 'Play');
      clearInterval(this.timer);
      this.playing = false;
    } else {
      this.togglePlayButton('fa-play', 'fa-pause', 'Pause');
      this.timer = setInterval(() => this.nextGeneration(1), this.calculateSpeed());
      this.playing = true;
    }

    this.clear.disabled = this.playing;
    this.next.disabled = this.playing;
    this.random.disabled = this.playing;
    this.save.disabled = this.playing;
  },

  togglePlayButton(removeClass, addClass, tooltipText) {
    const i = document.querySelector('#play i');
    const tooltip = document.querySelector('#play .tooltipText');

    i?.classList.remove(removeClass);
    i?.classList.add(addClass);
    if (tooltip) tooltip.innerHTML = tooltipText;
  },

  onStateChange(e) {
    const index = e.target.value;

    if (index !== '') {
      this.clearBoard();
      this.state = this.savedState[index].state.map((row) => [...row]);
      this.nextState = this.initializeGrid();

      for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
          const cell = this.state[i][j];
          const htmlCell = this.getHtmlCell(i, j);
          if (cell === 1) {
            htmlCell.classList.remove('dead');
            this.aliveCell++;
            this.deathCell--;
          } else {
            htmlCell.classList.add('dead');
          }
        }
      }

      this.renderPopulation();
    }
  },

  saveState() {
    const label = prompt('Enter a label for this state');

    if (label) {
      this.savedState.push({
        label,
        state: this.state,
      });
    }

    localStorage.setItem('savedState', JSON.stringify(this.savedState));
    this.loadSavedState();
  },

  loadSavedState() {
    const select = document.getElementById('savedState');
    const storageDate = localStorage.getItem('savedState');

    if (storageDate) {
      this.savedState = JSON.parse(storageDate);
    }

    if (select) {
      select.innerHTML = '';
      const option = document.createElement('option');
      option.value = '';
      option.innerHTML = 'Enregistré';
      select.appendChild(option);
      this.savedState.forEach((state, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.innerHTML = state.label;
        select.appendChild(option);
      });
    }
  },

  randomPopulation() {
    this.clearBoard();

    for (let i = 0; i < ROWS; ++i) {
      for (let j = 0; j < COLUMNS; ++j) {
        this.state[i][j] = Math.floor(Math.random() * 2);
        const htmlCell = this.getHtmlCell(i, j);
        if (this.state[i][j] === 1) {
          htmlCell.classList.remove('dead');
          this.aliveCell++;
          this.deathCell--;
        } else {
          htmlCell.classList.add('dead');
        }
      }
    }
    this.renderPopulation();
  },

  calculateSpeed() {
    return Number(this.speed.max) - Number(this.speed.value) + Number(this.speed.min);
  },

  onPatternChange(e) {
    this.aliveCell = 0;
    this.deathCell = ROWS * COLUMNS;
    this.clearBoard();
    const selected = e.target.value;
    const selectedModel = MODELS[selected];

    if (selectedModel) {
      const row = Math.floor(ROWS / 2) - Math.floor(selectedModel.length / 2);
      const column = Math.floor(COLUMNS / 2) - Math.floor(selectedModel[0].length / 2);

      for (let i = 0; i < selectedModel.length; ++i) {
        for (let j = 0; j < selectedModel[0].length; ++j) {
          this.state[row + i][column + j] = selectedModel[i][j];

          const htmlCell = this.getHtmlCell(row + i, column + j);
          if (selectedModel[i][j] === 1) {
            htmlCell.classList.remove('dead');
            this.aliveCell++;
            this.deathCell--;
          } else {
            htmlCell.classList.add('dead');
          }
        }
      }
      this.renderPopulation();
    }
  },

  initInfosModal() {
    const showInfos = localStorage.getItem('showInfos');

    if (showInfos === null) {
      this.openModal();
      localStorage.setItem('showInfos', 'false');
    }
  },

  generatePatternOption() {
    const defaultOption = this.createOptionElement('', 'Example de pattern');
    this.model.appendChild(defaultOption);

    Object.entries(MODELS).forEach(([modelName, model]) => {
      const option = this.createOptionElement(modelName, modelName.split('_').join(' '));
      this.model.appendChild(option);
    });
  },

  createOptionElement(value, innerHTML) {
    const option = document.createElement('option');
    option.value = value;
    option.innerHTML = innerHTML;
    return option;
  },

  createBoard() {
    this.board.style.gridTemplateColumns = `repeat(${COLUMNS}, 1fr)`;
    this.board.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;

    for (let i = 0; i < ROWS; ++i) {
      for (let j = 0; j < COLUMNS; ++j) {
        this.board.appendChild(this.createCell(i, j));
      }
    }
  },

  createCell(i, j) {
    const cell = document.createElement('div');
    const nucleus = document.createElement('div');
    nucleus.classList.add('nucleus');

    cell.appendChild(nucleus);
    cell.classList.add('cell', 'dead');
    cell.id = `${i} ${j}`;

    cell.onmousedown = () => {
      if (this.editMode) this.toggle(i, j);
    };
    cell.onmouseenter = (ev) => this.editMode && ev.buttons === 1 && this.toggle(i, j);

    return cell;
  },

  toggle(i, j) {
    if (this.state[i][j] === 0) {
      this.state[i][j] = 1;
      this.getHtmlCell(i, j).classList.remove('dead');
      this.aliveCell++;
      this.deathCell--;
    } else {
      this.state[i][j] = 0;
      this.getHtmlCell(i, j).classList.add('dead');
      this.aliveCell--;
      this.deathCell++;
    }

    this.renderPopulation();
  },

  nextGeneration(repeat = 0) {
    this.aliveCell = 0;
    this.deathCell = ROWS * COLUMNS;

    for (let i = 0; i < ROWS; ++i) {
      for (let j = 0; j < COLUMNS; ++j) {
        const cell = this.state[i][j];
        let liveNeighbors = 0;

        for (let x = -1; x <= 1; ++x) {
          for (let y = -1; y <= 1; ++y) {
            if (i + x >= 0 && j + y >= 0 && i + x < ROWS && j + y < COLUMNS) {
              liveNeighbors += this.state[i + x][j + y];
            }
          }
        }

        liveNeighbors -= cell;

        if (cell === 1 && liveNeighbors < 2) {
          this.nextState[i][j] = 0;
          this.getHtmlCell(i, j).classList.add('trace');
        } else if (cell === 1 && liveNeighbors > 3) {
          this.nextState[i][j] = 0;
          this.getHtmlCell(i, j).classList.add('trace');
        } else if (cell === 0 && liveNeighbors === 3) this.nextState[i][j] = 1;
        else this.nextState[i][j] = cell;
      }
    }

    for (let i = 0; i < ROWS; ++i) {
      for (let j = 0; j < COLUMNS; j++) {
        const htmlCell = this.getHtmlCell(i, j);
        if (this.nextState[i][j] === 1) {
          htmlCell.classList.remove('dead');
          this.aliveCell++;
          this.deathCell--;
        } else {
          htmlCell.classList.add('dead');
        }
      }
    }

    this.generation++;
    [this.state, this.nextState] = [this.nextState, this.initializeGrid()];
    this.renderPopulation();

    if (repeat === 1) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.nextGeneration(1), this.calculateSpeed());
    }
  },

  clearBoard() {
    this.centerBoard()
    for (let i = 0; i < ROWS; ++i) {
      for (let j = 0; j < COLUMNS; j++) {
        this.state[i][j] = 0;
        this.getHtmlCell(i, j).classList.add('dead');
        this.getHtmlCell(i, j).classList.remove('trace');
      }
    }

    this.aliveCell = 0;
    this.deathCell = ROWS * COLUMNS;
    this.generation = 0;
    this.renderPopulation();
  },

  getHtmlCell(i, j) {
    return document.getElementById(`${i} ${j}`);
  },

  closeModal() {
    this.modal.classList.remove('active');
  },

  openModal() {
    this.modal.classList.add('active');
  },

  stopPropagation(e) {
    e.stopPropagation();
  },
};

game.init();
