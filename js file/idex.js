// making variables
let compOrder = [];
let playerOrder = [];
let flash;
let good;
let playerTurn;
let compTurn;
let intervalId;
let isStrict = false;
let on = false;
let noise = false;
let win;

// targeting elements
const topLeft = $(".topLeft");
const topRight = $(".topRight");
const bottomLeft = $(".bottomLeft");
const bottomRight = $(".bottomRight");
const turnCounter = $(".turn");
const strictButton = $("#strict");
const powerButton = $("#power");
const startButton = $(".start");
const heading = $(".heading");

let forOnce = 1;

strictButton.mouseover((event) => {
  if (forOnce) {
    alert(
      'By selecting "Strict" mode, if you choose one wrong colour then the whole game is lost.\nIf you not click on "Strict" mode then if you clicked on the wrong colour then you can start from where you left off.'
    );
    forOnce = 0;
  }
});

// strict mode id on or off
strictButton.click((event) => {
  if (strictButton.is(":checked")) isStrict = true;
  else isStrict = false;
});

//game is on or off
powerButton.click((event) => {
  if (powerButton.is(":checked")) {
    on = true;
    turnCounter.html("-");
  } else {
    on = false;
    turnCounter.html("");
    clearColor();
    clearInterval(intervalId);
  }
});

// start button
startButton.click((event) => {
  if (on || win) play();
});

// play function (playing game)
let play = () => {
  // making all things from starting
  win = false;
  playerOrder = [];
  compOrder = [];
  flash = 0;
  intervalId = 0;
  playerTurn = 1;
  turnCounter.html("1");
  good = true;
  for (var i = 0; i < 30; i++)
    compOrder.push(Math.floor(Math.random() * 4) + 1);
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
};

// game's turn
let gameTurn = () => {
  on = false; //player can't make any move
  if (flash == playerTurn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (compOrder[flash] == 1) one();
      if (compOrder[flash] == 2) two();
      if (compOrder[flash] == 3) three();
      if (compOrder[flash] == 4) four();
      flash++;
    }, 200);
  }
};

let one = () => {
  if (noise) {
    let audio = new Audio("./sounds/green.mp3");
    audio.play();
  }
  noise = true;
  topLeft.css("background-color", "lightgreen");
};

let two = () => {
  if (noise) {
    let audio = new Audio("./sounds/red.mp3");
    audio.play();
  }
  noise = true;
  topRight.css("background-color", "rgb(248, 34, 34)");
};

let three = () => {
  if (noise) {
    let audio = new Audio("./sounds/yellow.mp3");
    audio.play();
  }
  noise = true;
  bottomLeft.css("background-color", "yellow");
};

let four = () => {
  if (noise) {
    let audio = new Audio("./sounds/blue.mp3");
    audio.play();
  }
  noise = true;
  bottomRight.css("background-color", "lightskyblue");
};

let wrong = () => {
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
};

let clearColor = () => {
  topLeft.css("background-color", "green");
  topRight.css("background-color", "darkred");
  bottomLeft.css("background-color", "rgb(188, 190, 17)");
  bottomRight.css("background-color", "#385a94");
};

let flashColor = () => {
  topLeft.css("background-color", "lightgreen");
  topRight.css("background-color", "rgb(248, 34, 34)");
  bottomLeft.css("background-color", "yellow");
  bottomRight.css("background-color", "lightskyblue");
};

topLeft.click((event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

topRight.click((event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.click((event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomRight.click((event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

let check = () => {
  if (playerOrder[playerOrder.length - 1] !== compOrder[playerOrder.length - 1])
    good = false;
  if (playerOrder.length == 30 && good) winGame();
  if (good == false) {
    flashColor();
    turnCounter.html("WRONG!");
    wrong();
    setTimeout(() => {
      turnCounter.html(playerTurn);
      clearColor();
      if (isStrict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }
  if (playerTurn == playerOrder.length && good && !win) {
    playerTurn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.html(playerTurn);
    intervalId = setInterval(gameTurn, 800);
  }
};

let winGame = () => {
  flashColor();
  turnCounter.html("WIN!");
  on = false;
  win = true;
  heading.html("YOU WON THE GAME!!")
};
