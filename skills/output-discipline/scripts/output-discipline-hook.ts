#!/usr/bin/env bun
import { statSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const absolutePath = z
  .string()
  .min(1)
  .refine(isAbsolute, "must be an absolute path");
const environmentSchema = z.object({
  HOME: absolutePath.optional(),
  CLAUDE_CONFIG_DIR: absolutePath.optional(),
});

try {
  const environment = environmentSchema.parse({
    HOME: process.env.HOME || undefined,
    CLAUDE_CONFIG_DIR: process.env.CLAUDE_CONFIG_DIR || undefined,
  });
  const config =
    environment.CLAUDE_CONFIG_DIR ??
    (environment.HOME ? join(environment.HOME, ".claude") : undefined);
  if (config === undefined)
    throw new Error("HOME is required when CLAUDE_CONFIG_DIR is unset");
  const marker = join(config, ".output-discipline-always");
  if (statSync(marker, { throwIfNoEntry: false }) !== undefined) {
    const sourcePath = fileURLToPath(new URL("../SKILL.md", import.meta.url));
    if (!statSync(sourcePath).isFile())
      throw new Error(`${sourcePath}: not a regular file`);
    const source = readFileSync(sourcePath, "utf8");
    // Keep skill frontmatter out of the rules injected into the session.
    const body = source
      .replace(/^---[\t ]*\r?\n[\s\S]*?\r?\n---[\t ]*(?:\r?\n|$)/u, "")
      .replace(/[\r\n]+$/u, "");
    process.stdout.write(
      `OUTPUT DISCIPLINE ACTIVE (always-on). The ruleset below applies to every response.\n\n${body}\n`,
    );
  }
} catch (error) {
  process.stderr.write(
    `output-discipline: ${error instanceof Error ? error.message : String(error)}\n`,
  );
}
