import { spawn } from "node:child_process";
import { resolve } from "node:path";

const port = process.env.PORT || "3000";
const serveEntry = resolve("node_modules", "serve", "build", "main.js");
const child = spawn(process.execPath, [serveEntry, "out", "-l", `tcp://0.0.0.0:${port}`], { stdio: "inherit" });

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
