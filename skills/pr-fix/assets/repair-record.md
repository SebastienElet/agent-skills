# PR repair record template

Fill this skeleton from the complete journal in the pull request's language. Use one short bullet
per corrected problem, describing the final behavior. When nothing was corrected, no record is
published. Keep detailed mechanisms, per-pass proofs and
superseded attempts in the local journal. Pass the public summary through a body file.

## Skeleton

```text
<!-- pr-fix:<pr> -->
Corrections completed on `<final-head-sha>`.

- <problem corrected and resulting behavior>.

Validation: <tested head/base, environment, tier, principal commands, exit statuses, output artifacts and counts>; required CI: <linked result on this SHA, or none required>.
Independent review: `approved` on `<final-head-sha>`, no remaining actionable defect.
Native approval: <confirmed for <account> on `<final-head-sha>` | already present for <account> on `<final-head-sha>` (GitHub) | present for <account>, age unknown (Bitbucket) | not granted: <refusal, user decline or prohibition, or own PR>>; PR state: <forge state, e.g. OPEN>.
Limits: <material evidence gaps or deliberately excluded findings and reasons; omit this line when none>.
```

## Self-check before publishing

- Publish only after independent `approved`, successful required remote CI on the current SHA,
  and a native approval state permitting publication under the native approval procedure.
- Write `confirmed` only from the evidence required by the native approval procedure; never let
  this comment imply an approval the forge does not show or bind an unknown-age approval to a head.
- Stable PR marker first; update the existing repair comment even when the SHA changes.
- One opening sentence, correction bullets, one validation paragraph; aim for 15 non-empty lines.
- Cover all final corrected problems across passes; group related outcomes instead of truncating.
- State material limits and reasoned omissions directly after validation; retain full proof in the
  journal and never copy old results as evidence for the final SHA.
- Body passed through a file; no local paths, formal verdict or merge decision.
