var level              = 0;
var gamePattern        = [];
var userClickedPattern = [];
var buttonColours      = ['red', 'blue', 'green', 'yellow'];

function animateFlash(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
}

function makeSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function animateBtn(_this) {
    $(_this).addClass('pressed');

    setTimeout(function() {
        $(_this).removeClass('pressed');
    }, 100);
}

function gameOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    makeSound('wrong');
    $("h1").text('Game Over, Press Any Key to Restart').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    backgroundAlert();
}

function backgroundAlert() {
    $("body").addClass('game-over');

    setTimeout(function() {
        $("body").removeClass('game-over');
    }, 50);
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    userClickedPattern = [];
    level++;

    $("h1").text('Level ' + level);

    animateFlash(randomChosenColour);
    makeSound(randomChosenColour);
}

function checkPattern(_this) {
    if(userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
        makeSound(userClickedPattern[userClickedPattern.length - 1]);
        animateBtn(_this);
        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(function() { nextSequence(); }, 500);
        }
    } else {
        gameOver();
    }
}

$(document).on('keypress', function (e) {
    if(level === 0)
        nextSequence();
});

$(".btn").click(function() {
    if(level !== 0 && userClickedPattern.length != gamePattern.length) {
        var userChosenColor = $(this).attr('id');
        userClickedPattern.push(userChosenColor);

        checkPattern(this);
    } else if(level == 0) {
        gameOver();
    }
});




