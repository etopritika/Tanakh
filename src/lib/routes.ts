import { getChapterPage } from "./helpers/get-chapter-page";
import { BooksBySection, BreadcrumbSegment } from "./types";

export const sections = [
  { name: "Тора", href: "/sections/tora/books" },
  { name: "Невиим", href: "/sections/neviim/books" },
  { name: "Ктувим", href: "/sections/ketuvim/books" },
];

export const books: BooksBySection = {
  tora: [
    {
      id: "beresheet",
      name: "Берешит",
      file: "/tora/obj-beresheet.js",
      href: "/tora/beresheet/1",
      disabled: false,
    },
    {
      id: "schmot",
      name: "Шмот",
      file: "/tora/obj-schmot.js",
      href: "/tora/schmot/1",
      disabled: false,
    },
    {
      id: "vaikra",
      name: "Ваикра",
      file: "/tora/obj-vaikra.js",
      href: "/tora/vaikra/1",
      disabled: false,
    },
    {
      id: "bemidbar",
      name: "Бемидбар",
      file: "/tora/obj-bemidbar.js",
      href: "/tora/bemidbar/1",
      disabled: false,
    },
    {
      id: "dvarim",
      name: "Дварим",
      file: "/tora/obj-dvarim.js",
      href: "/tora/dvarim/1",
      disabled: false,
    },
  ],
  neviim: [
    {
      id: "neviim",
      name: "Йешуа",
      file: "",
      href: "#",
      disabled: true,
    },
  ],
  ketuvim: [
    {
      id: "ketuvim",
      name: "Тегілім",
      file: "",
      href: "#",
      disabled: true,
    },
  ],
};

export const segmentMap: Record<string, BreadcrumbSegment> = {
  sections: {
    label: "Главная",
    href: () => "/sections",
  },
  books: {
    label: "Книги",
    href: (segments) => `/sections/${segments[1]}/books`,
  },
  chapters: {
    label: "Главы",
    href: (segments) =>
      `/sections/${segments[1]}/books/${segments[3]}/chapters/${
        segments[5] || 1
      }`,
  },
  chapter: {
    label: "Главы",
    href: (segments) => {
      const chapterId = segments[5];
      const bookName = segments[3];
      const currentPage = getChapterPage(bookName, chapterId);

      return `/sections/${segments[1]}/books/${bookName}/chapters/${currentPage}`;
    },
  },
  verses: {
    label: "Стихи",
    href: (segments) =>
      `/sections/${segments[1]}/books/${segments[3]}/chapter/${
        segments[5]
      }/verses/${segments[7] || 1}`,
  },
  search: {
    label: "Поиск",
    href: (segments) => `/sections/${segments[1]}/search`,
  },
};
