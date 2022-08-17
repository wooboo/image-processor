import { Status } from "https://deno.land/std@0.151.0/http/http_status.ts";
import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { BlobEvent } from "./types.ts";
import loader from "./loader.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
const settings = config();
const apiKey = settings["API_KEY"];



const processors = await loader();
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  if (url.searchParams.get("api_key") !== apiKey)
    return new Response("UNAUTHORIZED", { status: Status.Unauthorized });
  if (req.body) {
    const body = (await req.json()) as BlobEvent[];
    for (const event of body) {
      for (const processor of processors) {
        if (processor.canProcess(event)) {
          
          await processor.process(event);
        }
      }
    }

    return new Response("", { status: Status.Accepted });
  }

  return new Response("NOT FOUND!", { status: Status.NotFound });
}
serve(handler);
