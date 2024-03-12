import React, { useState } from "react";
// import { ResumeKey } from "lib/redux/types";
// import {
//   Line,
//   Lines,
//   ResumeSectionToLines,
// } from "lib/parse-resume-from-pdf/types";
import {
  hasLetterAndIsAllUpperCase,
  hasOnlyLettersSpacesAmpersands,
  isBold,
} from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";

export const PROFILE_SECTION = "profile";

const SECTION_TITLE_PRIMARY_KEYWORDS = [
  "experience",
  "education",
  "project",
  "skill",
];
const SECTION_TITLE_SECONDARY_KEYWORDS = [
  "job",
  "course",
  "extracurricular",
  "objective",
  "summary", 
  "award",
  "honor",
  "project",
];
const SECTION_TITLE_KEYWORDS = [
  ...SECTION_TITLE_PRIMARY_KEYWORDS,
  ...SECTION_TITLE_SECONDARY_KEYWORDS,
];

const isSectionTitle = (line, lineNumber) => {
  const isFirstTwoLines = lineNumber < 2;
  const hasMoreThanOneItemInLine = line.length > 1;
  const hasNoItemInLine = line.length === 0;
  if (isFirstTwoLines || hasMoreThanOneItemInLine || hasNoItemInLine) {
    return false;
  }

  const textItem = line[0];

  
  if (isBold(textItem) && hasLetterAndIsAllUpperCase(textItem)) {
    return true;
  }

  
  const text = textItem.text.trim();
  const textHasAtMost2Words =
    text.split(" ").filter((s) => s !== "&").length <= 2;
  const startsWithCapitalLetter = /[A-Z]/.test(text.slice(0, 1));

  if (
    textHasAtMost2Words &&
    hasOnlyLettersSpacesAmpersands(textItem) &&
    startsWithCapitalLetter &&
    SECTION_TITLE_KEYWORDS.some((keyword) =>
      text.toLowerCase().includes(keyword)
    )
  ) {
    return true;
  }

  return false;
};

const GroupLinesIntoSections = ({ lines }) => {
  const [sections, setSections] = useState()
  const [profileSectionName, setProfileSectionName] = useState(PROFILE_SECTION);
  const [sectionLines, setSectionLines] = useState([]);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const text = line[0]?.text.trim();
    if (isSectionTitle(line, i)) {
      setSections((prevSections) => ({
        ...prevSections,
        [profileSectionName]: [...sectionLines],
      }));
      setProfileSectionName(text);
      setSectionLines([]);
    } else {
      setSectionLines((prevLines) => [...prevLines, line]);
    }
  }

  if (sectionLines.length > 0) {
    setSections((prevSections) => ({
      ...prevSections,
      [profileSectionName]: [...sectionLines],
    }));
  }

  return null; 
};

export default GroupLinesIntoSections;
