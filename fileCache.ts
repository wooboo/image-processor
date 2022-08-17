import * as path from "https://deno.land/std@0.151.0/path/mod.ts";

export function getFile(filePath: string) {
  return Deno.readFile(getLocalFilePath(filePath));
}

export function getLocalFilePath(filePath: string): string {
  return path.resolve("../.cache", filePath);
}

export async function saveResponse(filePath: string, response: Response) {
  const blob = await response.arrayBuffer();
  await save(filePath, new Uint8Array(blob));
}
export async function save(filePath: string, data: Uint8Array) {
  const localPath = getLocalFilePath(filePath);
  const localDir = path.dirname(localPath);
  await Deno.mkdir(localDir, { recursive: true });
  await Deno.writeFile(localPath, data);
}

export function setEtag(filePath: string, etag: string) {
  return Deno.writeTextFile(getLocalFilePath(filePath) + ".etag", etag);
}

export async function getEtag(filePath: string) {
  try {
    return await Deno.readTextFile(getLocalFilePath(filePath) + ".etag");
  } catch {
    return;
  }
}

export async function isInCache(filePath: string, etag: string) {
  const savedEtag = await getEtag(filePath);
  return etag === savedEtag;
}
