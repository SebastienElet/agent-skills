# Isolated PR repair replay

This synthetic repository exercises a complete repair from an explicit invocation to the
publication/approval question. The forge adapter queries existing receipts; the local review
composition checks out the remote head at the explicitly supplied path. The fixture uses real local Git worktrees, commits, pushes and a rejecting
pre-receive hook; review verdicts and CI receipts are isolated doubles.

The oracle checks caller branch, HEAD, index bytes and staged/unstaged file contents; review and
correction-check directories; ordered failing/passing correction checks; one push; final-head review and CI
receipts; journal anchoring; and absence of publication, approval or merge. The final question and
its draft are inspected in the retained agent transcript, outside the executable oracle.
Unrelated caller checks remain visible as diagnostics and cannot satisfy correction evidence.
An invariant PASS does not establish perfect procedural compliance by the agent.

Use the source runner pinned in the repository's [evaluation guide](../../../README.md#executable-lesson-evaluations).
Run each variant with identical controls in a fresh report directory:

```sh
agent-experiments repository-run --case "$PWD/case.json" \
  --instructions "$PWD/baseline.txt" --model gpt-6-luna --reasoning-effort medium \
  --tool-path "$experiment_path" --timeout-seconds 300 --report "$new_baseline_dir"
agent-experiments repository-run --case "$PWD/case.json" \
  --instructions "$PWD/candidate.txt" --model gpt-6-luna --reasoning-effort medium \
  --tool-path "$experiment_path" --timeout-seconds 300 --report "$new_candidate_dir"
agent-experiments repository-compare "$new_baseline_dir" "$new_candidate_dir"
```

`evidence.tar.xz` retains the frozen cases, instruction variants, raw reports, transcripts,
source snapshots and native control outputs, including superseded and inconclusive attempts.
Extract it into a fresh directory to inspect or replay a particular historical case. Do not
rewrite a recorded grade when an oracle or fixture is corrected. `manifest.json` identifies
these artifacts and their provenance; the raw reports retain the executed candidate bindings.

These are explicit instruction-injection experiments on macOS ARM64 with Codex CLI 0.167.0,
`gpt-6-luna` medium, Bun 1.4.4 and Python 3.15.2. They do not establish automatic activation,
statistical uplift, adversarial isolation, a host-hook cause, real reviewer independence or hosted
CI. Claude Code, Cursor, Linux and live GitHub/Bitbucket workflows were not exercised.
