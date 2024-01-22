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
      return hit;
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
      const locationName = this.boardOptions[randLocation];
      const hit = this.processGuess(this.boardOptions[randLocation]);
      if (hit)
        await sinkShip(this.boardOptions[randLocation], this.boardOptions);
      await delay(100);
      this.boardOptions.splice(this.boardOptions.indexOf(locationName), 1);
    } while (!model.end && this.isAutoPlay);

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    async function sinkShip(location, arr, direction = "all") {
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      const boardSize = initialData.boardSize;
      const num = Number(location);
      let posibleLocations = [];
      //up
      if ((direction === "up" || direction === "all") && num >= boardSize) {
        posibleLocations.push({ loc: num - boardSize, dir: "up" }); // up
      }
      if (
        (direction === "down" || direction === "all") &&
        num <= boardSize * boardSize - boardSize
      ) {
        posibleLocations.push({ loc: num + boardSize, dir: "down" }); // down
      }
      if (
        (direction === "right" || direction === "all") &&
        num % boardSize !== 0
      ) {
        posibleLocations.push({ loc: num + 1, dir: "right" }); // right
      }
      if (
        (direction === "left" || direction === "all") &&
        num % boardSize !== 0
      ) {
        posibleLocations.push({ loc: num - 1, dir: "left" }); // left
      }

      let p = posibleLocations
        .map((e) => {
          e.loc = e.loc < boardSize ? "0" + e.loc.toString() : e.loc.toString();
          return e;
        })
        .filter((e) => arr.includes(e.loc));

      for (let i = 0; i < p.length; i++) {
        await delay(100);
        const hit = controller.processGuess(p[i].loc);
        if (hit) {
          await sinkShip(p[i].loc, arr, p[i].dir);
        }
        arr.splice(arr.indexOf(p[i].loc), 1);
      }
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
      this.autoPlay();
    }
  },
};
