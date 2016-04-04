'use strict';

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
    assertOutputAndVerifyValid('^0.2.3', '0.2.3');
  });
});
