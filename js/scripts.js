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

var randomWord = function(category){
  if (category === 'animals') {
    var possibleWords = ['elephant', 'opossum', 'platypus', 'gopher', 'lynx', 'rhinoceros', 'jackrabbit', 'octopus', 'jellyfish', 'horse', 'llama', 'alpaca', 'manatee'];
  } else if (category === 'codeterms'){
    var possibleWords = ['markdown', 'block', 'javascript', 'cascading', 'responsive', 'looping', 'branching', 'manipulation', 'attributes', 'bootstrap'];
  } else if (category === 'countries'){
    var possibleWords = ['liechtenstein', 'australia', 'russia', 'uruguay', 'uzbekistan', 'venezuela', 'togo', 'haiti', 'tanzania', 'nicaragua', 'macedonia', 'albania', 'montenegro', 'mozambique', 'france', 'kyrgyzstan', 'iceland'];
  }

  var randomNumber = Math.floor(Math.random() * (possibleWords.length));
  console.log(randomNumber, possibleWords[randomNumber]);
  return possibleWords[randomNumber];
}
// END BUSINESS LOGIC

$(document).ready(function(){
  var targetword;
  var guessedLetter;

  $("button.choice").click(function() {
    $('#displayWord').empty();
    var userChoice = $(this).attr('id');
    targetWord = new Game(randomWord(userChoice));
    if (userChoice === 'animals') {
      $('#displayCategory').html('Guess this animal:');
    } else if (userChoice === 'codeterms') {
      $('#displayCategory').html('Guess this coding term:');
    } else if (userChoice === 'countries') {
      $('#displayCategory').html('Guess this country of the world:');
    }

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
        $('#space' + moment).html('<span class="correctLetter">' + targetWord.word[moment] + '</span>');
        targetWord.correct();
      });
    } // END LETTER GUESSING FUNCTION
    console.log(targetWord);
    console.log(targetWord.usedLetters);

    if (targetWord.rightGuess === 0) {
      $('#endGameDisplay').html("You Won! Try again?");
    }

    if (targetWord.wrongGuess >= 7) {
      for (var i = 0; i < targetWord.word.length; i ++ ){
        $('#space' + i).html("<strong>" + targetWord.word[i] + "</strong>");
      }
      $('#endGameDisplay').html("You Lost! Try again?");
    } // CHECK TOTAL NUMBER OF GUESSES AND CALL END GAME ROUTINE IF =>7
  });
}); //END DOCUMENT READY FUNCTION
