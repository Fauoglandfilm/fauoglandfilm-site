import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.no" }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeString" }),
    defineField({
      name: "body",
      title: "Body",
      type: "object",
      fields: [
        defineField({
          name: "no",
          title: "Norwegian body",
          type: "array",
          of: [
            defineArrayMember({ type: "block" }),
            defineArrayMember({ type: "image", options: { hotspot: true } }),
          ],
        }),
        defineField({
          name: "en",
          title: "English body",
          type: "array",
          of: [
            defineArrayMember({ type: "block" }),
            defineArrayMember({ type: "image", options: { hotspot: true } }),
          ],
        }),
      ],
    }),
    defineField({ name: "authorName", title: "Author name", type: "string" }),
    defineField({ name: "category", title: "Category", type: "localeString" }),
    defineField({ name: "image", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Hero image alt", type: "localeString" }),
    defineField({ name: "video", title: "Hero video", type: "videoEmbed" }),
    defineField({ name: "datePublished", title: "Date published", type: "datetime" }),
    defineField({ name: "dateModified", title: "Date modified", type: "datetime" }),
    defineField({ name: "readingTime", title: "Reading time", type: "string" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
});
