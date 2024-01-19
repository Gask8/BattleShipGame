const controller = {
  guesses: 0,
  isAutoPlay: false,
  boardOptions: [],

  processGuess: function (location) {
    if (location) {
      this.guesses++;
      const hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        this.finishTheGame();
      }
    }
  },

  toogleAutoPlay: function () {
    this.isAutoPlay = !this.isAutoPlay;
    if (this.isAutoPlay) {
      this.autoPlay();
    }
  },

  autoPlay: async function () {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    do {
      const randLocation = getRandomInt(this.boardOptions.length);
      this.processGuess(this.boardOptions[randLocation]);
      await delay(100);
      this.boardOptions.splice(randLocation, 1);
    } while (!model.end && this.isAutoPlay);

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  },

  finishTheGame: function () {
    view.displayMessage(
      "You sunk all of my battleships in " + this.guesses + " tries."
    );
    document.querySelectorAll("td").forEach((v) => v.classList.add("disabled"));
    model.end = true;
    this.guesses = 0;
  },

  startGame: function () {
    this.boardOptions = [...initialData.boardIdOptions];
    view.displayMessage(
      "Hello, let's play! There are " +
        initialData.ships.length +
        " ships: " +
        initialData.ships.map((e) => e.name).join(", ")
    );
    view.displayHelper(tools.makeEducatedGuess());
    model.reset();
    tools.resetBoardSituation();

    if (this.isAutoPlay) {
      controller.autoPlay();
    }
  },
};
