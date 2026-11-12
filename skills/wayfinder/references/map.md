# Decision Map

Adapted from the upstream `wayfinder` map and ticket structures. The version and license are
recorded in this skill. Use the established project format when it already serves the same purpose.

## Canonical map

Use a domain-language title, then draft around the reader's next decision:

```text
Objective: the destination whose route this effort must clarify
Next action: the linked questions to resolve and who can answer them
Route clear when: the observable resolution of remaining decisions and uncertainty
Prerequisites and sources: verified blocking links and material source status
```

Keep map-specific constraints and in-scope uncertainty that is not yet a precise question beside
the next action. Link requirements, exclusions and proof already held in canonical child tickets
instead of summarizing them again; retain any constraint that changes navigation. Distinguish
proposals from decisions in force.

On a tracker with native child issues and dependency queries, open questions live in those child
issues and the map links the query rather than copying their state into another inventory. With a
local file or a tracker lacking those capabilities, keep an explicit question index and dependency
links. Name that representation; do not imply native blocking where only text links exist.

## Decision ticket

Use a domain-language question as the title. State the choice or investigation, the action expected
and who can supply the answer, then the observable resolution criterion and verified prerequisites.
Keep genuinely open options and a recommendation's proposed status. Name unavailable evidence and
its impact. Preserve applicable established constraints and their reported source status; an
unavailable reread does not invalidate them. A precise unanswered question can be published as open;
publication does not choose an option or authorize a prototype or implementation. Add the answer
and evidence only when resolved.

For both artifacts, omit empty fields and repeated context. Keep preparation, coordination and
session reports outside the body; retain any uncertainty or authority limit that changes the
reader's next action. Link useful detail to its existing canonical source instead of repeating it.
There is no fixed section or length budget.

Use the established tracker convention for types. Where `wayfinder:` labels are already supported,
use `wayfinder:map` for the map and `wayfinder:<type>` for each decision; read that label when
resuming. Otherwise record one explicit type field: map, research, prototype, grilling or task.
Do not add implementation-triage labels such as `ready-for-agent` to decision work or remove
unrelated existing tracker metadata.
Applying labels still requires the write authority described in the skill.

Choose `research` for a discoverable fact, `grilling` for a user choice, or a separately authorized
`prototype` when a concrete artifact is needed to make a decision. A prerequisite `task` is justified
only by the decision it unblocks; it does not silently extend planning into delivery.

Display links by their map or ticket title and target the verified real tracker ID; never publish
placeholder issue numbers, which can link to unrelated work. Keep the detailed answer in one
canonical ticket or section and index it from the map. An unresolved question never becomes closed
merely because the session ends or a recommendation was offered.
