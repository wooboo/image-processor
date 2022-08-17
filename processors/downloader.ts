import { BlobEvent, EventType } from "../types.ts";
import call from "../storage.ts";
import { saveResponse, setEtag, isInCache } from "../fileCache.ts";
import { decodeUrl } from "../urlHelpers.ts";
export default {
  order: -1000,
  canProcess: (event: BlobEvent) =>
    event.eventType === EventType.BlobCreated &&
    event.subject.startsWith("/blobServices/default/containers/documents"),
  process: async (event: BlobEvent) => {
    const fileMeta = decodeUrl(event.data.url);
    if (!(await isInCache(fileMeta.filePath, event.data.eTag))) {
      console.log("Downloading");
      const response = await call(event.data.url);
      await saveResponse(fileMeta.filePath, response);
      await setEtag(fileMeta.filePath, event.data.eTag);
    }
  },
};
