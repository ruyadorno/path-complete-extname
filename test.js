var assert = require('assert');

var pathCompleteExtname = require('./index.js');

var isWindows = process.platform === 'win32';


// ---


describe('pathCompleteExtname', function () {

  it('should pass all existing nodejs unit tests', function () {

    assert.equal(pathCompleteExtname(''), '');
    assert.equal(pathCompleteExtname('/path/to/file'), '');
    assert.equal(pathCompleteExtname('/path/to/file.ext'), '.ext');
    assert.equal(pathCompleteExtname('/path.to/file.ext'), '.ext');
    assert.equal(pathCompleteExtname('/path.to/file'), '');
    assert.equal(pathCompleteExtname('/path.to/.file'), '');
    //assert.equal(pathCompleteExtname('/path.to/.file.ext'), '.ext');
    assert.equal(pathCompleteExtname('/path/to/f.ext'), '.ext');
    assert.equal(pathCompleteExtname('/path/to/..ext'), '.ext');
    assert.equal(pathCompleteExtname('file'), '');
    assert.equal(pathCompleteExtname('file.ext'), '.ext');
    assert.equal(pathCompleteExtname('.file'), '');
    //assert.equal(pathCompleteExtname('.file.ext'), '.ext');
    assert.equal(pathCompleteExtname('/file'), '');
    assert.equal(pathCompleteExtname('/file.ext'), '.ext');
    assert.equal(pathCompleteExtname('/.file'), '');
    //assert.equal(pathCompleteExtname('/.file.ext'), '.ext');
    assert.equal(pathCompleteExtname('.path/file.ext'), '.ext');
    //assert.equal(pathCompleteExtname('file.ext.ext'), '.ext');
    assert.equal(pathCompleteExtname('file.'), '.');
    assert.equal(pathCompleteExtname('.'), '');
    assert.equal(pathCompleteExtname('./'), '');
    assert.equal(pathCompleteExtname('.file.ext'), '.ext');
    //assert.equal(pathCompleteExtname('.file'), '');
    //assert.equal(pathCompleteExtname('.file.'), '.');
    //assert.equal(pathCompleteExtname('.file..'), '.');
    assert.equal(pathCompleteExtname('..'), '');
    assert.equal(pathCompleteExtname('../'), '');
    //assert.equal(pathCompleteExtname('..file.ext'), '.ext');
    assert.equal(pathCompleteExtname('..file'), '.file');
    //assert.equal(pathCompleteExtname('..file.'), '.');
    //assert.equal(pathCompleteExtname('..file..'), '.');
    //assert.equal(pathCompleteExtname('...'), '.');
    assert.equal(pathCompleteExtname('...ext'), '.ext');
    //assert.equal(pathCompleteExtname('....'), '.');
    assert.equal(pathCompleteExtname('file.ext/'), '.ext');
    assert.equal(pathCompleteExtname('file.ext//'), '.ext');
    assert.equal(pathCompleteExtname('file/'), '');
    assert.equal(pathCompleteExtname('file//'), '');
    assert.equal(pathCompleteExtname('file./'), '.');
    assert.equal(pathCompleteExtname('file.//'), '.');

    if (isWindows) {
      // On windows, backspace is a path separator.
      assert.equal(pathCompleteExtname('.\\'), '');
      assert.equal(pathCompleteExtname('..\\'), '');
      assert.equal(pathCompleteExtname('file.ext\\'), '.ext');
      assert.equal(pathCompleteExtname('file.ext\\\\'), '.ext');
      assert.equal(pathCompleteExtname('file\\'), '');
      assert.equal(pathCompleteExtname('file\\\\'), '');
      assert.equal(pathCompleteExtname('file.\\'), '.');
      assert.equal(pathCompleteExtname('file.\\\\'), '.');

    } else {
      // On unix, backspace is a valid name component like any other character.
      assert.equal(pathCompleteExtname('.\\'), '');
      assert.equal(pathCompleteExtname('..\\'), '.\\');
      assert.equal(pathCompleteExtname('file.ext\\'), '.ext\\');
      assert.equal(pathCompleteExtname('file.ext\\\\'), '.ext\\\\');
      assert.equal(pathCompleteExtname('file\\'), '');
      assert.equal(pathCompleteExtname('file\\\\'), '');
      assert.equal(pathCompleteExtname('file.\\'), '.\\');
      assert.equal(pathCompleteExtname('file.\\\\'), '.\\\\');
    }
  });


  // ---


  it('should retrieve file extensions with two dots', function () {
    assert.equal(pathCompleteExtname('jquery.min.js'), '.min.js');
    assert.equal(pathCompleteExtname('package.tar.gz'), '.tar.gz');
  });

});

