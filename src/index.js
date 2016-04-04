const CleanGitRef = {
  clean(value) {
    if (typeof value !== 'string') {
      throw new Error('Expected a string, received: ' + value);
    }

    return value.replace('./', '/')
    .replace('..', '.');
  }
};

module.exports = CleanGitRef;
