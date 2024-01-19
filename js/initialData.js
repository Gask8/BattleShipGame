const locationId = document.querySelectorAll("#board td div");
const locationIdtoArray = Array.from(locationId);

const initialData = {
  boardSize: 7,
  ships: [
    {
      locations: [0, 0, 0, 0],
      hits: ["", "", "", ""],
      shipLength: 4,
      name: "battleship",
    },
    {
      locations: [0, 0, 0],
      hits: ["", "", ""],
      shipLength: 3,
      name: "destoyer",
    },
    {
      locations: [0, 0, 0],
      hits: ["", "", ""],
      shipLength: 3,
      name: "submarine",
    },
    { locations: [0, 0], hits: ["", ""], shipLength: 2, name: "smallship" },
  ],
  boardIdOptions: locationIdtoArray.map((e) => e.id),
};
