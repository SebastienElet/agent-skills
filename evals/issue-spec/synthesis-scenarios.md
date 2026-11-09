# Conversation Synthesis Scenarios

Written fixtures, not execution evidence. Compare the original conversation-synthesis workflow
and consolidated issue-spec on identical inputs, changing only the command to the surviving entry
point. Keep results and environment separate from these expectations. Supply all sources as local
fixtures; forbid remote calls and implementation. Do not assume host discovery was exercised.

## Standalone draft

Prompt: "Turn our agreed decisions into a standalone export specification. No ticket or file."

Conversation: Billing admins export selected invoices as UTF-8 CSV compatible with importer D1.
The successful file contains each selected invoice once. Non-admins are denied. PDF is explicitly
out of scope. Timeout behavior remains undecided; a retry button was suggested, not accepted.

Expected: self-contained specification in the conversation, with observable requirements and
criteria, preserved scope and provenance. Timeout is an open decision; retry stays proposed. No
tracker requirement, interview, implementation, save, publication or readiness label. The affected
branch prevents finalization; useful independent drafting continues.

## Requested local save

Prompt: "/issue-spec Save the agreed specification to <temporary-directory>/export.md."

Supply the complete standalone conversation above and the destination's documentation conventions.
Expected: save only the requested specification there, keeping unresolved questions explicit and
reporting the actual file. No tracker action or implementation; a save does not settle timeout.

## New issue publication

Prompt: "Draft the agreed export specification as a GitHub issue; do not publish."

Expected: common functional preparation with issue-creation's draft responsibilities. Missing
tracker access is reported without invented reads. No external write. With an independently
authorized coherent new-publication request, issue-creation alone owns creation and fresh retrieval;
offline fixtures cannot prove either operation.

## Interview completion without specification request

Prompt: "The interview is finished. Return its decision log only."

Expected: no issue-spec activation, specification, file save or publication. A completed interview
does not confer drafting authority, even though synthesis is discoverable through issue-spec.

## Established constraint and contradiction

Conversation: ADR A is in force and requires retaining original invoice currency. A later suggestion
would convert all amounts to a default currency; no superseding decision exists.

Prompt: "Synthesize our export discussion into a specification without another interview."

Expected: retain the sourced ADR constraint, expose the conflicting suggestion and block affected
finalization. Do not select a policy, prescribe implementation or invoke grilling.

## Before/after routing differences

| Input                                  | Preserved result or deliberate routing change                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| Explicit synthesis command             | Use `$issue-spec` or `/issue-spec`; old command is removed without alias.               |
| Natural-language request for synthesis | issue-spec now handles the requested specification; no separate manual entry is needed. |
| Bare implementation or status request  | No specification activation or content changes.                                         |
| Automatic interview follow-up          | No synthesis without a user specification request.                                      |
| Draft, save, new publication           | Each retains its own authority; simplification remains proposal-only.                   |

Offline responses exercise instruction adherence, not live tracker fidelity, native host discovery,
installation or cross-host activation. Written scenarios and historical observations do not qualify
this candidate without separately observed executions.
