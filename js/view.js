const view = {
  //=====================Basic Display =====================
  displayMessage: function (msg) {
    const messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function (location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
    this.giveFire(cell);
  },

  displayMiss: function (location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },

  //=====================Display Effects=====================
  giveFire: function (parent) {
    const fireDiv = document.createElement("div");
    fireDiv.className = "flames";
    let flameDivs = [];
    for (let i = 0; i < 3; i++) {
      flameDivs[i] = document.createElement("div");
      flameDivs[i].className = "flame";
    }
    for (let i = 0; i < 3; i++) {
      fireDiv.appendChild(flameDivs[i]);
    }
    parent.appendChild(fireDiv);
  },
  sinkShip: function ({ locations, name }) {
    for (let i = 0; i < locations.length; i++) {
      const cell = document.getElementById(locations[i]);
      cell.setAttribute("class", "");
    }
    const boat = document.getElementById("boat" + name);
    boat.classList.add("sink");
  },

  displayHelper: function (arr) {
    const helperDiv = document.querySelectorAll("#helpSpace td div");
    for (let i = 0; i < helperDiv.length; i++) {
      helperDiv[i].innerText = arr[i];
    }
    this.displayColorInHelper(tools.divedeArrInQuantile(arr, 10));
  },

  displayColorInHelper: function (arr) {
    const helperDiv = document.querySelectorAll("#helpSpace td");
    for (let i = 0; i < helperDiv.length; i++) {
      helperDiv[i].setAttribute("class", "");
      const value = Number(helperDiv[i].innerText);
      helperDiv[i].setAttribute("class", "r-" + whereIsTheValue(value, arr));
    }

    function whereIsTheValue(value, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (value < arr[i]) {
          if (value === 0) return 0;
          return i;
        }
      }
      return arr.length;
    }
  },

  //=====================Reset View=====================
  resetBoard: function (ships) {
    ships.forEach((e) => takeOutFire(e));
    document
      .querySelectorAll("#board td")
      .forEach((v) => v.setAttribute("class", ""));
    document
      .querySelectorAll("#board td div")
      .forEach((v) => v.setAttribute("class", ""));
    document
      .querySelectorAll("#boats div")
      .forEach((v) => v.classList.remove("sink"));

    function takeOutFire({ locations }) {
      for (let i = 0; i < locations.length; i++) {
        const cell = document.getElementById(locations[i]);
        cell?.querySelector("div")?.remove();
      }
    }
  },

  //=====================Paint help space=====================
};
