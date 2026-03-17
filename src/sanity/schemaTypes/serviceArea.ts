import { defineField, defineType } from "sanity";

export const serviceAreaType = defineType({
  name: "serviceArea",
  title: "Service area",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Summary", type: "localeString" }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "value", title: "Value", type: "localeString" }),
    defineField({ name: "budget", title: "Budget", type: "localeString" }),
    defineField({ name: "timeline", title: "Timeline", type: "localeString" }),
    defineField({ name: "deliverables", title: "Deliverables", type: "array", of: [{ type: "localeString" }] }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
    defineField({ name: "href", title: "URL", type: "string" }),
    defineField({ name: "exampleHref", title: "Example URL", type: "string" }),
    defineField({ name: "exampleLabel", title: "Example label", type: "localeString" }),
  ],
});
