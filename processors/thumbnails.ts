import call from "../storage.ts";
import { BlobEvent, EventType } from "../types.ts";
import { getFile } from "../fileCache.ts";
import { decodeUrl, getThumbnailPath } from "../urlHelpers.ts";
import { blob } from "../resize.ts";

export default {
  order: 1,
  canProcess: (event: BlobEvent) => {
    const result =
      event.subject.startsWith("/blobServices/default/containers/documents") &&
      event.eventType === EventType.BlobCreated &&
      (event.data.contentType === "application/pdf" ||
        event.data.contentType.startsWith("image/"));
    return result;
  },

  process: async (event: BlobEvent) => {
    const fileMeta = decodeUrl(event.data.url);
    const buffer = await getFile(fileMeta.filePath);
    await resize(fileMeta.filePath, buffer, 100);
    await resize(fileMeta.filePath, buffer, 200);
    await resize(fileMeta.filePath, buffer, 400);
    await resize(fileMeta.filePath, buffer, 800);
  },
};

async function resize(filePath: string, buffer: Uint8Array, width: number) {
  const resized = await blob(buffer, width);
  const thumbnailUrl = getThumbnailPath(filePath) + `.w${width}.jpg`;
  await call(thumbnailUrl, "PUT", resized, {
    "x-ms-blob-type": "BlockBlob",
    "Content-Type": "image/jpeg",
  });
  console.log("RESIZED", thumbnailUrl);
}
