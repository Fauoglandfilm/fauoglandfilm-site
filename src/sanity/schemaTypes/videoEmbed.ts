import { defineField, defineType } from "sanity";

export const videoEmbedType = defineType({
  name: "videoEmbed",
  title: "Video embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Video URL",
      type: "url",
      validation: (rule) => rule.required().uri({
        scheme: ["http", "https"],
      }),
    }),
    defineField({
      name: "poster",
      title: "Poster image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "label",
      title: "Accessibility label",
      type: "localeString",
    }),
  ],
});
