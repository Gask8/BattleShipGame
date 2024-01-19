window.onload = init;

function init() {
  const guessClick = document.getElementsByTagName("td");
  for (let i = 0; i < guessClick.length; i++) {
    guessClick[i].onclick = answer;
  }
  controller.startGame();
}

function answer(eventObj) {
  const location = eventObj.target.id;
  controller.processGuess(location);
}

function toogleHelper() {
  document.querySelector("#helpSpace table").classList.toggle("hide");
  document.querySelector("#helpSpace > button").classList.toggle("hide");
}
