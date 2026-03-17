import { defineArrayMember, defineField, defineType } from "sanity";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "client", title: "Client", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "client" }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "localeString" }),
    defineField({ name: "industry", title: "Industry", type: "localeString" }),
    defineField({ name: "summary", title: "Summary", type: "localeString" }),
    defineField({ name: "goal", title: "Goal", type: "localeString" }),
    defineField({ name: "solution", title: "Solution", type: "localeString" }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      of: [defineArrayMember({ type: "localeString" })],
    }),
    defineField({ name: "impact", title: "Impact", type: "localeString" }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "localeString" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label.no" },
          },
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "localeString" })],
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image alt", type: "localeString" }),
    defineField({ name: "video", title: "Video", type: "videoEmbed" }),
    defineField({ name: "palette", title: "Palette", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "verificationNote", title: "Verification note", type: "localeString" }),
  ],
});
