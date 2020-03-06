import { checkCommitFormat } from '@rajzik/conventional-changelog-beemo';

// Verify the PR title contains the conventional-changelog required prefix.
export function checkForConventionalPrefix() {
  if (!checkCommitFormat(danger.github.pr.title)) {
    fail(
      'Pull request title requires a conventional changelog prefix. [View commit message format](https://github.com/beemojs/conventional-changelog-beemo#commit-message-format).',
    );
  }
}

// When a PR only has 1 commit, and a squash merge occurs, the commit is used as-is,
// and the PR title is lost, resulting in the semver prefix also being lost.
export function checkForConventionalSquashCommit() {
  if (
    danger.github.pr.commits <= 1 &&
    !danger.github.commits[0].commit.message.includes(danger.github.pr.title)
  ) {
    fail(
      'Automatic releases requires commit message to match PR title if PR contains only 1 commit.',
    );
  }
}
