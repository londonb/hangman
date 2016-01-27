function Game(randomWord) {
  this.word = randomWord;
  this.wrongGuess = 0;
  this.usedLetters = [];
  this.bodyParts = ['head', 'chest', 'left arm', 'right arm', 'hips', 'left leg', 'right leg'];

}
