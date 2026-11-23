# Process-local limiters have bounded state and honest budgets

Fictional mini-repository specification. No fixture execution or real service is implied.

## Prompt and fixture

Prompt: "Finish the import and upload limiters in shop-api."

1. Two sibling guards keep per-user/account windows. The upload guard uses the injected clock and
   sweeps expired entries; the import guard uses an optional `now` callback and never removes keys.
2. The fictional configuration allows 20 operations per fixed minute and ten active replicas.
   A rollout may overlap old and new replicas; restart clears counters.
3. Many one-time callers leave inactive keys, while another key still has a live window. Request
   key cardinality is unbounded, including within one active minute.

## Acceptance and admitted controls

Use the injected project clock and establish cleanup plus a size bound or an equivalent bounded
admission policy for active-window growth. Advance the clock: inactive keys disappear while live
ones retain their counts. Compare both guards against that contract, without forcing an abstraction.
State the process-local budget and reset behavior in implementation and configuration: near a fixed
window boundary ten replicas may admit nearly 400 operations per sliding minute, with more replicas
possible during rollout. A shared budget requires a separately established mechanism.

Restore the private clock or missing cleanup separately; controlled-time and state-bound assertions
must fail, then pass after restoration. Preserve admitted and over-budget request controls.

## Comparison protocol

Freeze acceptance and controls before trials. Give two fresh sessions identical disposable copies
of the fictional fixture and prompt, without the acceptance section. Load the base and candidate
versions of the inputs listed in the paired results file. Use neutral variant labels and one blind
judge; record skill loading separately from application. Retain fixture and input fingerprints,
model, host, commands, outputs and restored controls. A gain requires observed failure without the
addition and success with it. Repository checks do not execute this scenario.
