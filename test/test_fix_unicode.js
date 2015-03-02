assert = require('assert')
unicodeDragon = require('../index')

describe('unicodeDragon', function () {

  it('should replace unpaired low surrogates', function () {
    assert.equal(unicodeDragon("a\uD800o a\uD83Do a\uDBFFo"),
                               "a\uFFFDo a\uFFFDo a\uFFFDo")
  });

  it('should replace unpaired high surrogates', function () {
    assert.equal(unicodeDragon("a\uDC00o a\uDE0Ao a\uDFFFo"),
                               "a\uFFFDo a\uFFFDo a\uFFFDo")
  });

  it('should replace low surrogates at the end', function () {
    assert.equal(unicodeDragon("\uD83D"), "\uFFFD")
  });

  it('should replace high surrogates at the start', function () {
    assert.equal(unicodeDragon("\uDE0A"), "\uFFFD")
  });

  it('should preserve paired surrogates', function () {
    var paired = "smile! \uD83D\uDE0A";
    assert.equal(unicodeDragon(paired), paired)
  });

})
