import { decodeUrl } from "./urlHelpers.ts";
import { assertEquals } from "https://deno.land/std@0.151.0/testing/asserts.ts";

Deno.test("decodeUrl", () => {
  const result = decodeUrl(
    "https://myaccount.blob.core.windows.net/mycontainer/myblobfolder/myblob.txt"
  );
  assertEquals(result!.account, "myaccount");
  assertEquals(result!.container, "mycontainer");
  assertEquals(result!.filePath, "myblobfolder/myblob.txt");
});
