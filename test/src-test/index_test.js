const assert = require('chai').assert;
const spawn = require('child_process').spawn;
const cleanGitRef = require('../../src/index');

function assertValidBranchName(branchName) {
  const checkRefFormat = spawn('git', ['check-ref-format', 'refs/' + branchName]);

  return new Promise(function(resolve, reject) {
    checkRefFormat.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject();
    });
  });
}

function assertOutputAndVerifyValid(input, output) {
  it("should convert '" + input + "' to '" + output + "'", () => {
    var result = cleanGitRef.clean(input);
    assert.strictEqual(result, output);
    return assertValidBranchName(result);
  });
}

describe('CleanGitRef', function() {
  describe('clean', function() {
    it('should throw if given a non string', function() {
      assert.throws(function() {
        cleanGitRef.clean(4);
      });

      assert.throws(function() {
        cleanGitRef.clean({});
      });

      assert.throws(function() {
        cleanGitRef.clean([]);
      });
    });

    assertOutputAndVerifyValid('foo./bar', 'foo/bar');
    assertOutputAndVerifyValid('foo..bar', 'foo.bar');
    assertOutputAndVerifyValid('foo bar', 'foo-bar');

    assertOutputAndVerifyValid('~foo', 'foo');
    assertOutputAndVerifyValid('^foo', 'foo');
    assertOutputAndVerifyValid(':foo', 'foo');
    assertOutputAndVerifyValid('?foo', 'foo');
    assertOutputAndVerifyValid('*foo', 'foo');
    assertOutputAndVerifyValid('-foo', 'foo');

    assertOutputAndVerifyValid('foo~', 'foo');
    assertOutputAndVerifyValid('foo^', 'foo');
    assertOutputAndVerifyValid('foo:', 'foo');
    assertOutputAndVerifyValid('foo?', 'foo');
    assertOutputAndVerifyValid('foo*', 'foo');
    assertOutputAndVerifyValid('foo-', 'foo');

    assertOutputAndVerifyValid('foo~bar', 'foo-bar');
    assertOutputAndVerifyValid('foo^bar', 'foo-bar');
    assertOutputAndVerifyValid('foo:bar', 'foo-bar');
    assertOutputAndVerifyValid('foo?bar', 'foo-bar');
    assertOutputAndVerifyValid('foo*bar', 'foo-bar');

    assertOutputAndVerifyValid('foo-bar/', 'foo-bar');
    assertOutputAndVerifyValid('foo/bar/', 'foo/bar');
    assertOutputAndVerifyValid('foo/bar.', 'foo/bar');
    assertOutputAndVerifyValid('foo/bar.lock.', 'foo/bar');
    assertOutputAndVerifyValid('foo/bar.lock/', 'foo/bar');
    assertOutputAndVerifyValid('foo/bar.lock', 'foo/bar');
    assertOutputAndVerifyValid('foo@{bar', 'foo-bar');
    assertOutputAndVerifyValid('foo\\bar', 'foo-bar');
  });
});
