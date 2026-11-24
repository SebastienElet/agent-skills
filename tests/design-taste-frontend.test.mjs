import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

for (const entry of ["inspect", "scenes"]) {
  test(`${entry} reports a browser launch failure and removes its temporary profile`, () => {
    const project = mkdtempSync(join(tmpdir(), "taste-launch-test-"));
    try {
      const chrome = join(project, "unusable-browser");
      writeFileSync(chrome, "fixture", { mode: 0o600 });
      writeFileSync(join(project, "index.html"), "<h1>Fixture</h1>");
      const script = fileURLToPath(
        new URL(
          `../skills/design-taste-frontend/scripts/${entry}.mjs`,
          import.meta.url,
        ),
      );

      const result = spawnSync("node", [script, "index.html"], {
        cwd: project,
        env: {
          PATH: process.env.PATH,
          SystemRoot: process.env.SystemRoot,
          CHROME_PATH: chrome,
          TASTE_SKILL_TMP: project,
        },
        encoding: "utf8",
        timeout: 5000,
      });

      assert.ifError(result.error);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /^Could not start Chrome: spawn .*\n$/);
      assert.equal(result.stdout, "");
      assert.deepEqual(
        readdirSync(project).filter((name) => name.startsWith("ad-chrome-")),
        [],
      );
    } finally {
      rmSync(project, { recursive: true, force: true });
    }
  });
}
