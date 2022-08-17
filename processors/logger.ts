import { BlobEvent } from "../types.ts";

export default {
  order: -99999,
  canProcess: (_event: BlobEvent) => {
    return true;
  },

  process: (event: BlobEvent) => {
    console.log("PROCESSING REQUEST:")
    console.log(event);
    if(event.data.validationUrl)
      console.log("VALIDATION:", event.data.validationUrl)
  },
};
