# Published PR verdict comment

Complete every phase and the [internal audit](verdict-template.md) before selecting a form below.
Write only the selected form into `verdict.md`; publish through `references/forges.md` after the
required confirmation. Follow the PR's language. The marker and publication protocol are unchanged.

## Approved without reviewer changes or findings

Use at most eight physical lines, including the marker and blank lines. Remove optional bullets
when no material limit remains. Add `(advisory)` to the verdict line unless controlled enforcement
was established; this qualifier states scope once without a separate disclaimer or closing line.

```text
<!-- pr-verdict:<pr>:<head-sha-12> -->
Approved — <head-sha-12> → <destination> (advisory).
<One sentence: decisive evidence, its origin and actual tested candidate, with an artifact link.>

- <Material residual limit, only if relevant to the reader's decision.>
- <Second material limit, only if needed.>
```

Never add a behavior table, task totals, proof-audit codes, methodology, routine statements about
making no changes, or a repeated approval. Keep all counts, commands, environment details, witness
results, relevant-input comparisons, rule inspections and audit conclusions in the internal record. Keep an environment or
integration distinction in the public sentence or a limit when it changes what the evidence proves:
a synthetic merge run must not be described as execution on the source head.

### Filled example

All identifiers and evidence below are fictional; the example assumes the destination is integrated
and the complete internal audit supports approval.

```text
<!-- pr-verdict:123:a1b2c3d4e5f6 -->
Approved — a1b2c3d4e5f6 → main (advisory).
CI passed on this head: [pipeline](https://ci.example/app/runs/456).
```

## Other verdicts, reviewer changes or findings

Lead with the actionable findings, then give decisive evidence and material limits. Aim for at most
thirty lines. Do not copy the complete audit into the comment. A demonstrated defect needs its
failure mechanism and lift criterion; an essential-evidence blocker needs the missing proof, why
approval needs it and its lift criterion. Keep reservations bounded and label non-blocking findings.
If reviewer changes were made, identify their effect and the candidate actually rechecked.

```text
<!-- pr-verdict:<pr>:<head-sha-12> -->
<Verdict> — <head-sha-12> → <destination> <advisory qualifier when applicable>.

- <Actionable finding: mechanism or essential missing evidence, consequence and lift criterion.>

<Decisive evidence with provenance, actual tested candidate and link.>
<Material limits; bounded reservations or non-blocking remarks only when useful.>
Fix: <url, required when blocking outside a composed pr-fix review>
Initial review: <url, when a previous verdict exists>
```

When full details are explicitly requested, follow the same findings-first order and include the
complete behavior ledger and relevant audit evidence. Keep the comment within about thirty lines
by linking longer evidence, not by dropping required rows or blockers. Do not claim a mechanical
merge refusal without its controlled observation. Never change an approval prerequisite to fit a
short form.

For every form, preserve a required initial-review link and any dated same-head reassessment under
`references/forges.md`. An appended reassessment keeps the historical verdict; the eight-line limit
applies to its new summary, not to the retained history.
