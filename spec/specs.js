describe('Game', function() {
  it('will create a Game object with a designated word and preset values', function() {
    var testGame = new Game("javascript");
    expect(testGame.word).to.equal("javascript");
    expect(testGame.wrongGuess).to.equal(0);
    expect(testGame.usedLetters).to.eql([]);
    expect(testGame.bodyParts).to.eql(['head', 'chest', 'left arm', 'right arm', 'hips', 'left leg', 'right leg']);
  });
});
