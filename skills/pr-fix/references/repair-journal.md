# Repair journal

Read before another review or correction in step 1 and after each correction and validation in step 4.

## Recovery

Before another review or correction, locate
`~/.local/state/pr-fix/<forge-host>/<destination-owner>/<destination-repository>/<pr>/journal.md`
using `assets/repair-journal.md`. Derive the identity from the canonical PR URL, verify the URL
stored in an existing journal, and encode path separators inside individual identity components.
Keep this operational journal outside Git, any temporary worktree and durable agent memory.
Read earlier passes before planning; reconcile them against the current diff and commits.
One repair session owns a PR journal at a time.

If the journal is missing or damaged, distinguish these states before assigning a pass count:

- **Established first launch.** Verify an attributable record from the original repair owner or
  an independent controller that explicitly accounts for all repair activity for this canonical PR
  since creation, including local and unpushed writes, and establishes zero prior correction
  passes. Reconcile it with available local and forge evidence; a contradictory or incomplete
  record leaves history unknown. Record the proof and initialize `0/2` under the current request's
  authority, then continue authorized diagnosis and repair without another confirmation.
- **Recoverable history.** Reconstruct only verifiable facts from surviving journals, handoffs,
  conversation and forge records. Recover consumed passes, the active slate, authorizations,
  unresolved disagreements and pending actions, with their sources. Commits or pushes alone do
  not identify pass boundaries, and a complete forge timeline need not include local writes.
- **Unknown history.** Neither a missing journal nor an empty search proves a first launch.
  Preserve damaged evidence and record the gaps with `Correction passes: unknown/2`; never infer
  zero or restore an unverified authorization. An unknown consumed budget blocks another correction,
  while independent read-only diagnosis may continue. Name the missing evidence needed to resume.

Create or reconstruct the journal only from those established facts. An available budget does not
establish delivery or approval authority; retain only authorizations supported by their sources.

## Updating the journal

Before a slate's first correction write, persist its charged pass and starting head using the
replacement procedure below. A failed journal write blocks that correction. On resumption,
reconcile the interrupted slate with actual edits: continuing its already charged pass does not
charge it twice; a new correction pass still consumes the remaining budget.

Complete the journal replacement in its own tool call and inspect its exit status and the stored
pass and head before issuing any correction-write command. A successful final command in a shell
invocation does not prove that an earlier journal replacement succeeded.

Update the journal after each correction and validation: problem, final behavior, commits,
failed-then-passing evidence, environment and limits. Preserve corrections to earlier corrections
and mark reverted or superseded work. Write a sibling temporary file, then rename it over the
journal; a failed write pauses the repair before another push or publication.
