# New surfaces: neighbor guards

Fictional `shop-api` mini-repository to build in a disposable space. The permissions, people,
tables and observations described are scenario data, without execution or real policy.

## Prompt and fixture

Prompt: "Add an export's payments, its exclusion list and its publishable versions with the same
protections as the neighboring features."

1. `/exports/:id/payments` requires only `exports:read`. The neighboring payments route requires
   `payments:read` and the organization scope, already established by the fixture's contract.
2. `excludedCustomers` persists `{ id, name }`. A rename or erasure does not modify the copy. The
   neighboring contract keeps the ID and resolves the label at read time; the authorized erasure
   removes the name there and handles the reference without preventing the planned purge.
3. `invoice_version` has row triggers refusing `UPDATE` and `DELETE`, except a one-time
   publication: three fields go from empty to filled, the others stay identical. `TRUNCATE`
   bypasses these guards. The sibling table has a statement-level guard. The ORM requalifies the
   trigger's refusal as a foreign-key violation.
4. `Promise.all(customers.map(fetchPaymentMethod))` launches ten simultaneous calls. The
   neighbors' contract bounds concurrency to four and the exposed reads have bounded pagination.

## Acceptance and admitted controls

Inventory the neighbor guards before modification and reuse their canonical sources, or justify
a difference by the contract. With a valid scope, the subject authorized only for exports reads
no payment; the one authorized for payments succeeds. Refuse the wrong scope separately: a global
refusal does not prove the permission of the data's owner.

Persist only the necessary references. Renaming the person must change the label read; running
the authorized erasure must delete the personal data without a residual copy. Read the storage
independently of the response and test the reference that became absent.

With the real database, the protected role and existing rows, attempt raw `UPDATE`, `DELETE` and
`TRUNCATE` in SQL, each in a separate transaction. Verify the trigger's identified refusal and
the unchanged content, without accepting an ORM or preparation error in its place. The permitted
first publication succeeds; its repetition and the modification of another field fail. The
established purge remains possible through its authorized path, without bypassing the ordinary
role.

Measure the simultaneous calls over ten clients with a controlled adapter: at most four, all
results returned. Also exercise an empty collection, an error from one call and an absent result
per the contract, without leaving detached calls. Keep the bound and the pagination of the reads.
Remove each guard separately: the targeted assertion must fail, then pass after restoration.

## Comparison protocol

Freeze acceptance and controls before the trials. Give two fresh sessions the same fixture and
the prompt, without the expected answers, with a dedicated SQL database and no shared resource.
Load the corresponding version of `codebase-design/SKILL.md` and its `dependencies.md` reference.
The base/candidate and scenario fingerprints are in the results file. Keep model, host, SQL role,
commands, outputs, persisted content and restored controls. Distinguish inspection, decisions and
repairs actually executed. The gain requires an observed failure without the additions and a
success with them; the repository's checks do not run this scenario.
