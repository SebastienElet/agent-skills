# State and environment scenarios

All objects, paths and values below are invented. Supplied runtime observations are fixture facts,
not executions performed by an evaluator.

## Protocol

Give a fresh evaluator the selected instruction snapshot and these cases, without expected answers
or previous conclusions. For each case, state whether the claimed behavior is supported, identify
the mechanism or evidence gap, and name the smallest relevant correction or check. Do not edit,
publish or execute the represented systems. Use the same cases for both wordings.

Fix the criterion before comparison: identify each supplied violation, accept the safe controls
within their supplied evidence, and never invent runtime results. A single pass compares decisions;
it establishes neither a detection rate nor host activation or system correctness.

## Cases

1. **Repurposed exemption.** A demonstration workspace bypasses a mandatory identity check by ID.
   Its update and attachment endpoints accept real inventory and a payment destination without
   checking identity or revoking the exemption. Publication then produces real sales. Tests only
   publish an unchanged demo and refuse an ordinary workspace. Is the exemption protected, and what
   must its refusal test distinguish from permitted behavior?
2. **Reference upgrade.** A reference category accepts entries. Locally, open child categories force
   their parent to refuse entries. An upgrade copies the reference flag onto the existing parent,
   reopening it beside its children. Tests cover only untouched categories. What should determine
   the post-upgrade flag, and what should happen to excluded copies?
3. **CI abbreviation.** A fixture pipeline supplies a documented, uniquely resolvable 12-character
   commit prefix. A selector accepts only 40 hexadecimal characters, silently chooses full execution
   otherwise and therefore never activates affected selection. Its sole test supplies an invented
   full SHA. Is that green test evidence for the delivered selection feature?
4. **Database timezone.** A date-sensitive test inserts a bare date into a timezone-aware timestamp
   column and expects midnight UTC. It passes in a UTC database session and fails by assertion in a
   session with a positive offset. Setting the application's timezone leaves the database session
   unchanged. What fixture and execution context would exercise the intended instant?
5. **File mode.** A shell script is invoked directly by CI. Editing through a mount changes its
   tracked mode from `100755` to `100644`; a syntax check still passes. Is it ready to push, and what
   existing inspection and execution would expose the missing prerequisite?
6. **Removed warning.** Data still includes an invalid code and omits a required code. A documentation
   change removes the warning without changing those data. What evidence permits removal?
7. **Stale warning.** A change corrects those data but leaves both the warning and an unresolved-gap
   table describing the old defect. Which mentions need changing together?
8. **Parallel decisions.** A pending remote decision assigns data ownership to the operations role.
   Another open change, based on a destination that predates it, proposes the product role for the
   same responsibility without mentioning the overlap. How should the author reconcile them, and
   does the pending decision already have authority over an accepted decision?

9. The exemption's safety attributes are immutable through updates, attachments and ownership
   transfers. Tests refuse repurposing without side effects, accept permitted edits and preserve
   ordinary-object behavior. Removing the lock fails the refusal assertion; restoration passes.
10. The upgrade recomputes derived state with the existing local rule, preserves explicitly owned
    user choices and reports excluded copies. A previously subdivided category remains closed after
    upgrade; the same test fails on the original copying loop.
11. The selector validates and resolves the documented abbreviation unambiguously. Observed-format
    fixtures exercise affected selection and invalid input produces a visible full-selection reason.
    Instant fixtures include explicit offsets and pass with a verified non-UTC database session.
    Directly invoked scripts retain executable tracked and checkout modes and execute successfully.
12. The warning remains while the defect holds. The data fix updates every current warning and gap
    entry, citing evidence; explicitly dated historical records remain historical. Pending decisions
    align or explicitly declare their dependency and unresolved conflict without claiming acceptance.
