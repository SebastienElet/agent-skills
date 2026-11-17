---
name: requirements-clarification
description: >
  Resolve decisions reserved to a human. Use when an unresolved choice may exceed the mandate
  through irreversible effects, access rights, sensitive data, amounts, retention or external
  commitments. Make sure to use this skill for new sensitive policy, even in analysis. Excludes
  established policy, discoverable facts and delegated product, scope or technical choices.
metadata:
  category: dev
---

# Requirements Clarification

## Overview

Prepare decisions that require human authority, with one question on a concrete result. Ordinary
choices stay with the task owner; uncertainty or an absent product owner does not create a veto.

## Usage

Apply only when the actual effects or an explicit reservation may exceed the existing mandate.
Read the user's delegation and applicable constraints first. Implementing established policy,
choosing a reversible product detail or splitting work within that mandate needs no clarification.
Analysis and review permit questions but authorize no implementation.

## Steps

1. Resolve facts from applicable instructions, ADRs in force, code and authorized sources. Reuse
   established policy and acquired decisions. Identify the concrete effect that could exceed
   authority; scope, cost or acceptance alone does not reserve a decision.
2. Inspect effects on data, users, access and external commitments, not just code reversibility.
   Reserve irreversible effects and new sensitive policy on access, sensitive data, amounts,
   retention or external commitments unless already explicitly authorized. Return other choices
   to the task owner under the existing delegation.
3. If effects remain materially uncertain, investigate within the existing budget; seek at most
   one independent opinion only when useful and permitted, never a systematic classifier.
   If a named role is absent, use existing delegation or ask the user or actually designated
   responsible person. Do not invent a validator or inherit the absent role's rights.
4. Prepare and test a sensitive proposal before asking only when preparation is delegated and
   isolated. Inspect dependencies and command destinations: a branch, synthetic records or a code
   rollback do not isolate real data, shared systems or external effects. Label the proposal,
   alternatives and consequences. Tests, review and delivery authority do not approve new policy;
   withhold delivery or exposure until human validation.
5. Ask the remaining reserved decision directly in the conversation, including during analysis,
   with a recommendation, consequences and precise missing authority, isolation or evidence.
   Group related decisions on the prepared result; ask once and keep a pending question pending.
   Continue independent work and suspend only dependent actions. Before delivery, account for
   material prerequisites as sourced, delegated or actually asked; a placeholder is not a question.

## Gotchas

- **Scope becomes a veto** — a delegated split waits for a nonexistent PO; decide and record the
  rationale and revisit condition within the mandate.
- **Small diff hides shared effects** — reverting code cannot restore deleted data or revoke a
  commitment; inspect destinations before preparing or exposing a proposal.
- **Green means approved** — tests validate the chosen assumption; ask the human on the prepared
  sensitive proposal before delivery or exposure.
- **Question only in a plan** — the decision never reaches its owner; ask once in the conversation
  and continue independent work.

## Constraints

- Never infer policy or implementation authority from silence, review or this skill.
- Never invent a responsible role or transfer its rights to the agent.
- Never expose an unapproved sensitive proposal or treat a branch as isolation.
- Never override an ADR, explicit task limit, investigation budget or essential check.
