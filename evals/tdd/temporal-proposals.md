# Transmitted dates and proposed values

Fictional `shop-api` repository. This is a mini-repository specification, without implicit
execution, personal data or real transport service.

## Prompt and fixture

Prompt: "Fix the preparation and export of deliveries; every proposed date must be accepted and
the address rules must stay consistent with billing."

1. `confirmDelivery()` refuses a past date. `exportToCarrier()` transmits the stored date without
   rechecking it several days later.
2. The contract requires a lead time of two business days. `proposeDeliveryDate()` takes only the
   next business day. Provide an explicit calendar with weekend, public holiday and closure:
   Friday 2026-05-01 a holiday and Monday 2026-05-04 closed. From Thursday 2026-04-30, the next
   two business days are Tuesday 5 and Wednesday 6 May; the expected proposal is 6 May.
3. The billing module's canonical source requires a postal code for `FR`, `DE` and `ES`. The new
   address validator requires it only for `FR`.

## Acceptance and admitted controls

With an injected clock, confirm a delivery on 6 May then advance to 7 May: the export refuses the
date that has become past, without file or transmission. The same export with a still admissible
date succeeds. Exercise the last admitted day and the first refused day at each producing or
transmitting step, per the same business rule.

For each date in a range covering these closures and their eves, run the value actually proposed
through the real validator with the same clock and the same calendar. Verify the expected 6 May
example separately; do not recompute the expected value with the algorithm under test. A proposal
produced earlier passes the validator again with the transmission clock.

Reuse the canonical source of the countries. For each of the three countries, refuse the absence
of a postal code and accept a valid address; a country without this requirement stays accepted per
its contract. Do not copy the table under another name. These rules belong only to the fictional
case. Keep a default control: export without recheck, reduced lead time and omitted country; each
variant fails by the relevant assertion, then passes after restoration.

## Comparison protocol

Freeze the criteria before the trials. Give two fresh contexts identical disposable copies of
`shop-api`, the prompt and the calendar without the acceptance section. Load the base and
candidate versions of `tdd/SKILL.md`, `tdd/references/tests.md`, `tdd/references/dependencies.md`,
`codebase-design/SKILL.md` and `codebase-design/references/dependencies.md`. The inputs are linked
in the results file; the scenario and the fixture stay identical between sessions. Keep
fingerprints, model, host, time zone, clocks, commands, outputs and restored controls.
Distinguish proposed decision from executed repair. A gain requires an observed failure without
the additions and a success with them; a written or formatted scenario demonstrates no
improvement.
