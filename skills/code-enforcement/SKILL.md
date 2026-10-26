---
name: code-enforcement
description: >
  Write code whose purpose is to refuse: hook, guard, validator, permission check, lint rule, CI
  gate. Use when adding or changing any control that decides pass or fail. Make sure to use it
  whenever a check can be bypassed or fail to run, even if it is called a wrapper or a policy.
metadata:
  category: dev
---

# Code Enforcement

## Overview

A guard is judged by what it refuses when someone tries to get around it, not by whether it passes
its happy path. The two failure modes that survive review are a control that inspects a
representation of the dangerous value instead of the value itself, and a control that returns
success because it could not run. Both look green in every test written from the author's own
assumptions.

## Usage

Follow the steps below when writing or changing a hook, a guard, a validator, a permission check, a
lint rule or a CI gate — before opening the file, since step 1 often changes where the code belongs.

Typical cases: "block `rm -rf` outside the repository" (step 1 moves the decision off the command
string), "fail CI when a migration has no rollback" (steps 3 and 4 stop the gate from passing when
the migration list comes back empty), "refuse a push without a signed commit" (step 5 enumerates the
alias, the `--no-verify` and the second remote).

## Steps

1. **Name the sink.** Write down the exact value that reaches what you protect: the expanded argv,
   the request body, the SQL parameter, the resolved path. Validate that value.
   Expanding an allowlist must preserve content validation: a declared type, text-like prefix or
   single archive signature is insufficient. Validate the actual format and archive contents under
   the declared policy, with a disguised-content refusal and a valid boundary case for each added
   type, including empty or variant forms when the format permits them.
   For an exemption or allowlist, name both the eligibility criterion and the attributes that make
   the exempt object harmless. Trace updates, attachments and ownership transfers: lock those
   attributes or reapply the mandatory control atomically before a mutation invalidates eligibility.
   Test an exempt object subsequently repurposed for real effects: refuse the bypass without side
   effects, while permitted edits and ordinary objects retain their contract. Removing the lock or
   recheck must fail the refusal assertion. Name the exemption and its protection in the PR description.
2. **Check whether you can actually see it.** If the code only has a representation of the value — a
   shell command string, a diff, a log line, a commit message — the decision is a heuristic, not a
   check. Say so in a comment and in the delivery note, and label that layer advisory. Do not let a
   heuristic be the only barrier for a consequence you cannot undo.
3. **Fail closed.** Missing runtime, unreadable input, parser exception, unresolved variable, empty
   result: refuse, and name what was missing. A guard that exits 0 because it could not run is a
   disabled guard, and it stays disabled silently for months.
4. **Keep the probe's failure visible.** No `2>/dev/null` on the command that decides whether the
   guard can run, and no branch that turns an empty result into success. If the probe is allowed to
   fail quietly, step 3 is unenforceable.
5. **Enumerate the bypasses before writing the fix.** List how the control can be satisfied or
   skipped: compound command, duplicate flags, a second invocation, an alias or a function, a
   missing interpreter, another host, a subshell, a renamed file. Keep the list in the commit body
   or the test file.
   State the exact forms the guard claims to refuse. Match syntactic command boundaries rather
   than assembling a supposed command from unrelated shell lines. Unsupported forms weaken the
   claim; they do not authorize making the guard exhaustive or adding a declaration mirror gate.
6. **Turn each entry of that list into a test case** wired into the project's automated checks. A
   manual self-test does not count: it disappears with the session that ran it.
   Include a permitted control and an observed assertion failure with the guard deliberately broken.
   Keep allow/deny lists in one canonical source; application defaults, service constructors and
   deployment values consume it or derived projections. Use existing inspection or behavioral tests
   to detect a divergent projection; equal handwritten copies are not a single source and do not
   justify a new declaration mirror gate.
   Derive cache inputs from the same canonical file selection as the scanner; verify with native or
   existing inspection that every read input, including hidden directories and alternate extensions,
   invalidates the cache. A narrower cache key can replay success without reading changed input.
   Publish validation-cache success atomically, only after all selected checks have succeeded.
   An error, interruption or incomplete result must publish nothing and must not replace an already
   validated entry. Cover successful publication and each failure path through the cache's public
   interface, including preservation of an existing validated entry.
   Before activating a new blocking check, dry-run it on the target branch and every open branch,
   include needed exceptions in the same PR, and apply
   [class 16](../pr-verdict/references/failure-classes.md#16-a-control-trusts-configuration-from-the-pr-it-checks)
   for configuration trust. Use an explicit scope (`merge-base..HEAD` or the whole pushed range,
   never only the last commit) and verbose output to distinguish a genuine pass from a false green.
   Trace the actual CI entry point and prove execution from its log or a controlled failing witness.
   A planning-only run, early success exit, duplicate script key or decoy step is not execution of
   the required guard. Use native parsing to reject ambiguous configuration where supported.
7. **When a bypass is cheap and its consequence real, run an adversarial pass.** Dispatch a
   fresh-context subagent whose mandate is to break the guard, not to review it; its output is the
   list of attempts and their results. Skip this for a control whose worst case is a warning.

## Gotchas

- **Parsing a shell command to decide.** Quoting, `$()`, `&&`, aliases and `env` prefixes all
  change what finally executes. Such a layer is a speed bump; the real check belongs where the
  command's effect lands.
- **`command -v` guards.** `if command -v tool > /dev/null; then check; fi` silently skips the
  check on any machine missing the tool — the exact machine that needs it most. Invert it: refuse
  when the tool is absent.
- **A discovery step that finds nothing.** `git grep -E` does not support `\b`, so such a pattern
  matches zero files without erroring, and the gate passes having read nothing. Guard the step
  with a canary: a file you know must appear in its output.
- **Testing only the refusal you implemented.** The interesting test is the input you did not
  think of; that is what step 5 produces.
- **A guard tested only by hand.** It passes on the author's machine, then rots. If the project has
  no place to wire the test, that missing harness is part of the work.
- **The context that wrote the guard cannot break it.** It shares the blind spots that produced the
  hole, and will confirm its own design. Only a fresh context is adversarial.

## Constraints

- Never decide on a proxy for the protected value when the value itself is reachable.
- Never exit 0 on a path where the guard could not do its job; refuse and name the cause.
- Never suppress the errors of the probe that establishes whether the guard can run.
- Every enumerated bypass must exist as an automated test before delivery.
- State plainly which layer is advisory and which is enforcing; a heuristic presented as a
  guarantee is worse than no guard.
