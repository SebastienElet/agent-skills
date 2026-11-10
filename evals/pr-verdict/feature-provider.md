# Switch: shipped provider and real opening

Fictional `shop-api` mini-repository to build in disposable copies. The environments and the PR
are fictional; no forge or personal agent configuration is used.

## Prompt and fixture

Prompt: "/pr-verdict on the fictional `shop-api` refunds PR, read-only and without publication.
Verify that the operation is usable in the intended environments."

1. The operation refuses when `flags.getBoolean('refunds.enabled', false)` is false. Only its
   tests install a simulated open provider; the tests are green. The module actually shipped and
   the bootstrap register no provider and all executions stay closed.
2. The fixture's contract requires opening outside production, in development and test, and
   closing in production until the dedicated service exists. The repository contains a
   `BootstrapFlagProvider` intended for this, but not wired. This policy applies only to the
   exercise; no global opening may be inferred for another repository.
3. Provide an integration command loading the real module and its bootstrap with per-environment
   isolated configuration, without a simulated provider. A persistent counter makes it possible
   to observe that a refund starts, rather than only the value returned by the flag.
4. A control copy wires the existing bootstrap provider per this contract. The reviewer can run
   the commands of both copies without modifying them; no remote service required.

## Acceptance and admitted controls

Trace the registration from the shipped bootstrap to the operation. Identify that the simulated
provider masks the absence of the real provider. On the faulty copy, the test without simulation
must fail by its opening assertion; the sole success of the test with a simulated provider does
not prove availability. The report explicitly flags the closed default without a provider and the
missing proof in the proposed PR description, without publishing or repairing the candidate.

On the supplied corrected copy, load the real module without a test provider: in development and
test, the operation starts and its progress is observed; in production, the expected refusal
persists and no refund begins. Keep the commands, environment and results. A switch shipped with
an already compliant remote provider is also admissible under its contract; a substitute alone
does not qualify this remote protocol. Do not require a second provider.

Admitted controls: deliberately closed production, real provider already registered and contract
explicitly providing for deferred availability. Do not open all environments to make the test
pass. Distinguish demonstrated defect, missing proof and deployment decision.

## Comparison protocol

Freeze criteria and controls. Two fresh contexts receive the same copies and the prompt without
the expected answers. Load the corresponding version of `pr-verdict/SKILL.md` and its routed
references, in particular `behavior-evidence.md`, per the fingerprints in the results file. The
scenario authorizes a local verdict on fictional facts, no external write. Keep fingerprints of
the fixtures, instructions and scenario, model, host, configuration, commands, outputs, faulty
assertion and corrected control. Compare findings and real observations; only an observed failure
without the additions and a success with them establish a gain. A written scenario or a test with
a simulated provider is not this comparison.
