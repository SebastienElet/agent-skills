# Rewritten tests: preservation and sensitivity

All repositories, identifiers and observations here are fictional. This is an implementation
evaluation specification, not an executed mini-repository. Prepare identical disposable
`shop-api` fixtures for base and candidate guidance. Never use real credentials or Docker resources.

## Prompt and fixture

Prompt: "Refactor the verification launcher and worker tests while preserving their supported
behavior. Repair the regressions and retain evidence for each new oracle."

The fixture's public launcher is `scripts/check.ts`. Its supported contract is:

1. Each of `package-lock.json`, `tsconfig.base.json`, `.eslintrc.json`, `jest.config.ts` and
   `nx.json` widens test selection to all tests. The rewrite tests only the first file. Old tests
   asserted all five; their production behavior still exists.
2. The ordered command plan is a bootstrap container, an ordinary check container, a custom-entrypoint
   check container, then `docker image rm app:dev app:base`. Only bootstrap receives the synthetic
   registry token. The rewrite checks one image and omits the custom-entrypoint command, which now
   receives the token too. Use a recording process adapter; compare full argv and environments,
   not real container side effects or secret-bearing logs.
3. The launcher runs from the Git root even when invoked from `packages/orders`. A root helper
   calls `git rev-parse --show-toplevel`, but the launcher ignores it and uses its current directory.
4. `OrderSyncWorker` finishes an in-flight batch after a stop request and never starts the next.
   The rewrite calls a private stop helper; removing the public loop's stop check leaves it green.
5. A stock refusal is `OutOfStockError` with code `OUT_OF_STOCK`; its HTTP adapter returns `409`.
   The rewrite asserts only `toThrow(new OutOfStockError("stock empty"))`. A generic `Error` with
   that message, or the right class with a wrong code, slips past it and breaks the mapping.

## Acceptance and safe control

Inventory the old assertions and retain replacement evidence for every surviving behavior.
Cover all five widening files separately, the complete ordered command plan, both removed images
and bootstrap-only token injection for every launch variant. Invoke the launcher from the nested
directory in a disposable Git repository. Construct the worker through its public interface and
request stop during a controlled batch. Assert error class and code separately, plus actual HTTP
translation through its owning adapter.

For each new oracle, record a targeted faulty variant, an observed assertion failure and restored
green. Variants include dropping each widening rule, either image, a command or its order;
leaking the token into each non-bootstrap launch; ignoring the Git root; removing the public stop
check; substituting a same-message generic error or wrong code. A setup crash is not a witness.
An already observed test-first RED for that exact behavior may be reused.

Safe control: internal helper names may change, valid stock succeeds, and bootstrap may receive
the synthetic token. An intentionally removed behavior needs an explicit contract change before
its assertion disappears. Do not add tests mirroring declarative files or private call counts.

## Comparison protocol

Fix the criterion before any run: every acceptance item and safe control must hold. Give fresh
contexts identical fixtures and the prompt, without this expected-answer section. Supply base
guidance from the recorded base revision and candidate guidance from the final indexed tree:
`tdd/SKILL.md` and its routed references, from the same package in each arm.
Retain guidance/scenario/fixture fingerprints, model and host versions, commands, outputs,
assertion failures, restored results and any missing environment. Compare decisions separately
from executed repairs. Success requires an observed base failure and candidate pass; equal or
unexecuted outcomes establish no gain. Never infer host activation from a scenario file.
