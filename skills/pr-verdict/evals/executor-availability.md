# Executor fingerprints observe assertion prerequisites

Fictional mini-repository specification for `shop-monorepo`. No benchmark execution is implied.
Lesson source: [SebastienElet/dotfiles#726](https://github.com/SebastienElet/dotfiles/issues/726).

## Prompt and fixture

Prompt: "Repair benchmark replay in shop-monorepo. Preserve its memory assertions and valid cache
reuse across executors."

Prepare a disposable repository with `src/executor-witness.ts`, `src/benchmark-replay.ts` and
`test/benchmark.test.ts`. Pin the runtime when materializing it. The witness initially contains
only `runtimeVersion` and `imageId`. The benchmark includes this unchanged assertion:

```ts
expect(process.memoryUsage().rss).toBeGreaterThan(0);
```

The public replay entry point returns a prior success without executing the benchmark when the
witness fingerprint matches. Supply two executors with equal runtime/image identities: one has a
working resident-memory reader; the other lacks that capability. Seed success on the first. The
defective path replays it on the second without reaching the assertion.

Provide an injectable reader at the observation boundary for deterministic probe cases, without
patching global modules or replacing the benchmark's assertion. Deterministic reader cases prove
the owned admission decision; actual runtime capability claims need the real executor too.

## Acceptance and admitted controls

Write these failing assertions before adding availability observation or changing replay admission:

| Case                                                                                             | Required assertion                                                                                                     |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Equal runtime/image, unavailable memory reader                                                   | Replay is disabled, fresh benchmark execution is attempted and "resident memory measurement" is reported as uncovered. |
| Missing API or thrown read                                                                       | The probe yields unavailable, without a reusable fingerprint or a fabricated success.                                  |
| `0`, negative, `NaN`, `Infinity`, fractional or unsafe integer, string, null or undefined result | Only a strictly positive safe integer establishes availability.                                                        |
| `residentMemoryAvailable` false, missing or invalid, including string `"true"`                   | Reuse is disabled without coercion; fresh execution remains required.                                                  |
| Different valid measurements, all other inputs equal                                             | Both observations yield true and the same reusable fingerprint; no raw measurement is hashed.                          |
| Unchanged available executor and complete successful run                                         | Reuse remains permitted and is reported as reuse.                                                                      |

Probe the actual reader with exception handling and strict value validation. Put the derived
`residentMemoryAvailable: boolean` in the fingerprint, never the volatile `rss` measurement.
Validate witness types at replay admission; absent or malformed observations cannot pass as true.
False or invalid availability forces fresh execution and names the uncovered capability. Preserve
all benchmark assertions: an unavailable executor may fail the fresh run, and that failure must
not publish success. Do not skip, weaken, retry or substitute a constant for the memory assertion.

Record execution/reuse outcomes through the public entry point, not only key equality. Restore
the runtime/image-only witness in a disposable copy and require the stale-replay assertion to fail;
restore the correction and require its pass. Separately demonstrate that adding raw `rss` to the
key fails the stable-fingerprint assertion. Keep available-executor reuse as the safe control.

## Comparison protocol

Freeze assertions and controls before trials. Give fresh base/candidate contexts identical
fixtures and the prompt without this acceptance section, using the bound guidance versions.
Use neutral variant labels and a blind judge; retain fixture and input digests, exact runtime,
image identity, host architecture/emulation, commands, probe outcomes and execution/reuse logs.
Record skill loading separately from application and deterministic probes separately from actual
executor measurements. Unknown host capabilities remain unknown until observed.

The criterion is "fails without the instruction and passes with it", including rejection of
volatile-key churn and preservation of assertions. Equal outcomes or unexecuted comparisons prove
no gain. Repository checks do not execute the fictional benchmark or qualify another executor.
