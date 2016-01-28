describe('Game', function() {
  it('will create a Game object with a designated word and preset values', function() {
    var testGame = new Game("javascript");
    expect(testGame.word).to.equal("javascript");
    expect(testGame.wrongGuess).to.equal(0);
    expect(testGame.usedLetters).to.eql([]);
    expect(testGame.bodyParts).to.eql(['headhangman.html', 'torsohangman.html', 'leftarmhangman.html', 'rightarmhangman.html', 'hipshangman.html', 'leftleghangman.html', 'fullhangman.html']);
  });

  it('will increment the wrong guess counter', function() {
    var testGame = new Game("javascript");
    expect(testGame.wrong()).to.equal(1);
  });

  it('will retrieve the name of the body part equivalent to the wrong guess', function(){
    var testGame = new Game("javascript");
    testGame.wrong();
    testGame.wrong();
    expect(testGame.hangedManPart()).to.equal('leftarmhangman.html');
  });

  it('will determine the number of letters that are remaining to disclose', function() {
    var testGame = new Game("javascript");
    expect(testGame.rightGuess).to.equal(10);
  });

  it('will decrease the number of letters that are remaining to disclose', function() {
    var testGame = new Game("javascript");
    expect(testGame.correct()).to.equal(9);
  });

});

describe('findLetter', function() {
  it('will search the Game.word for a specified guessed letter and return false if not found', function(){
    var testGame = new Game("falafel");
    expect(findLetter('r', testGame)).to.equal(false);
  });

  it('will search the Game.word for a specified guessed letter and return an array with the locations of that letter', function() {
    var testGame = new Game("falafel");
    expect(findLetter('f', testGame)).to.eql([0,4]);
  });

  it('will add guessed letters to the usedLetters array', function() {
    var testGame = new Game("falafel");
    findLetter('r', testGame);
    findLetter('f', testGame);
    findLetter('s', testGame);
    expect(testGame.usedLetters).to.eql(['r', 'f', 's']);
  });
});

describe('randomWord', function() {
  it('will randomly select a word from a pre-set array and return it as a string', function() {
    expect(randomWord("codeterms")).to.be.a('string');
  });

  it('will pick a specific array of words based on a category choice', function() {
    expect(randomWord("animals")).to.be.a('string');
  });
});
