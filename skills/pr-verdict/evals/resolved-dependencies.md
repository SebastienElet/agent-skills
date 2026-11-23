# Integrated dependencies preserve effective versions

Fictional mini-repository specification. No fixture execution or real service is implied.

## Prompt and fixture

Prompt: "Review the dependency and container update in shop-monorepo."

1. The target upgraded global `lib-x` to 3.4.1. The branch adds a more specific
   `parent-lib@1.20.0>lib-x` override at 3.3.7. Their merge has no textual conflict.
2. A local-stack image has only a mutable release tag. A copied upstream configuration belongs to
   an earlier release, although a marker could be edited to claim the new revision.
3. The recipe has only been exercised on macOS ARM64 with an emulated image. No other platform
   result exists. All package names, versions and configuration contracts are fictional.

## Acceptance and admitted controls

Inspect effective parent-to-child resolution against the target lockfile, detect the downgrade
and rebuild from the target lockfile with the package manager. Verify frozen installation. Pin the
image digest and record the actual upstream revision of the configuration copy. Exercise the paired
configuration through the consuming tool's native validation or startup; matching version markers
alone are insufficient. Report the exact exercised platform and emulation, leaving others unproven.

Restore the targeted downgrade or the obsolete configuration separately. Package-manager resolution
and native configuration behavior must expose the corresponding defect, then pass after restoration.
A mutable tag remains a review finding even if one startup succeeds.

## Comparison protocol

Freeze acceptance and controls before trials. Give two fresh sessions identical disposable copies
of the fictional fixture and prompt, without the acceptance section. Load the base and candidate
versions of the inputs listed in the paired results file. Use neutral variant labels and one blind
judge; record skill loading separately from application. Retain fixture and input fingerprints,
model, host, commands, outputs and restored controls. A gain requires observed failure without the
addition and success with it. Repository checks do not execute this scenario.
