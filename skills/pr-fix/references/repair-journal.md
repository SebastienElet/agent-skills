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

Recover the initial audit's candidate/base, contract, covered scope, applicable controls,
evidence, limits and complete finding IDs. Reconcile subsequent review scopes, dispositions
and reopenings against it. Preserve gaps when that reference is partial; recover missing
coverage before an aggregate approval without restarting already evidenced controls by default.

If the journal is missing or damaged, preserve the surviving evidence and read relevant
handoffs, conversation, local worktrees and refs, and forge records. Reconcile visible fixes
against the current head before proposing a new slate. Recover prior pass boundaries, active
work, decisions, authorizations and limits only when attributable evidence supports them.
Commits or pushes alone do not identify pass boundaries or account for unpushed work.

Record history as recovered, partial or unknown, with its sources and scope. An attributable
first-pass statement from the repair owner or controller may describe the scope it knows after
comparison with available traces. Carry forward contradictions and gaps. Neither a statement
nor an empty search resets a known budget or proves zero passes throughout the PR's lifetime.

For a legacy `Correction passes: N/2` entry, preserve the verified numerator and pass evidence.
Carry forward a two-pass limit only if its source is an applicable human or resource limit;
the old workflow's denominator alone is historical policy.

Count passes observed in this execution separately from verified earlier passes. Resume a
recovered charged slate under its existing number. With unknown earlier numbering, identify a
new pass by execution and ordinal. Uncertain history alone leaves explicitly authorized work
eligible. If an applicable human or resource limit cannot be shown to permit another pass or
recovery attempt, pause that dependent action with its lift condition. Recover only supported
authority and never overlap a repair with an identified active owner.

## Finding dispositions and convergence

Give each finding a stable ID, mechanism or missing proof, impact, scope, first observed
candidate, evidence and current disposition. Read
`pr-verdict/references/finding-origins.md` to distinguish initial findings,
correction regressions, late discoveries, outside-mandate defects, changed inputs and unknown
origins with their comparison basis. Unchanged consumer lines do not exclude a regression.
Use these dispositions:

- Corrected and verified on the identified candidate.
- Refuted with evidence.
- Outside the mandate, with rationale and a local follow-up draft when actionable.
- Nonessential evidence limit, with consequence and lift condition.
- Pending correction, essential evidence, actual blocker or reserved decision, with the
  condition that would resolve it.

A local follow-up draft grants no tracker write and cannot dispose of a required in-scope
correction or essential proof. Continue open in-scope findings with available corrections or
lift checks. Record essential missing proof as blocking approval.

Record each targeted reopening with its mechanism or proof gap, impact, origin, affected
control and consumers, lift condition, evidence and consumed investigation resources. Late
discovery alone neither removes a contract defect from the mandate nor restarts a full sweep.
Keep late non-blocking observations dispositioned without automatically charging another slate.

For each pass, record the starting candidate, distinct failure mechanisms, lift checks and
expected progress. Compare the observed checks, diff and independent findings with earlier
attempts. Continue while independent evidence shows progress, such as a mechanism eliminated
or a required check newly exercised. Before repeating a mechanism, an oscillation or an
attempt with no new causal evidence, enter bounded recovery: record the recurrence, what new
observation could distinguish a next attempt, and the finite remaining investigation budget.
Use the user's limit when given and otherwise apply the finite recovery rule in `orchestrate`.
Charge elapsed investigation and attempts to the same mechanism across names, heads, sessions
and delegates. Stop the dependent work at exhaustion or when no informative next attempt
remains. Preserve the result and resumption condition, and continue independent work within
the remaining global resources.

Distinguish initial audits, follow-up reviews, corrective batches charged on first write and
reassessments without writes. Record each review's comparison, affected scope, justified reused
observations and invalidated evidence. Beyond two corrective passes, explain convergence from
resolved and recurring mechanisms and new evidence; the count alone does not end productive work.

## Updating the journal

Before a slate's first correction write, persist its charged pass, starting head, isolated
worktree path and the scope and mechanisms of the slate using the replacement procedure below. A failed journal write blocks that correction. On resumption,
reconcile the interrupted slate with actual edits: continuing its already charged pass does not
charge it twice; a new correction pass still consumes the remaining budget.

Complete the journal replacement in its own tool call and inspect its exit status and the stored
pass, head, worktree and slate before issuing any correction-write command. A successful final command in a shell
invocation does not prove that an earlier journal replacement succeeded.

Update the journal after each correction and validation: problem, final behavior, commits,
failed-then-passing evidence, environment and limits. Preserve corrections to earlier corrections
and mark reverted or superseded work. Write a sibling temporary file, then rename it over the
journal; a failed write pauses the repair before another push or publication.
