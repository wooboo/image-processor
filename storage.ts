import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
const settings = config();
const sas = settings["AZURE_STORAGE_SAS"];

export default async function (
  url: string,
  method: "GET" | "PUT" | "POST" | "DELETE" = "GET",
  body?: BodyInit,
  headers?: HeadersInit
) {
  return await fetch(`${url}${sas}`, {
    method,
    body,
    headers,
  });
}
