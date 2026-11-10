# Supplied review scenarios

Apply the supplied PR Verdict guidance to each independent scenario. Return the class outcome,
verdict consequence, ordered mechanism or evidence gap, and lift condition. Assess only the
specified concern; do not run forge operations or infer missing unrelated checks. These are supplied
facts for a decision exercise, not claims that you executed the represented software.

## A — hook deadline

A hook must refuse a protected operation whenever the repository has an enabled guard declaration.
The current repository has that declaration on disk. Its changed implementation is:

```js
let guarded = false;
try {
  const root = await gitRoot({ timeoutMs: 20 });
  guarded = await enabledGuard(root);
} catch {}
return guarded ? 2 : 0;
```

The Git probe times out before returning a root. Hook exit 0 authorizes the operation; exit 2 refuses it.

## B — installer result

An installer promises success only after confirming its target is a Git repository. Its changed
implementation catches a `git rev-parse` timeout, records a warning and returns `{ ok: true }`.
The caller proceeds with configuration whenever `ok` is true.

## C — shell status

A required language-server readiness check runs a shell command ending with `printf ready`.
The language server exits 1; `printf` succeeds. The checker uses only the shell's final exit 0
and authorizes installation. Readiness requires the server's own successful response.

## D — replacement result

A publisher must configure a required endpoint in a recipe before publishing it. The template's
placeholder has changed, so `template.replace(oldPlaceholder, endpoint)` leaves the recipe unchanged.
The publisher does not check for a match or inspect the resulting configuration, then reports success.

## E — partial inventory

A merge-enforcement assessment fetches the first 30 active branch rules; the response has a next
page. It reports that no pull-request rule applies and that a change-request review is advisory.
A relevant pull-request rule is on the unread page. No controlled merge-refusal evidence exists.

## F — access probe

A control promises to verify authenticated access to private repositories. It treats an anonymous
read of a public repository as proof of that access. It also treats the lack of commits in an
accessible empty private repository as proof that credentials were rejected. Neither observation
tests the promised access property.

## G — explicit outcomes

The corrected hook distinguishes verified allow, verified deny and inconclusive. An observed
timeout or probe error yields inconclusive and refuses the operation with a diagnostic; an enabled
guard yields deny and exit 2. A complete successful probe proves the guard disabled and yields
allow and exit 0. An executed controlled test covers all three outcomes and incomplete output;
it fails when the timeout branch is changed to allow, then passes after restoration. Assess only
whether this evidence establishes the stated probe-decision behavior.
