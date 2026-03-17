import { defineCliConfig } from "sanity/cli";

import { assertSanityDataset, assertSanityProjectId } from "./src/lib/sanity/env";

export default defineCliConfig({
  api: {
    projectId: assertSanityProjectId(),
    dataset: assertSanityDataset(),
  },
});
