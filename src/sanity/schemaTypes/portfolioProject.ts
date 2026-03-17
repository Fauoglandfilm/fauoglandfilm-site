import { defineField, defineType } from "sanity";

export const portfolioProjectType = defineType({
  name: "portfolioProject",
  title: "Portfolio project",
  type: "document",
  fields: [
    defineField({ name: "client", title: "Client", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "client" }, validation: (rule) => rule.required() }),
    defineField({
      name: "group",
      title: "Portfolio group",
      type: "reference",
      to: [{ type: "portfolioGroup" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "format", title: "Format", type: "localeString" }),
    defineField({ name: "summary", title: "Summary", type: "localeString" }),
    defineField({ name: "result", title: "Result", type: "localeString" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "detailHref", title: "Case URL", type: "string" }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url" }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
    defineField({
      name: "mediaFit",
      title: "Media fit",
      type: "string",
      options: {
        list: ["cover", "contain"],
        layout: "radio",
      },
      initialValue: "cover",
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image alt", type: "localeString" }),
    defineField({ name: "video", title: "Video", type: "videoEmbed" }),
    defineField({ name: "palette", title: "Palette", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
});
