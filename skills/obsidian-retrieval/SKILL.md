---
name: obsidian-retrieval
description: >
  Retrieve read-only knowledge from Obsidian vaults or local Markdown corpora with rg. Use when
  searching notes, following wikilinks, or finding tags. Make sure to use this skill whenever
  local notes are evidence, even if Obsidian is not named. Excludes note editing and Bases queries.
compatibility: Requires a POSIX shell, rg, and read access to local Markdown files.
metadata:
  category: ops
---

# Obsidian Retrieval

## Overview

Find and read source notes. Wikilinks are the graph.

## Usage

Use the supplied corpus, otherwise the configured default or a known vault workspace.
Stop on an unreadable root or ambiguity; never guess another corpus.

## Steps

1. From the selected root, read `Index.md` with `nl -ba Index.md` if present and inspect
   `rg --files -g '*.md'` to learn the layout and vocabulary.
2. Search literal terms, then a few synonyms for conceptual questions:

   ```sh
   rg -n -F -g '*.md' -- 'exact phrase' .
   rg -n -i -g '*.md' -e 'term' -e 'synonym' -e 'related term' .
   ```

3. Find backlinks and tags, replacing `Title` and `tag`:

   ```sh
   rg -l -g '*.md' '\[\[Title(\||#|\])' .
   rg -n -g '*.md' '#tag' .
   ```

4. Read relevant notes in full with `nl -ba 'path/to/note.md'`, follow useful links, and
   cite root-relative `path:line`. Inspect tag hits in context; fragments and prose can match.

## Gotchas

- Regex metacharacters in titles change matches: escape them in the backlink pattern.
- Path-qualified wikilinks evade a bare title: repeat with the root-relative link target.
- No matches do not prove absence: report root and terms tried; `rg` exit 1 means no hits,
  while errors must be reported separately.

## Constraints

- Keep reads inside the selected root; do not modify notes or configuration.
- Use only filesystem reads; do not install tools, build indexes, or add a graph database.
- Answer from complete notes, never search snippets alone; report missing evidence.
