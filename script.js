var box = document.querySelector('.response-box');
var userInput = document.querySelector('.user-input');
var guessButton = document.querySelector('.input-guess')
var clearButton = document.querySelector('.clear-input')
var resetGameButton = document.querySelector('.reset')

var minInput = document.querySelector('.min-input')
var maxInput = document.querySelector('.max-input')
var setLimits = document.querySelector('.set-limits')
var randomNumberGenerator = function(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}
var randomNumber = randomNumberGenerator(parseInt(minInput.value), parseInt(maxInput.value));

function getMinInput() {
    return document.querySelector('.min-input').value;
}

function getMaxInput() {
    return document.querySelector('.max-input').value;
}

// change the text of the box to relect the most recent userInput submitted by guessButton
//depending on the randomNumber generated, a message will appear
//notifying the user they either rock, are too high, or are too low
//if someone guesses correctly, we can update the input value for the randomNumberGenerator and recall the function to make it 10 harder

guessButton.addEventListener('click', function() {
    if (isNaN(parseInt(userInput.value)) == true) {
        box.innerText = "Get out of my console!";
    } else if (parseInt(userInput.value) == randomNumber) {
        moveToNextLevel();
    } else if (parseInt(userInput.value) < parseInt(minInput.value)) {
        box.innerText = "Your guess of " + userInput.value + " is below the min of " + parseInt(minInput.value);
    } else if (parseInt(userInput.value) > parseInt(maxInput.value)) {
        box.innerText = "Your guess of " + userInput.value + " is above the max of " + parseInt(maxInput.value);
    } else if (parseInt(userInput.value) > randomNumber) {
        box.innerText = "Your guess of " + userInput.value + " was too high!";
    } else {
        box.innerText = "Your guess of " + userInput.value + " is too low!";
    }
});

function moveToNextLevel() {
    box.innerText = "Your guess of " + userInput.value + " rocked! Now things will get a little harder.";
    minInput.value = parseInt(minInput.value) - 10;
    maxInput.value = parseInt(maxInput.value) + 10;
    randomNumber = randomNumberGenerator(parseInt(minInput.value), parseInt(maxInput.value));
}

//this section returns the userInput field only to null

clearButton.addEventListener('click', function() {
    userInput.value = "";
    disableClearAndGuessButton();
});

function disableClearAndGuessButton() {
    clearButton.disabled = true;
    guessButton.disabled = true;
}

function enableClearAndGuessButton() {
    clearButton.disabled = false;
    guessButton.disabled = false;
}

//this section resets both the userInput field and box
//need to add returning min and max to norms

resetGameButton.addEventListener('click', function() {
    setToDefault();
    resetGameButton.disabled = true;
    disableClearAndGuessButton();
});

function setToDefault() {
    box.innerText = "Make a guess!";
    userInput.value = "";
    minInput.value = 1;
    maxInput.value = 10;
    randomNumber = randomNumberGenerator(parseInt(minInput.value), parseInt(maxInput.value));
}


userInput.addEventListener('keyup', function() {
    if (userInput.value.length === 0) {
        disableClearAndGuessButton();
    } else if (userInput.value.length > 0) {
        enableClearAndGuessButton();
    }
})

userInput.addEventListener('keyup', function() {
    if (userInput.value.length == 0 && parseInt(minInput.value) == 1 && parseInt(maxInput.value) == 10) {
        resetGameButton.disabled = true;
    } else if (userInput.value.length > 0) {
        resetGameButton.disabled = false;
    }
})

minInput.addEventListener('keyup', function() {
    if (userInput.value.length == 0 && parseInt(minInput.value) == 1 && parseInt(maxInput.value) == 10) {
        resetGameButton.disabled = true;
    } else {
        resetGameButton.disabled = false;
    }
})

maxInput.addEventListener('keyup', function() {
    if (userInput.value.length == 0  && parseInt(minInput.value) == 1 && parseInt(maxInput.value) == 10) {
      resetGameButton.disabled = true;
    } else {
      resetGameButton.disabled = false;
    }
})

//this section defines the limits for the game
//you should not be able to press this button if min or max are blank

function userSetsNewLimits () {
  var minInput = document.querySelector('.min-input');
  var maxInput = document.querySelector('.max-input');
  minInput = parseInt(minInput.value);
  maxInput = parseInt(maxInput.value);
  box.innerText = 'You have set your min to ' + minInput + ' and your max to ' + maxInput;
  randomNumber = randomNumberGenerator(minInput, maxInput);
}

setLimits.addEventListener('click', function() {
    if (isNaN(parseInt(getMinInput())) == true) {
        box.innerText = "Do you even understand the concept of numbers? 🙄"
    } else if (isNaN(parseInt(getMaxInput())) == true) {
        box.innerText = "Max has to be a number 🙄."
    } else if (getMinInput() > getMaxInput()) {
        box.innerText = "Do you understand what min and max mean?";
    } else {
          userSetsNewLimits()
    }
});
