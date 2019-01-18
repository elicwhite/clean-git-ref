'use strict';


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, search, replacement) {
  const s = search instanceof RegExp
      ? search
      : escapeRegExp(search);

  return str.replace(new RegExp(s, 'g'), replacement);
}

const CleanGitRef = {
  clean(value) {
    if (typeof value !== 'string') {
      throw new Error('Expected a string, received: ' + value);
    }

    value = replaceAll(value, './', '/');
    value = replaceAll(value, '..', '.');
    value = replaceAll(value, ' ', '-');
    value = replaceAll(value, /^[~^:?*\\\-]/, '');
    value = replaceAll(value, /[~^:?*\\]/, '-');
    value = replaceAll(value, /[~^:?*\\\-]$/, '');
    value = replaceAll(value, '@{', '-');
    value = replaceAll(value, /\.$/, '');
    value = replaceAll(value, /\/$/, '');
    value = replaceAll(value, /\.lock$/, '');
    return value;
  }
};

module.exports = CleanGitRef;
