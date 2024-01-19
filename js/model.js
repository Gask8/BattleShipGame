const model = {
  boardSize: initialData.boardSize,
  shipsSunk: 0,
  ships: JSON.parse(JSON.stringify(initialData.ships)),
  end: false,
  numShips: initialData.ships.length,

  fire: function (guess) {
    if (!this.end) {
      for (let i = 0; i < this.numShips; i++) {
        const ship = this.ships[i];
        const index = ship.locations.indexOf(guess);
        if (ship.hits[index] === "hit") {
          view.displayMessage("You hit this ship before.");
          return true;
        } else if (index >= 0) {
          ship.hits[index] = "hit";
          tools.updateBoardSituation(guess, "hit");
          view.displayHit(guess);
          view.displayMessage("It's a hit!");
          if (this.isSunk(ship)) {
            view.displayMessage("You sunk my " + ship.name + "!");
            this.shipsSunk++;
            view.sinkShip(ship);
          }
          return true;
        }
      }
      view.displayMiss(guess);
      view.displayMessage("It's a miss!");
      tools.updateBoardSituation(guess, "miss");
      return false;
    }
    return false;
  },

  isSunk: function (ship) {
    for (i = 0; i < ship.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },

  generateShipLocations: function () {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip(this.ships[i]);
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
    //console.log("Location Table: ");
    //console.log(this.ships);
  },

  generateShip: function (ship) {
    const direction = Math.floor(Math.random() * 2);
    let row, col;

    if (direction === 1) {
      //arrange it horizontally
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - ship.shipLength));
    } else {
      //arrange it vertically
      row = Math.floor(Math.random() * (this.boardSize - ship.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }

    let newShipLocations = [];
    for (let i = 0; i < ship.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push(row + i + "" + col);
      }
    }
    return newShipLocations;
  },

  collision: function (locations) {
    for (let i = 0; i < this.numShips; i++) {
      const ship = this.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },

  reset: function () {
    view.resetBoard(this.ships);
    this.boardSize = initialData.boardSize;
    this.shipsSunk = 0;
    this.end = false;
    this.ships = JSON.parse(JSON.stringify(initialData.ships));
    this.numShips = initialData.ships.length;
    this.generateShipLocations();
  },
};
