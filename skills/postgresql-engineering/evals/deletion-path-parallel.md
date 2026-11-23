# Parallel append-only relations preserve the authorized purge

Fictional mini-repository specification. No fixture execution or real service is implied.

## Prompt and fixture

Prompt: "Integrate representative history into the demo reset in shop-api."

1. A parallel branch adds append-only `representative_history`, whose delete-refusing trigger and
   `ON DELETE RESTRICT` reference block demo-account deletion as soon as a history row exists.
2. The established reset permits deleting demo accounts only. A dedicated non-login purge role,
   unavailable to the application role, owns the privileged routine with a pinned search path.
3. The ordinary role can set a custom session flag; that flag grants no deletion authority.

## Acceptance and admitted controls

Populate the new relation before replaying the old purge and retain the expected behavioral
failure. Reconcile integrated foreign keys with the purge coverage, delete scoped history before
its parent and preserve real accounts and their history. With the real database roles, ordinary
UPDATE, DELETE and TRUNCATE refuse before purge and after the routine returns in the same
transaction; isolate expected refusals with savepoints. UPDATE and TRUNCATE stay forbidden even
during the authorized deletion path. A spoofed flag cannot enable deletion or assuming the purge
role. Refuse non-demo targets without writes.

Remove the new relation's purge handling or restore flag-only authority separately; the populated
purge or ordinary-role assertion must fail, then pass after restoration. These are planned controls,
separate from the unchanged historical deletion-path experiment.

## Comparison protocol

Freeze acceptance and controls before trials. Give two fresh sessions identical disposable copies
of the fictional fixture and prompt, without the acceptance section. Load the base and candidate
versions of the inputs listed in the paired results file. Use neutral variant labels and one blind
judge; record skill loading separately from application. Retain fixture and input fingerprints,
model, host, commands, outputs and restored controls. A gain requires observed failure without the
addition and success with it. Repository checks do not execute this scenario.
