# Behavior evidence

Read during phases 2 and 4 to build the ledger and attribute and retain review evidence.

## Changed-behavior ledger

Inventory every externally observable behavior added, removed or changed by the diff. Start a
changed-behavior ledger with one row per behavior: the behavior, positive evidence on the exact
head or traceably equivalent relevant inputs, a negative witness requirement with its rationale,
and the result. Require negative witnesses for modified oracles and critical guarantees, not
systematically for every label. A witness is an executed test-first RED or a controlled faulty
variant shown to fail when the guarantee is broken. Existing witnesses are reusable when their
relevant inputs are unchanged. Keep experiments in disposable copies and verify candidate stability. A
passing regression test without an observed failing counterpart is positive evidence only; a
green aggregate count proves no individual row by itself; map its actual tests to the behavior.
Record required missing evidence as `absent`, and justified unnecessary witnesses as `not required`.

## User-action reachability

Ground each changed user action's entry point in the PR contract or added/moved control.
Ground role/stage eligibility and intentional prerequisites in an independent product,
authorization or PR contract, never the control's own guards; investigate unclear intent.
A read-only diagnosis alone does not promise an editor there. Derive valid starting states,
including empty unrelated data. Trace parent rendering, routing and enablement guards to the
usable control. API tests and tests mounting the control alone do not prove that path. Respect
declared prerequisites and verify reachability once they hold. A guard making that promised
workflow impossible is a blocker: name its location, failure sequence and a lift criterion
exercising the enclosing screen in that state.

## Evidence attribution and reuse

Then attribute each piece of evidence: measured
here, supplied by the author and not reproduced here, or absent. The three are not
interchangeable — "not observed" written over evidence sitting in the description is a false
statement about the author's work, and a lift criterion asking for a run the PR already shows
asks them to repeat themselves. What is missing in that case is a control in the repository:
name the control, not the re-run. Accept traceable CI and retained observations after checking
their artifacts and relevant source, oracle, configuration, dependency, environment and integration
inputs. Preserve original provenance and the comparison that justifies reuse; a new head need not
invalidate an unchanged mechanism's evidence. Reproduce only essential missing or invalidated
evidence. Unverifiable evidence remains unproven, not fictitiously reproduced.

## Description evidence after a push

Each description evidence entry records its tested head and integrated destination SHA, exact
command, exit status, environment and output excerpt or artifact. After each push, resolve the
final local and remote head and reconcile the description's evidence section with that revision's
actual CI run. Rerun invalidated evidence or label it historical and unproven on the new head.
Retained observations keep their original SHA; a documented relevant-input comparison permits
reuse, never relabeling an old run as executed on the current head. Required remote checks must
identify their actual tested SHA; a queue or synthetic merge candidate is a separate tree.
Preserve the forge's native merge title when a required control consumes its branch marker.
