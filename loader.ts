import type { Processor } from "./types.ts";

export default async function loadProcessors(): Promise<Processor[]> {
  const processors: Processor[] = [];
  const dir = await Deno.readDir(Deno.realPathSync("./processors"));
  for await (const processorFile of dir) {
    if (processorFile.isFile && processorFile.name.endsWith(".ts")) {
      const path: string = Deno.realPathSync(
        "./processors/" + processorFile.name
      );
      const commandClass: any = await import(`file://${path}`);
      const cmd: any = commandClass.default;
      if (!cmd) {
        console.warn(`Could not load '${processorFile.name}' command !`);
        continue;
      }
      processors.push(cmd);
      console.log(`Successfully loaded '${processorFile.name}' command !`);
    }
  }
  processors.sort((a, b) => a.order - b.order);
  return processors;
}
