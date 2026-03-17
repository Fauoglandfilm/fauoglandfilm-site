import { articleType } from "./article";
import { caseStudyType } from "./caseStudy";
import { localeStringType } from "./localeString";
import { portfolioGroupType } from "./portfolioGroup";
import { portfolioProjectType } from "./portfolioProject";
import { serviceAreaType } from "./serviceArea";
import { teamMemberType } from "./teamMember";
import { videoEmbedType } from "./videoEmbed";

export const schemaTypes = [
  localeStringType,
  videoEmbedType,
  portfolioGroupType,
  portfolioProjectType,
  caseStudyType,
  teamMemberType,
  serviceAreaType,
  articleType,
];
