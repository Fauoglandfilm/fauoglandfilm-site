import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { assertSanityDataset, assertSanityProjectId, studioTitle } from "./src/lib/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: studioTitle,
  projectId: assertSanityProjectId(),
  dataset: assertSanityDataset(),
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
