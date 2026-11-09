# New refusals remain visible to static checks and existing journeys

Fictional mini-repository specification. No fixture execution or real service is implied.

## Prompt and fixture

Prompt: "Finish the new refund prerequisite in shop-api."

1. Handlers emit errors through `const codes = ERRORS.orders`. The existing catalog check follows
   literal members only, so missing translations for `refundTooLate` are invisible.
2. New feature tests pass, but an existing send-order end-to-end suite still expects zero blockers.
   The new prerequisite makes that suite fail on the candidate.
3. Unit, integration and end-to-end consumers of the same order journey live in different folders.

## Acceptance and admitted controls

Emit the error through the literal member form tracked by the existing check; do not relax that
check to hide the missing translation. Find and run every existing suite crossing the changed
journey, update expectations only under the established prerequisite, and preserve valid success
cases. Missing access to an affected suite is an explicit readiness limit.

Remove the translation and verify the existing catalog check now fails. Restore the stale journey
expectation and observe its behavioral failure; restore each correction and verify its relevant
check passes. Feature-only green is insufficient evidence.

## Comparison protocol

Freeze acceptance and controls before trials. Give two fresh sessions identical disposable copies
of the fictional fixture and prompt, without the acceptance section. Load the base and candidate
versions of the inputs listed in the paired results file. Use neutral variant labels and one blind
judge; record skill loading separately from application. Retain fixture and input fingerprints,
model, host, commands, outputs and restored controls. A gain requires observed failure without the
addition and success with it. Repository checks do not execute this scenario.
