import { defineField, defineType } from "sanity";

export const portfolioGroupType = defineType({
  name: "portfolioGroup",
  title: "Portfolio group",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "localeString" }),
  ],
});
