# Sending rechecks the actual business window

Fictional mini-repository specification. No fixture execution or real service is implied.

## Prompt and fixture

Prompt: "Finish delivery scheduling and mark-sent behavior in shop-api and shop-web."

1. A document is generated on day 10; a slot is on day 12 and the declared sending date is day 13.
   Generation currently validates the slot, while `markSent(orderId, sentOn)` trusts that result.
2. Slot entry and sending use different predicates for the bounding event. Held and cancelled
   events must not bound the fictional window; the next planned event is on day 20.
3. The established interval is `[sentOn, event.at)`; no qualifying event cannot establish a window.

## Acceptance and admitted controls

Keep generation provisional. Marking sent rechecks against the declared date, refusing the day-12
slot with 412 and no sent-state write. A slot at day 13 succeeds; one at day 20 refuses. Test both
bounds, just outside them, held and cancelled events and the no-qualifying-event case on entry and
sending. Use one relevant-event predicate across both paths. Preserve a valid send control.

Restore the generation-date anchor or the divergent event predicate independently. Each temporal
assertion must fail, then pass after restoration. This supplements the historical screens-and-windows
experiment without altering its recorded observations.

## Comparison protocol

Freeze acceptance and controls before trials. Give two fresh sessions identical disposable copies
of the fictional fixture and prompt, without the acceptance section. Load the base and candidate
versions of the inputs listed in the paired results file. Use neutral variant labels and one blind
judge; record skill loading separately from application. Retain fixture and input fingerprints,
model, host, commands, outputs and restored controls. A gain requires observed failure without the
addition and success with it. Repository checks do not execute this scenario.
