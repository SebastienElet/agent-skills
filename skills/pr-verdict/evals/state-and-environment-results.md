# State and environment evaluation record

## Method and observations

On 2026-10-21, two separate fresh evaluator contexts read the same
[eight violating cases and four safe controls](state-and-environment.md), presented as one neutral
numbered list without classification headings. One read the prior instruction snapshot; the other
read the revised snapshot. Each received only its selected inputs, the scenarios and protocol,
without expected decisions or earlier conclusions. The criterion fixed
before comparison was to identify every supplied violation, accept safe controls within their
evidence and invent no execution results.

| Case                 | Prior / revised decision           | Mechanism identified in both passes                                 |
| -------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| Repurposed exemption | Broken / broken                    | Identity exemption survives a mutation introducing real effects.    |
| Reference upgrade    | Broken / broken                    | Reference copying overrides a local derived restriction.            |
| CI abbreviation      | Broken / broken                    | A valid abbreviated value always disables promised selection.       |
| Database timezone    | Incorrect fixture / same           | A bare date depends on the database session timezone.               |
| File mode            | Not ready / same                   | Syntax validation omits the permission needed for direct execution. |
| Removed warning      | Unsupported removal / same         | The underlying defect remains true.                                 |
| Stale warning        | Contradictory documentation / same | Two current mentions describe corrected data.                       |
| Parallel decisions   | Unresolved conflict / same         | Overlapping proposals disagree without acknowledging dependency.    |

Both passes accepted all four safe controls within their supplied evidence, including the refusal
witness for repurposing, local-rule survival through upgrade, actual environment and invocation
checks, and documentation matching current facts without promoting pending proposals to authority.
No decision improvement was demonstrated. The revised wording makes the specific checks explicit;
one pass per wording does not measure reliability or a detection rate.

## Scope and limits

The evaluation ran on an arm64 Unix workstation in separate agent contexts. Exact served model/build
and sampling settings were unavailable. Evaluators read files and returned decisions; they did not
run the represented application, database, selector or CI script. Faulty and safe cases supply their
own runtime observations. These results qualify only the decisions on those supplied facts, not
underlying system correctness, host activation, installation or behavior on other platforms.

Repository tests, typecheck and formatting exercise their existing surfaces and do not establish
instruction effectiveness. No forge writes, publication or agent installation were performed.

## Input identities

SHA-256 identifies input bytes, not a software revision or execution truth. Paths are relative to
the selected skill snapshot. The scenario fingerprint is shared by both passes.

| Input                                      | Prior wording                                                      | Revised wording                                                    |
| ------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `code-enforcement/SKILL.md`                | `9db00b5fe5d366fa298ffb2d98d41afb210d7695a728f6dfaccc9c7d5bc47edd` | `bde0fb506a7490be6e70031917a2448589dd1cacc40086a17943776cf1cb2f70` |
| `pr-verdict/references/failure-classes.md` | `ec217e1a68af5ac43dca1ded24ef30f33454870e8db2f4f2b1324291a2538e03` | `6448740d263da89a4486a4fd681a4d1eb4fc2f440816a481ad2d1c41bf73ac5a` |
| `pr-fix/SKILL.md`                          | `d9b9e0ad911cd8e55dc17cfe4e880c0b07a0dd7f2fdce09640851472de045ee2` | `6580815fdbd79e4a7172cb0ed796381309f2f26f2e560c4677a16ca2dbd6f776` |
| `tdd/references/tests.md`                  | `b8fedcd3368fc43e3fd6413db2594246b4801e7aa2903b6287c8ff4a51a8d154` | `a926357773b44be57cc7d4321eff70d8f80da7fcddab3b252d49747807792b3d` |

Scenario SHA-256: `9bddf04ec1bf6d4002d3ddea8f1b67fd8d457672429007585d2dfea6259eddb0`.
