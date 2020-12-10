const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

const blueSound = new Audio("sounds/blue.mp3");
const redSound = new Audio("sounds/red.mp3");
const greenSound = new Audio("sounds/green.mp3");
const yellowSound = new Audio("sounds/yellow.mp3");

$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {

  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(() => {
                nextSequence();
            }, 1000);

        }
    } else {
        console.log('wrong');
        let wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 100);
        
        $('#level-title').text('Game Over, Press Spacebar to Play Again');
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
  
  userClickedPattern = [];

  level++;
  $("h1").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  
}

//create handler events for button clicks - when a button is clicked, create variable userChosenColour and store id of button

function playSound(randomChosenColour) {
  switch (randomChosenColour) {
    case "blue":
      blueSound.play();
      break;
    case "red":
      redSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    default:
      console.log("no sound");
      break;
  }
}

function animatePress(classColour) {
  $(`.btn.${classColour}`).addClass("pressed");
  setTimeout(() => {
    $(`.btn.${classColour}`).removeClass("pressed");
  }, 100);
}
