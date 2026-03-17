import { defineField, defineType } from "sanity";

export const localeStringType = defineType({
  name: "localeString",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({
      name: "no",
      title: "Norwegian",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
