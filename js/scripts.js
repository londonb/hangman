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
  for (var i = 0; i < selectedWord.word.length; i++) {
    if (selectedWord.word[i] === guess) {
      //do a thing
      foundLetter = true;
    }
  }
  return foundLetter;
}
