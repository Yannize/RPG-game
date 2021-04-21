var app = {
  board: document.querySelector('#board'),
  compteur: document.querySelector('.compteur'),
  gameOver: false,
  try: 0,
  player: {
    x: 0,
    y: 0,
    direction: 'right',
  },
  targetCell: {
    x: 5,
    y: 3,
  },
  currentCell: {
    x: 0,
    y: 0,
  },
  drawBoard: function () {
    for (var i = 0; i < 4; i++) {
      var rowGrid = document.createElement('div');
      rowGrid.classList.add('row');
      app.board.appendChild(rowGrid);

      for (var j = 0; j < 6; j++) {
        var cell = document.createElement('div');
        cell.classList.add('cell');

        if (
          app.currentCell.x === app.player.x &&
          app.currentCell.y === app.player.y
        ) {
          cell.classList.add('player');
          cell.classList.add(app.player.direction);
        } else if (
          app.currentCell.x === app.targetCell.x &&
          app.currentCell.y === app.targetCell.y
        ) {
          cell.classList.add('targetCell');
        }

        app.currentCell.x += 1;

        rowGrid.appendChild(cell);
      }
      app.currentCell.x = 0;
      app.currentCell.y += 1;
    }
    if (app.try <= 1) app.compteur.textContent = `${app.try} mouvement`;
    else app.compteur.textContent = `${app.try} mouvements`;
    app.isGameOver();
  },
  clearBoard: function () {
    app.board.innerHTML = '';
    app.currentCell.x = 0;
    app.currentCell.y = 0;
  },
  redrawBoard: function () {
    app.clearBoard();
    app.drawBoard();
  },
  turnLeft: function () {
    switch (app.player.direction) {
      case 'right':
        app.player.direction = 'top';
        break;
      case 'top':
        app.player.direction = 'left';
        break;
      case 'left':
        app.player.direction = 'bottom';
        break;
      case 'bottom':
        app.player.direction = 'right';
        break;
    }
    app.try++;
    app.redrawBoard();
  },
  turnRight: function () {
    switch (app.player.direction) {
      case 'right':
        app.player.direction = 'bottom';
        break;
      case 'top':
        app.player.direction = 'right';
        break;
      case 'left':
        app.player.direction = 'top';
        break;
      case 'bottom':
        app.player.direction = 'left';
        break;
    }
    app.try++;
    app.redrawBoard();
  },
  moveForward: function () {
    switch (app.player.direction) {
      case 'right':
        app.player.x += 1;
        break;
      case 'top':
        app.player.y -= 1;
        break;
      case 'left':
        app.player.x -= 1;
        break;
      case 'bottom':
        app.player.y += 1;
        break;
    }
    app.try++;
    if (app.player.x < 0) app.player.x = 0;
    else if (app.player.x > 5) app.player.x = 5;
    else if (app.player.y < 0) app.player.y = 0;
    else if (app.player.y > 3) app.player.y = 3;
    app.redrawBoard();
  },
  listenerKeyboardEvents: function () {
    document.addEventListener('keyup', function (e) {
      switch (e.key) {
        case 'ArrowUp':
          app.moveForward();

          break;
        case 'ArrowLeft':
          app.turnLeft();
          break;
        case 'ArrowRight':
          app.turnRight();
          break;
      }
    });
  },
  isGameOver: function () {
    if (
      app.player.x === app.targetCell.x &&
      app.player.y === app.targetCell.y
    ) {
      app.gameOver = true;
      document.removeEventListener('keyup', app.init);
      if (app.gameOver) {
        setTimeout(function () {
          alert(`WIN !!!\nnombres de déplacements : ${app.try}`);
        }, 10);
      }
    }
  },
  init: function () {
    console.log('init !');
    app.drawBoard();
    app.listenerKeyboardEvents();
  },
};

document.addEventListener('DOMContentLoaded', app.init);
