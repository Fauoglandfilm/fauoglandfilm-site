import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Role", type: "localeString" }),
    defineField({ name: "summary", title: "Summary", type: "localeString" }),
    defineField({ name: "image", title: "Portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Portrait alt", type: "localeString" }),
    defineField({ name: "href", title: "Profile URL", type: "string" }),
    defineField({ name: "featuredOrder", title: "Featured order", type: "number", initialValue: 0 }),
  ],
});
