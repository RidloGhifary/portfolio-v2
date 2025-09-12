import levenshtein from "./levenshtein";

export default function findClosestCommand(
  input: string,
  commands: string[]
): string | null {
  // super simple: look for startsWith or small distance
  let closest = null;
  let minDistance = Infinity;

  for (const cmd of commands) {
    if (cmd.startsWith(input)) return cmd; // quick win

    // Levenshtein-ish simple distance
    const dist = levenshtein(input, cmd);
    if (dist < minDistance) {
      minDistance = dist;
      closest = cmd;
    }
  }

  // only suggest if kinda close
  return minDistance <= 2 ? closest : null;
}
