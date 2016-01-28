function Game(randomWord) {
  this.word = randomWord;
  this.wrongGuess = 0;
  this.usedLetters = [];
  this.rightGuess = this.word.length;
  this.bodyParts = ['headhangman.html', 'torsohangman.html', 'leftarmhangman.html', 'rightarmhangman.html', 'hipshangman.html', 'leftleghangman.html', 'fullhangman.html'];
}

Game.prototype.hangedManPart = function() {
  return this.bodyParts[this.wrongGuess];
}

Game.prototype.wrong = function() {
  this.wrongGuess = this.wrongGuess +1;
  return this.wrongGuess;
}

Game.prototype.correct = function() {
  this.rightGuess = this.rightGuess - 1;
  return this.rightGuess;
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
  var guessedLetter;

  $("button#start").click(function() {
    $('#displayWord').empty();
    targetWord = new Game(randomWord());
    console.log(targetWord);
    $('#displayHangman').html('<object width="400" height="300" data="img/gallows.html"></object>');
    for (var i=0; i < targetWord.word.length; i ++) {
      $("#displayWord").append('<td id="space' + i + '"> ? </td>');
    }
  }); // END ACTION FROM PRESSING START/RESTART BUTTON

  $('#pickLetters').on('click', 'td', function() {
    guessedLetter = $(this).text();
    guessedLetter = guessedLetter.toLowerCase();
    $(this).text('');
    $("#listLetters").append('<li>' + guessedLetter + '</li>');
    $("#userLetter").val('');
    var momentOfTruth = findLetter(guessedLetter, targetWord); // CHECK RANDOM WORD VS GUESSED LETTER
    if (momentOfTruth === false){
      $("#displayHangman").html('<object width="400" height="300" data="img/' + targetWord.hangedManPart() + '"></object>');
      targetWord.wrong();
    } else {
      momentOfTruth.forEach(function(moment) { // moment is a number equal to the index location of a letter
        $('#space' + moment).html("<strong>" + targetWord.word[moment] + "</strong>");
        targetWord.correct();
      });
    } // END LETTER GUESSING FUNCTION
    console.log(targetWord);
    console.log(targetWord.usedLetters);

    if (targetWord.rightGuess === 0) {
      alert("You won");
    }

    if (targetWord.wrongGuess >= 7) {
      for (var i = 0; i < targetWord.word.length; i ++ ){
        $('#space' + i).html("<strong>" + targetWord.word[i] + "</strong>");
      }
      alert('GAME OVER!!!!'); //make more interesting
    } // CHECK TOTAL NUMBER OF GUESSES AND CALL END GAME ROUTINE IF =>7
  });
}); //END DOCUMENT READY FUNCTION
