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
  var targetword;
  $("button#start").click(function() {
    $('#displayWord').empty();
    targetWord = new Game(randomWord());
    console.log(targetWord);

    for (var i=0; i < targetWord.word.length; i ++) {
      $("#displayWord").append('<td id="space' + i + '"> ? </td>');
    }

    // ADD RESET FOR PAGE ON SECOND CLICK?? SOMETHING??
  }); // END ACTION FROM PRESSING START/RESTART BUTTON

  $('form#chooseLetter').submit(function(event) {
    event.preventDefault();
    var guessedLetter = ($('input#userLetter').val()).toLowerCase();
    $("#listLetters").append('<li>' + guessedLetter + '</li>');
    $("#userLetter").val('');
    var momentOfTruth = findLetter(guessedLetter, targetWord); // CHECK RANDOM WORD VS GUESSED LETTER
    if (momentOfTruth === false){
      $("#displayHangman").append('<h4>' + targetWord.hangedManPart() + '</h4>');
      targetWord.wrong();
    } else {
      momentOfTruth.forEach(function(moment) { // moment is a number equal to the index location of a letter
        $('#space' + moment).html("<strong>" + targetWord.word[moment] + "</strong>");
      });
    }
    console.log(targetWord.usedLetters);
    // ADD REVEAL OR WRITING OF CORRECT LETTER

  }); // END LETTER GUESSING FUNCTION

}); //END DOCUMENT READY FUNCTION
