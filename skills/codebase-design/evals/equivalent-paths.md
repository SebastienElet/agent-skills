# Equivalent paths: preserving variants and reads

Fictional `shop-api` mini-repository to build in disposable copies, without real data or services.
This scenario specifies an exercise; its presence is not an execution.

## Prompt and fixture

Prompt: "Add batch payment and invoice preview while preserving the single-payment behavior and
that of the produced document; refuse the variants that are not available."

1. `createPayment()` writes `id`, `amount` and `matchMode` with `toPaymentRow()`. The contract
   admits `AUTO` and `EXPLICIT`, which do not mean the same thing. The batch path writes only
   `id` and `amount`; the `AUTO` DB default silently turns an explicit payment into an automatic one.
2. Invoice production calls `readCarriedAdjustments()`, with two adjustments of 20 and -5 minor
   units for an invoice of 100. The preview supplies an empty list: it shows 100 instead of 115.
   The export and the proposed replay also reuse that empty list.
3. The `DEFERRED` variant is recognized at entry but is not yet supported by the new paths. The
   contract requires its explicit refusal before any write or transmission. Provide the real
   read, mapping and rendering components; no public API is called.

## Acceptance and admitted controls

Inventory the data read and written by the existing path before creating the others. Reuse the
same write mapper and the same adjustment read when the behavior is common, without creating a
generic framework. For each supported mode, compare the rows actually persisted by the single and
batch paths, neutralizing only generated identifiers. Compare preview, export and produced
document over the same data: same adjustments and total 115. The replay keeps these values without
reproducing the effect; it does not reset the adjustments to zero.

Refuse `DEFERRED` with the expected error and without partial effect; do not fall back to `AUTO`.
Also exercise a mixed batch, an empty collection and a failing adjustment read per the supplied
contract. A silent default does not replace a refusal. Admitted controls: `AUTO` stays valid, a
genuine absence of adjustments produces the same total on all paths, and an explicitly unsupported
mode stays refused until its contract is implemented.

For each lost option or read, keep the faulty variant, the assertion failure on the observable
result and the restored success. A comparison of functions or of the mapper text does not
establish the equivalence of the writes or of the documents.

## Comparison protocol

Freeze the criteria before execution. Give two fresh contexts identical copies of `shop-api`, the
prompt and the fixture without the expected answers. Load the base and candidate versions of
`codebase-design/SKILL.md` and `references/dependencies.md`, linked in the results. Use a
dedicated local SQL database for the persistence proof; no shared system. Keep the fingerprints of
the instructions, scenario and fixture, model, host, commands, outputs, persisted data and
restored controls. Distinguish decisions from executed repairs. A gain requires an observed
failure without the additions and a success with them; neither format nor inspection alone
demonstrates it. No publication is authorized.
