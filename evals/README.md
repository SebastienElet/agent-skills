# Maintainer evaluations

This directory ships with the package beside `skills/`. It contains activation scenarios,
prepared cases and historical campaigns, including prompts, transcripts, reports and source
snapshots. Select `skills/<slug>/` for ordinary projection; access `evals/<slug>/` explicitly
when maintaining or replaying an evaluation. No evaluation runner is bundled here.

The [lesson evaluation guide](../README.md#executable-lesson-evaluations) lists executable cases,
the pinned source runner and its invocation. For example, set `case_dir` to this package's
`evals/codebase-design/module-boundaries/` directory. Its `case.json`, `a.txt`, `b.txt`,
`control.json` and `summary.json` remain together with the recorded executions. The case supplies
its synthetic fixture, setup and oracle; use a disposable workspace and the guide's isolation
requirements. A fixture replay does not establish live-agent behavior or host activation.

Maintenance resources moved out of operational references are also retained here:

- [Code simplification scenarios](code-simplify/validation.md).
- [Output discipline verification](output-discipline/verification.md) and
  [continuation evaluation](output-discipline/continuation-evaluation.md).
- [Verdict execution evidence reconciliation](pr-verdict/execution-evidence.md).

Historical inputs, reports and fingerprints retain their original bytes and provenance. Paths
inside those records describe the captured layout, not a new run or the current skill revision.
For local navigation, translate `skills/<slug>/evals/<path>` (or `<slug>/evals/<path>`) to
`evals/<slug>/<path>`. A reference from a record back to its former skill directory now resolves
under `skills/<slug>/`; cross-skill evaluation references resolve under `evals/<other-slug>/`.
For example, the lesson summaries' former `../../../tdd/evals/lesson-runtime.json` refers to
[evals/tdd/lesson-runtime.json](tdd/lesson-runtime.json). Absolute historical paths and source
hashes continue to identify the original execution; they are not rewritten to imply current evidence.
