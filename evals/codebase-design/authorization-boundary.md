# Authorization survives removal of a blanket grant

Fictional mini-repository specification. No fixture execution or real service is implied.

## Prompt and fixture

Prompt: "Replace the transitional global authorization in shop-api with store permissions."

1. Store reads require `store:read`; address lookup lacks this check and reads the repository before
   returning not found. Agent tools resolve identity permissions again after the entry guard.
2. A versioned permission manifest changes keys without updating its asserted version. The routed
   guard chooses between two application identities without coverage.
3. The supported host installs request context through an interceptor. A second host omits it;
   one resolution provider has no production consumer, and a call-count test sleeps for 50 ms.

## Acceptance and admitted controls

Inventory all formerly covered routes, including lookup and tools. With valid scope but no read
permission, lookup returns 403 without repository access; an authorized lookup still succeeds.
Resolve once at entry and propagate that result. Cover both routed identities and their strategies,
manifest version plus complete key set, missing context and failed resolution without data access.
Exercise the supported host wiring and remove the unused provider. Await request completion or an
explicit synchronization point to establish one resolution, without a fixed delay.

In separate disposable variants, remove lookup authorization, restore the second resolution and
omit host context installation. Each relevant assertion must fail, then pass after restoration.

## Comparison protocol

Freeze acceptance and controls before trials. Give two fresh sessions identical disposable copies
of the fictional fixture and prompt, without the acceptance section. Load the base and candidate
versions of the inputs listed in the paired results file. Use neutral variant labels and one blind
judge; record skill loading separately from application. Retain fixture and input fingerprints,
model, host, commands, outputs and restored controls. A gain requires observed failure without the
addition and success with it. Repository checks do not execute this scenario.
