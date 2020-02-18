const {
  checkForInvalidLocks,
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
} = require('@rajzik/config-danger');

checkForInvalidLocks();
checkForConventionalPrefix();
checkForConventionalSquashCommit();
