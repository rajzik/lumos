/* eslint-disable import/no-extraneous-dependencies */
const {
  checkForInvalidLocks,
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
} = require('@rajzik/config-danger');

checkForInvalidLocks();
checkForConventionalPrefix();
checkForConventionalSquashCommit();
