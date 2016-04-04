'use strict';

const CleanGitRef = {
  clean(value) {
    return value.replace(/[^0-9.]+/, '');
  }
};

module.exports = CleanGitRef;
