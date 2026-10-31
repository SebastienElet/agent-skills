# Performance Evidence

Select the mode before running a probe: read an existing capture without new execution, qualify
a measurement, or conduct an authorized optimization campaign. A diagnosis request alone does not
authorize a campaign.

## Qualify the number

1. State the claim, metric and decision criterion before measuring. Record base/head revisions,
   commands, dependency versions and environment. Compare equivalent facts and workload; account
   for warmup, cache state, drift and run order by interleaving sides where needed.
2. Count errors, rejections, timeouts and retries on both sides. Verify output correctness and
   completed work, not just successful process exit. Fast failures are not a speedup.
3. Confirm the intended work happened inside the timed window: iterate generators, await promises
   and consume results so they cannot be eliminated. Count the work actually completed.
4. Check the load generator's utilization as well as the measured system's. A saturated generator
   cannot establish the system's throughput limit. Profile in a separate run excluded from timing
   results; map the limiting resource or hot path to counters, symbols and source.
5. Run both sides with production settings: release builds, flags, pools, batching and realistic
   warm or cold caches. An untuned side leaves an implementation comparison inconclusive.
6. Check physical plausibility against cores, disk or network bandwidth and the changed path's
   share of total time. An impossible result calls the measurement into question.

Reject a claimed gain when errors, unconsumed work or generator saturation explain the number;
name the cause. Missing validity checks leave the comparison inconclusive, not faster.

## Report

Lead with **faster**, **slower**, **no measurable difference** or **inconclusive**. Give the result
with its unit, runs per side and dispersion or uncertainty, plus the validity evidence and limiting
resource. Choose repetitions for the decision and observed noise, without a fixed minimum. Label
a single run as a **single estimate**; it does not establish an improvement beyond noise. Keep
inconclusive claims `unproven` and name the missing evidence.

## Existing capture

1. Identify the artifact and format, then read the fixed profile, trace or heap with suitable
   existing tooling. Do not rerun the workload, instrument a live process or collect a new capture.
2. Narrow the finding to the hot frames, blocked thread or retainer chain. Map frames to symbols
   and source locations; explicitly report missing symbols or source mappings.
3. Cite the artifact and source locations. Without a comparable paired capture, present the
   finding as a hypothesis. A profile supports a mechanism, not proof of an improvement; a claimed
   gain still needs a qualified timing comparison.

## Authorized campaign

1. Confirm campaign authorization, workload, metric, decision criterion and a finite time or attempt
   budget before changing code. Stop at that budget and report the outcome.
2. Validate measurement sensitivity with contrasting realistic cases whose expected difference it
   must detect. Qualify the baseline with the checks above and run existing behavior checks, then
   freeze the measurement command and conditions. If the measurement must change, revalidate it
   and establish a new baseline before comparing candidates.
3. Test one hypothesis per trial. Measure before/after with the frozen setup and run the relevant
   behavior checks before the next trial; never stack unmeasured changes.
4. Keep a change only when the gain exceeds observed noise and behavior is preserved. Otherwise
   revert that trial's change, preserving unrelated work. Report trials, kept or reverted changes
   and remaining uncertainty within the original budget.
