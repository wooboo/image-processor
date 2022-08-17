import { writeAll } from "https://deno.land/std@0.152.0/streams/conversion.ts";


export async function blob(input: Uint8Array, width: number) {
  const process = Deno.run({
    cmd: [
      "magick",
      "convert",
      `-thumbnail`,
      `${width}>`,
      "-background",
      "white",
      "-alpha",
      "remove",
      "fd:0",
      "jpg:fd:1",
    ],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });
  await writeAll(process.stdin, input);
  await process.stdin.close();
  const output = await process.output();

  const { code } = await process.status();
  const rawError = await process.stderrOutput();
  process.close();
  if (code === 0) {
    return output;
  } else {
    const errorString = new TextDecoder().decode(rawError);
    throw new Error(errorString);
  }
}
