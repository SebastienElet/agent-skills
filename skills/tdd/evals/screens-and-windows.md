# Screens and time windows: bounds, rank, shared state, context reset

Fictional `shop-web` mini-repository to build in a disposable space. The screens, rules and
observations described are scenario data, without execution or real policy.

## Prompt and fixture

Prompt: "Finish the delivery-planning screen: reorder stops, require a reason to move or remove a
started stop, prefill the proposal from a dropped file, and block slots that clash with the
customer notification."

1. The server reads the rank of a stop among the active ones. After one stop is removed, the
   stored positions are 1, 2, 4, 5. `moveUp` sends the stored position of the previous neighbor.
2. A stop is started when `startedOn` is set. The rule tests only `status === "IN_PROGRESS"`; a
   stop started then postponed escapes it, and a completed stop asks for a reason.
3. The form keeps `useState(proposal)` while the user switches the owning store from A to B; the
   file dropped for store A can be saved for store B.
4. A slot must fall in `[notice.sentAt, nextAppointment.at)`. The first draft checks only the
   upper bound, and takes the next non-cancelled appointment rather than the next relevant one,
   so a slot after an appointment already held is refused.
5. An existing end-to-end test uses real time and the fixed date 2026-12-01.

## Acceptance and admitted controls

Test the window at `sentAt - 1`, `sentAt`, the last admitted instant and `nextAppointment.at`,
with an appointment already held before the slot. Test the move on the list with a gap: moving
the fourth stop up sends rank 2, not stored position 2. The "started" definition is one function
shared by server and screen; assert reason required for started-then-postponed, not required for
completed. After prefilling for store A and switching to store B, the A data cannot be saved; the
form is remounted by the store identifier or its state is reset by a hook.

Run the dated test on an injected frozen clock, then on a date after 2026-12-01. Remove each
correction separately: the targeted assertion must fail, then pass after restoration.

## Comparison protocol

Freeze acceptance and controls before the trials. Give two fresh sessions the same fixture and
prompt, without the acceptance section. Load the corresponding versions of `tdd/SKILL.md` and
`tdd/references/tests.md`. Neutral directories and labels hide the variant; one judge scores
both blind on the same scale, and skill loading is reported separately from procedure
application. The fingerprints are in the results file. Keep model, host, time zone, clocks,
commands, outputs and restored controls. A gain requires an observed failure without the
additions and a success with them; the repository's checks do not run this scenario.
