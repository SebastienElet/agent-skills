# Repair journal

Read before another review or correction in step 1 and after each correction and validation in step 4.

## Recovery

Before another review or correction, open or create
`~/.local/state/pr-fix/<forge-host>/<destination-owner>/<destination-repository>/<pr>/journal.md`
from `assets/repair-journal.md`. Derive the identity from the canonical PR URL, verify the URL
stored in an existing journal, and encode path separators inside individual identity components.
Keep this operational journal outside Git, any temporary worktree and durable agent memory.
Read earlier passes before planning; reconcile them against the current diff and commits.
If the journal is missing or damaged, recover only verifiable history from the forge and report
any gap; never invent prior corrections. Recover authorizations, pass count, unresolved
disagreements and pending actions too; an unknown consumed budget blocks another correction.
One repair session owns a PR journal at a time.

## Updating the journal

Update the journal after each correction and validation: problem, final behavior, commits,
failed-then-passing evidence, environment and limits. Preserve corrections to earlier corrections
and mark reverted or superseded work. Write a sibling temporary file, then rename it over the
journal; a failed write pauses the repair before another push or publication.
