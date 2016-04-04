'use strict';

var CleanGitRef = {
  clean: function clean(value) {
    return value.replace(/[^0-9.]+/, '');
  }
};

module.exports = CleanGitRef;