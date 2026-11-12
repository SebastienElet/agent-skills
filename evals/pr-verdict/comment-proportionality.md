# Verdict comment proportionality

## Exercise

Use fresh agent contexts to read `SKILL.md`, `assets/verdict-template.md`, the public-comment
template when present, and the scenario inputs below. Return one proposed comment per scenario;
separately identify what stays in the internal audit. Do not perform forge operations or infer
unrelated missing checks. These are supplied review facts, not software executions by the agent.
For a base/candidate comparison, supply the same scenario inputs to separate fresh contexts.

## Scenario inputs

All identifiers are fictional. The repository is `example/app`, PR 123 targets `main`, and its head
is `a1b2c3d4e5f6789012345678901234567890123`. The fetched destination `b2c3d4e5f6a1` is integrated.
The review is advisory. Publication is authorized for this exercise's proposed text only; never
actually publish it. There is no previous verdict, conflict, open task or reviewer edit.

### A — uncomplicated approval

The complete independent audit has no findings or material residual limits. Every changed behavior
has sufficient mapped positive evidence and required negative witnesses or reasoned exemptions.
The applicable proof-integrity assessment is adequate. The inspected Linux CI pipeline passed on
the exact source head; its logs confirm relevant tests executed. Evidence:
`https://ci.example/app/runs/456`. Internal counts are lint 77/77, types 71/71 and tests 6353/6353.
Produce the default comment without a request for audit details.

### B — a material evidence distinction

As A, except the pipeline tested synthetic merge candidate `c3d4e5f6a1b2`, combining the reviewed
source head and the integrated destination. The relevant-input comparison supports reuse and
approval. Windows is a supported target not exercised by that pipeline; the audit judges this a
non-essential evidence limit. Produce the default comment.

### C — demonstrated data loss

As A, except a concurrent write after a closing snapshot disappears from its successor: the closing
transaction commits that stale snapshot without rereading or a constraint protecting the write.
A failing concurrent integration test demonstrates the loss. Repair and a passing concurrent
integration test are required to lift it. Fix ticket: `https://tracker.example/issues/123`.
The aggregate CI result cannot establish approval. Produce the default comment.

### D — essential witness missing

As A, except a changed authorization oracle has no observed failing counterpart for its new denial
test. The passing test alone does not establish sensitivity to a broken refusal. This evidence is
essential: show the test rejecting an unauthorized allow variant, then passing after restoration.
Fix ticket: `https://tracker.example/issues/123`. Produce the default comment.

### E — full details requested

As A, with two changed behaviors: invalid input is refused and valid input is saved. Both have
passing CI tests; removing validation makes the refusal test fail, while the save behavior has a
reasoned exemption from a negative witness because it changes no critical guarantee or oracle.
The user explicitly requests the complete behavior ledger and audit details. Produce the comment.

### F — composed publication draft

As A, during an authorized `pr-fix` workflow. Its independent phase-5 audit is retained in the
journal, and step 8's native-approval gate holds. Read
`skills/pr-fix/references/native-approval.md` and produce only the draft verdict comment presented
for confirmation. The user has not answered yet; no publication or native approval is authorized.

## Acceptance criteria

1. A and B start with the exact marker and an approved line naming short head and destination.
   Each comment has at most eight physical lines including blanks and at most two limit bullets;
   no Markdown table, task tallies, proof code, method narration, routine no-edit statement or
   repeated advisory disclaimer. A links decisive CI evidence and invents no limit. B identifies
   the actual synthetic candidate and the unexercised supported target.
2. C returns changes required, prioritizes the demonstrated mechanism, consequence and lift
   criterion, and links the fix. D also requires changes, naming the essential missing evidence
   and its lift condition without inventing a demonstrated authorization bypass. Each stays within
   thirty lines and preserves advisory scope.
3. E may publish details because they were requested; it includes both behavior rows with evidence
   attribution and witness or exemption, still within about thirty lines. No scenario skips the
   internal ledger, failure-class sweep, evidence provenance, proof audit or publication checks.
4. F selects the short public-comment template and meets A's length and content criteria; the full
   audit stays in the journal. Preparing the draft does not authorize publishing or approving it.

Repository Bun tests do not execute these agent scenarios. Measure the generated comments, not
the wording of this file or the template. Record observed responses and host limits outside the
candidate; a scenario definition alone is not execution evidence or cross-host qualification.
