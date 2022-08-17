import { blob } from "./resize.ts";
import { getFile, save } from "./fileCache.ts";
import { assertEquals } from "https://deno.land/std@0.151.0/testing/asserts.ts";

Deno.test("blob PNG", async () => {
  const fileData = await getFile("OneDayFPV2.png");
  const output = await blob(fileData, 250);
  await save("OneDayFPV2.tttttt.png", output);
});

Deno.test("blob PDF", async () => {
  const fileData = await getFile("Formularz zwrotu - Allegro.pl.pdf");
  const output = await blob(fileData, 250);
  await save("Formularz zwrotu - Allegro.pl.pdf.png", output);
});
