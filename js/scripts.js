function Game(randomWord) {
  this.word = randomWord;
  this.wrongGuess = 0;
  this.usedLetters = [];
  this.bodyParts = ['head', 'chest', 'left arm', 'right arm', 'hips', 'left leg', 'right leg'];
}

Game.prototype.hangedManPart = function() {
  return this.bodyParts[this.wrongGuess];
}

Game.prototype.wrong = function() {
  this.wrongGuess = this.wrongGuess +1;
  return this.wrongGuess;
}

var findLetter = function(guess, selectedWord) {
  var foundLetter = false;
  var letterLocations = [];
  selectedWord.usedLetters.push(guess);
  for (var i = 0; i < selectedWord.word.length; i++) {
    if (selectedWord.word[i] === guess) {
      letterLocations.push(i);
      foundLetter = true;
    }
  }
  if (foundLetter === false) {
    return foundLetter;
  } else {
    return letterLocations;
  }
}

var randomWord = function(){
  var possibleWords = ['markdown', 'block', 'javascript', 'cascading', 'responsive', 'looping', 'branching', 'manipulation', 'attributes', 'bootstrap'];
  var randomNumber = Math.floor(Math.random() * (possibleWords.length));
  console.log(randomNumber, possibleWords[randomNumber]);
  return possibleWords[randomNumber];
}
// END BUSINESS LOGIC

$(document).ready(function(){
  $("button#start").click(function() {
    var targetWord = randomWord();
    console.log(targetWord);
    $("#displayWord").html('<h3>' + targetWord + '</h3>');
  }); // END ACTION FROM PRESSING START/RESTART BUTTON

  $('form#chooseLetter').submit(function(event) {
    event.preventDefault();
    console.log("submitted!");
    var guessedLetter = ($('input#userLetter').val()).toLowerCase();
    console.log(guessedLetter);

  }); // END LETTER GUESSING FUNCTION

}); //END DOCUMENT READY FUNCTION
