# Inconclusive probe decisions

## Contract and criterion

A probe protecting a decision must distinguish confirmed success, confirmed failure and
inconclusive results; an inconclusive result must not authorize the protected operation.

The [supplied scenarios](scenarios.md) are decision-only inputs. Before comparing results, the
criterion is: A–F must identify the unsupported conclusion and its mechanism or evidence gap;
A must explicitly identify timeout → unread declaration → default false → exit 0 → authorization.
The candidate must route these concerns through class 19. G must accept the supplied corrected
probe behavior within its stated scope, without inventing missing evidence. No improvement claim
depends on the base missing a defect: earlier classes can already detect related failures.

| Scenario | Expected assessment                                                                                               |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| A        | Changes required: the hook authorizes a protected operation after the timeout.                                    |
| B        | Changes required: an unverified repository is accepted as a configured installation target.                       |
| C        | Changes required: the successful final shell command hides the failed readiness probe.                            |
| D        | Changes required: a no-match replacement reports success despite a missing required endpoint.                     |
| E        | Incomplete evidence: fetch all pages and assess effective rules; a rule listing alone cannot prove merge refusal. |
| F        | Public readability proves no private authenticated access; an empty repository proves no credential rejection.    |
| G        | The supplied complete observations support the corrected probe-decision behavior only.                            |

The [archived campaign](https://github.com/SebastienElet/agent-skills/blob/b63e5f44cc61abf978a804bd49c2a84a2930eaff/evals/pr-verdict/2026-10-19-inconclusive-probes/README.md)
records the comparison setup, observed decisions and input hashes.
