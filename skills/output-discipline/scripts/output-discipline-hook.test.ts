import { afterEach, expect, test } from "bun:test";
import {
  copyFile,
  mkdir,
  mkdtemp,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

const temporaryDirectories: string[] = [];
const executable = resolve(import.meta.dir, "output-discipline-hook.ts");
const packageRoot = resolve(import.meta.dir, "../../..");

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((path) => rm(path, { recursive: true, force: true })),
  );
});

async function fixture(body?: string) {
  const root = await mkdtemp(join(tmpdir(), "output-discipline-"));
  temporaryDirectories.push(root);
  const scripts = join(root, "skills/output-discipline/scripts");
  const home = join(root, "home");
  await mkdir(scripts, { recursive: true });
  await mkdir(join(home, ".claude"), { recursive: true });
  await copyFile(executable, join(scripts, "output-discipline-hook.ts"));
  await symlink(join(packageRoot, "node_modules"), join(root, "node_modules"));
  if (body !== undefined) await writeFile(join(scripts, "../SKILL.md"), body);
  return {
    root,
    home,
    scripts,
    marker: join(home, ".claude/.output-discipline-always"),
    run: async (
      extraEnvironment: Readonly<
        Partial<Record<"HOME" | "CLAUDE_CONFIG_DIR", string>>
      > = {},
    ) => {
      const child = Bun.spawn(
        [process.execPath, join(scripts, "output-discipline-hook.ts")],
        {
          cwd: home,
          env: { HOME: home, ...extraEnvironment },
          stdout: "pipe",
          stderr: "pipe",
        },
      );
      const [stdout, stderr, status] = await Promise.all([
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
        child.exited,
      ]);
      return { stdout, stderr, status };
    },
  };
}

test("opt-in loads the packaged body outside any checkout", async () => {
  const setup = await fixture("---\nname: hidden\n---\nVisible\n");
  await writeFile(setup.marker, "");
  expect(await setup.run()).toEqual({
    status: 0,
    stdout:
      "OUTPUT DISCIPLINE ACTIVE (always-on). The ruleset below applies to every response.\n\nVisible\n",
    stderr: "",
  });
});

test("a dangling marker does not enable injection", async () => {
  const setup = await fixture("Visible");
  await symlink(join(setup.root, "missing"), setup.marker);
  expect(await setup.run()).toEqual({ status: 0, stdout: "", stderr: "" });
});

test("an absent marker stays silent even without a skill resource", async () => {
  const setup = await fixture();
  expect(await setup.run()).toEqual({ status: 0, stdout: "", stderr: "" });
});

test.each([
  ["--- \r\nname: hidden\r\n---\t\r\nVisible\r\n", "Visible"],
  ["Visible", "Visible"],
  ["---\nUnclosed", "---\nUnclosed"],
  [
    "Before\n---\nname: visible\n---\nAfter\n",
    "Before\n---\nname: visible\n---\nAfter",
  ],
])(
  "preserves body bytes while removing only initial closed frontmatter: %s",
  async (source, body) => {
    const setup = await fixture(source);
    await writeFile(setup.marker, "");
    const result = await setup.run();
    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toBe(
      `OUTPUT DISCIPLINE ACTIVE (always-on). The ruleset below applies to every response.\n\n${body}\n`,
    );
  },
);

test("a custom config directory alone controls opt-in", async () => {
  const setup = await fixture("Visible");
  const config = join(setup.root, "custom");
  await mkdir(config);
  await writeFile(setup.marker, "");
  expect(await setup.run({ CLAUDE_CONFIG_DIR: config })).toEqual({
    status: 0,
    stdout: "",
    stderr: "",
  });
  await writeFile(join(config, ".output-discipline-always"), "");
  expect((await setup.run({ CLAUDE_CONFIG_DIR: config })).stdout).toContain(
    "Visible\n",
  );
});

test.each([false, true])(
  "unavailable packaged source warns without blocking or reading cwd: directory=%s",
  async (directory) => {
    const setup = await fixture();
    await writeFile(setup.marker, "");
    await writeFile(join(setup.home, "SKILL.md"), "WRONG PROJECT SENTINEL");
    if (directory) await mkdir(join(setup.scripts, "../SKILL.md"));
    const result = await setup.run();
    expect(result.status).toBe(0);
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain("output-discipline:");
    expect(result.stderr).toContain("SKILL.md");
  },
);

test.each([
  { HOME: "" },
  { HOME: "relative" },
  { CLAUDE_CONFIG_DIR: "relative" },
])("invalid environment warns without blocking: %j", async (environment) => {
  const setup = await fixture("Visible");
  await writeFile(setup.marker, "");
  const result = await setup.run(environment);
  expect(result.status).toBe(0);
  expect(result.stdout).toBe("");
  expect(result.stderr).toContain("output-discipline:");
});

test("an inaccessible marker path warns without blocking", async () => {
  const setup = await fixture("Visible");
  const config = join(setup.root, "ordinary-file");
  await writeFile(config, "");
  const result = await setup.run({ CLAUDE_CONFIG_DIR: config });
  expect(result.status).toBe(0);
  expect(result.stdout).toBe("");
  expect(result.stderr).toContain("output-discipline:");
});

test("each lifecycle invocation reloads the installed resource", async () => {
  const setup = await fixture("First");
  await writeFile(setup.marker, "");
  expect((await setup.run()).stdout).toContain("First\n");
  await writeFile(join(setup.scripts, "../SKILL.md"), "Second");
  expect((await setup.run()).stdout).toContain("Second\n");
});
