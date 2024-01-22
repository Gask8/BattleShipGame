const tools = {
  boardSize: initialData.boardSize,
  shipLength: 3,

  boardSituation: {
    locations: initialData.boardIdOptions,
    hits: Array.from(
      { length: initialData.boardIdOptions.length },
      (_, i) => ""
    ),
  },

  optionsLenght: initialData.boardIdOptions.length,

  //=====================Reset & Update=====================
  resetBoardSituation: function () {
    this.boardSituation = {
      locations: initialData.boardIdOptions,
      hits: Array.from(
        { length: initialData.boardIdOptions.length },
        (_, i) => ""
      ),
    };
    view.displayHelper(this.makeEducatedGuess());
  },
  updateBoardSituation: function (location, hit) {
    const index = this.boardSituation.locations.indexOf(location);
    this.boardSituation.hits[index] = hit;
    view.displayHelper(this.makeEducatedGuess());
  },

  //=====================Educated Guess=====================
  makeEducatedGuess: function (ships) {
    const guessArray = Array.from({ length: this.optionsLenght }, (_, i) => 0);
    const shipsAlive = model.ships.filter(
      (e) => !e.hits.every((v) => v === "hit")
    );
    return shipsAlive.reduce(
      (accumulator, currentValue) =>
        sumArrays(accumulator, this.individualGuess(currentValue.shipLength)),
      guessArray
    );
    function sumArrays(arr1, arr2) {
      return (sum = arr1.map(function (num, idx) {
        return num + arr2[idx];
      }));
    }
  },
  individualGuess: function (shipLength) {
    let guessArray = Array.from({ length: this.optionsLenght }, (_, i) => 0);
    //Analize Horizontaly
    for (let i = 0; i < this.boardSize; i++) {
      const initial = this.boardSize * i;
      const final = initial + this.boardSize - shipLength + 1;
      for (let j = initial; j < final; j++) {
        if (
          this.boardSituation.hits
            .slice(j, j + shipLength)
            .every((v) => v === "")
        )
          increaseArrHor(guessArray, j);
      }
    }
    //Analize Vertically
    for (let i = 0; i < this.boardSize; i++) {
      let num = 0;
      for (
        let j = i;
        j < guessArray.length, num < this.boardSize - shipLength + 1;
        j += this.boardSize, num++
      ) {
        let arrHit = [];
        for (let k = 0; k < shipLength; k++) {
          arrHit.push(this.boardSituation.hits[j + k * this.boardSize]);
        }
        if (arrHit.every((v) => v === ""))
          increaseArrVer(guessArray, j, this.boardSize);
      }
    }
    return guessArray;
    function increaseArrHor(arr, initial) {
      for (let i = initial; i < initial + shipLength; i++) {
        arr[i]++;
      }
    }
    function increaseArrVer(arr, initial, boardSize) {
      for (
        let i = initial;
        i < initial + boardSize * shipLength;
        i += boardSize
      ) {
        arr[i]++;
      }
    }
  },

  divedeArrInQuantile: function (arr, particions) {
    const sortedArr = arr.sort((a, b) => a - b);

    const porcentange = 1 / particions;
    const quantiles = Array.from({ length: particions + 1 }, (_, i) =>
      findQuantile(sortedArr, porcentange * i)
    );
    return quantiles;
    //return quantiles.filter((v, i, a) => a.indexOf(v) === i);

    function findQuantile(arr, quantile) {
      const quantileIndex = Math.floor((sortedArr.length - 1) * quantile);
      return arr[quantileIndex];
    }
  },

  //=====================Console Display=====================
  printTable: function (arr) {
    const yHeader = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const xHeader = [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
    ];
    console.log(" " + "\t" + xHeader);
    for (let i = 0; i < this.boardSize; i++) {
      const initial = this.boardSize * i;
      console.log(
        yHeader[i] + "\t" + arr.slice(initial, initial + this.boardSize)
      );
    }
  },
};
