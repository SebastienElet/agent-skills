# Replay fingerprints observe verdict-changing privileges

Fictional mini-repository specification for `shop-api`. No fixture or SQL execution is implied.
Lesson source: [SebastienElet/dotfiles#725](https://github.com/SebastienElet/dotfiles/issues/725).

## Prompt and fixture

Prompt: "Repair SQL validation replay in shop-api. Preserve valid cache reuse and prove that
privilege changes cannot replay a stale success."

Prepare a disposable repository with `src/sql-validation.ts`, `src/environment.ts` and
`test/sql-validation.test.ts`. Pin the runtime, database and driver when materializing it. Use a
private real database with an administrator connection for fixture setup and a separate connection
as the role actually running validation. Never use shared roles or data.

The defective environment observation contains only `schemaDigest` and `serverVersion`; the
fingerprint hashes these fields. The public validator returns a cached success before executing
SQL when that key exists. Its database query requires a grant not represented by those fields.

1. Give an ordinary role the required grant and obtain a successful validation. Revoke that grant
   through the fixture administrator, reconnect as the same ordinary role and invoke the validator
   again. Schema digest and server version stay equal. The defective path replays success while
   fresh SQL would refuse.
2. Supply observations with missing `roleSuperuser`, then with `roleSuperuser: "true"`. The
   defective admission path accepts both because it never validates that capability.
3. Start as a superuser, validate, demote the role and reconnect. Its schema/server-only key still
   matches the prior success despite its changed authority.

## Acceptance and admitted controls

Write the discriminating assertions first and observe them fail against the defective path:

| Case                                                 | Required assertion                                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Ordinary role before and after revocation            | Every invocation executes afresh; the post-revocation SQL refuses instead of replaying success. |
| Repeated `roleSuperuser: false`                      | A new nonce on each invocation prevents reusable keys even before a grant changes.              |
| Missing observation                                  | No reusable fingerprint is issued.                                                              |
| String `"true"`, null or numeric value               | Strict runtime validation refuses reuse without truthy coercion.                                |
| Superuser demotion                                   | The old success cannot be reused; the new ordinary-role invocation executes afresh.             |
| Unchanged superuser observation and all other inputs | Complete successful validation may be reused and reported as reuse.                             |

Then observe the effective role's `roleSuperuser` as a strict boolean. Validate the other required
observation fields too. Include the capability in the fingerprint only after validation. Since this
fixture does not model ordinary grants completely, add a new nonce for every ordinary-role
invocation and execute the unchanged SQL validation. Missing or invalid observations may refuse
fingerprinting or force nonce-based execution, but never authorize reusable success. A fresh SQL
failure remains a failure and publishes no success. Do not infer grants from the role name.

Exercise the validator's public entry point and retain executed/reused outcomes plus the database
refusal. Equality of key strings alone does not establish execution or a correct SQL verdict.
Restore the omission in a disposable copy: the same assertions must expose stale success again;
restore the correction and require their pass. An in-memory cache is sufficient for cache storage,
but a fake database cannot prove privilege revocation semantics.

## Comparison protocol

Freeze these assertions and controls before trials. Give fresh base/candidate contexts identical
fixtures and the prompt without this acceptance section. Load the inputs bound in the paired
results file; use neutral variant labels and a blind judge. Retain the executable fixture digest,
guidance/scenario fingerprints, exact runtime/database/driver and host, commands, raw SQL outcomes,
cache outcomes and restoration results. Record skill loading separately from application.

The criterion is "fails without the instruction and passes with it" on the same assertions,
including the reusable control. An equal result, unavailable database or unexecuted comparison
does not establish improvement. Repository checks do not run this fictional mini-repository.
