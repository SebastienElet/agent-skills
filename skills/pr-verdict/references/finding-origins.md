# Finding origins and targeted reopening

Read when recording or reconciling review findings. Keep origin separate from severity,
failure class, mandate and disposition. Use [failure-classes.md](failure-classes.md) for the
mechanism and evidence questions; this reference adds no second failure catalogue.

Give every finding a stable ID, mechanism or missing proof, impact, first observed candidate,
origin with supporting comparison, disposition and lift condition. Preserve the ID when its
name changes or a correction fails. Distinguish these origins:

| Origin                | Required basis                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Initial               | Identified during the recorded initial coverage.                                                                                      |
| Correction regression | The corrective delta caused it; compare behavior before and after, including consumers whose lines did not change.                    |
| Late discovery        | Already present in the initial candidate but first identified later; record which earlier coverage missed or could not establish it.  |
| Outside mandate       | The defect belongs to a different contract; justify the boundary rather than inferring it from unchanged lines or late discovery.     |
| Changed input         | A changed requirement, dependency, destination, environment or policy changed the review basis; name the input and affected evidence. |
| Unknown               | Causality is not established; retain uncertainty and a bounded discriminating check rather than guessing regression or scope.         |

An independent follow-up may inspect the declared delta before receiving earlier conclusions.
After that first analysis, reconcile it with the initial coverage and every open ID. Independence
does not authorize a new general sweep. A shorter summary never drops findings from that record.

A demonstrated defect of the candidate's contract or essential missing proof reopens a targeted
check, including when present at the first head or found outside the declared follow-up. Record
the mechanism or proof gap, impact, origin, affected control and consumers, lift condition,
new evidence and investigation resources consumed. Verify the affected failure path; do not
automatically restart the whole audit or an unrelated mutation campaign. Required aggregate
proof-integrity audits and merge gates still apply.

A late non-blocking observation alone starts no corrective pass. Give it an explicit disposition;
an actionable subject outside the follow-up needs a reasoned boundary and, when useful, a local
follow-up draft without implicit ticket creation. That draft cannot defer a contract defect or
essential proof required by this candidate. At an exhausted investigation budget or unresolved
essential disagreement, retain the blocker and report incomplete rather than approving.
