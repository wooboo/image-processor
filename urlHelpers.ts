import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
const settings = config();

const account = settings["AZURE_STORAGE_ACCOUNT"];
const thumbnailsContainer = settings["AZURE_STORAGE_THUMBNAILS_CONTAINER"];
const documentsContainer = settings["AZURE_STORAGE_DOCUMENTS_CONTAINER"];

export function decodeUrl(url: string): UrlMetadata {
  const matches =
    /https:\/\/([\w]+)\.blob\.core\.windows\.net\/([\w]+)\/(.+)/.exec(url);
  if (!matches) throw new Error("Invalid url");
  return {
    account: matches[1],
    container: matches[2],
    filePath: matches[3],
  };
}
export type UrlMetadata = {
  account: string;
  container: string;
  filePath: string;
};
export type FileMetadata = {
  filePath: string;
  etag: string;
}
export function encodeUrl(meta: UrlMetadata) {
  return `https://${meta.account}.blob.core.windows.net/${meta.container}/${meta.filePath}`;
}

export function getThumbnailPath(filePath: string) {
  return encodeUrl({ account, container: thumbnailsContainer, filePath });
}

export function getDocumentPath(filePath: string) {
  return encodeUrl({ account, container: documentsContainer, filePath });
}
