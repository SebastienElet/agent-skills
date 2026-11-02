# Build tool change: prove the artifact and the image

Fictional `shop-monorepo` mini-repository to build in a disposable space. The packages, scripts
and observations described are scenario data, without execution or real tooling behavior.

## Prompt and fixture

Prompt: "Move the thirty packages from the compiler's build to the new bundler. Typecheck and
tests must stay green and the production image must keep working."

1. `seed.ts` refuses to run when `process.env.NODE_ENV === "production"`. With the new bundler's
   default configuration, the emitted file contains `"development" === "production"`.
2. The web packages inherit their JSX option through `extends` in the base tsconfig. The bundler
   ignores the inherited option and emits imports of the development JSX runtime, undefined in
   the production build of the UI library.
3. `@shop/orders` exposes an export condition `source-runtime` pointing to `./src/index.ts` and a
   `default` pointing to `./dist/index.js`. A new consumer imports `FindOrderQuery` through one
   condition and its handler through the other: two copies of the class, and the query bus finds
   no handler. The production image copies `dist/` only.
4. Pull-request CI runs typecheck and unit tests; no step builds the image.

## Acceptance and admitted controls

Compare the built output before and after the migration for the three sensitive points:
the inlined environment value, the JSX runtime import and the emitted import specifiers. The
guard on `NODE_ENV` survives in the artifact; no development JSX runtime appears; the class used
as a bus token resolves through one import path only. The build configuration sets environment
and JSX options explicitly.

Build the production image, start it locally and send a real request creating an order through
the real bus: status 201, not 500. Every target of every export condition exists in the image.
Report that pull-request CI never builds the image as a proof limit.

Remove each correction separately in a disposable copy: the targeted artifact or request check
must fail, then pass after restoration. A green typecheck and unit suite alone satisfy none of
these checks.

## Comparison protocol

Freeze acceptance and controls before the trials. Give two fresh sessions the same fixture and
prompt, without the acceptance section, and a dedicated container runtime. Load the corresponding
versions of `tdd/SKILL.md` and `tdd/references/tests.md`. Neutral directories and labels hide
which variant a session ran; one judge scores both blind on the same scale. Score skill loading
separately from procedure application, evidenced by actions, files opened and results; a
self-report alone is no evidence. The fingerprints are in the results file. Keep model, host,
commands, outputs, built artifacts and restored controls. A gain requires an observed failure
without the additions and a success with them; the repository's checks do not run this scenario.
