# Lagging branches adopt the integrated target conventions

Fictional mini-repository specification. No fixture execution or real service is implied.

## Prompt and fixture

Prompt: "Finish the refund branch in shop-api and report readiness."

1. The branch predates the target's module-owned, container-injected database client. Its new
   standalone client service violates that convention.
2. A new migration duplicates a target timestamp and sorts before an already applied migration.
   A versioned table uses plural naming where the target requires singular names.
3. PR CI and commit hooks omit the naming gate and test-directory typecheck; the transpiling test
   runner passes. The declared full local readiness gate includes both.

## Acceptance and admitted controls

Integrate the available target and record its SHA; read history since the merge base and apply
its conventions. Reuse the module client, rename only the new migration after the latest target
migration and correct table naming. Run the full declared gate, including static checks and typed
tests omitted from PR CI. Preserve already applied migration names. A conflict-free merge cannot
establish conformity.

Restore the separate client, naming violation or old migration ordering individually. Each
corresponding existing check must fail, then pass after restoration. This supplements the historical
lagging-branch experiment; it does not modify or rerun that experiment.

## Comparison protocol

Freeze acceptance and controls before trials. Give two fresh sessions identical disposable copies
of the fictional fixture and prompt, without the acceptance section. Load the base and candidate
versions of the inputs listed in the paired results file. Use neutral variant labels and one blind
judge; record skill loading separately from application. Retain fixture and input fingerprints,
model, host, commands, outputs and restored controls. A gain requires observed failure without the
addition and success with it. Repository checks do not execute this scenario.
