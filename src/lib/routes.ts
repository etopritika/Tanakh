import { BooksBySection } from "./types";

export const ROUTES = {
  auth: "/auth",
  home: "/",
  forgotPassword: "/forgot-password",
  blueprints: "/blueprints",
  calendar: "/calendar",
  section: "/books/:sectionName",
  book: "/books/:sectionName/:bookName",
  chapter: "/books/:sectionName/:bookName/:chapterId/:subChapterId?",
  search: "/search",
};

export const BOOKS: BooksBySection = {
  tora: [
    {
      id: "beresheet",
      name: "Берешит",
      file: "/tora/obj-beresheet.ts",
      href: "/books/tora/beresheet",
      disabled: false,
    },
    {
      id: "schmot",
      name: "Шмот",
      file: "/tora/obj-schmot.ts",
      href: "/books/tora/schmot",
      disabled: false,
    },
    {
      id: "vaikra",
      name: "Ваикра",
      file: "/tora/obj-vaikra.ts",
      href: "/books/tora/vaikra",
      disabled: false,
    },
    {
      id: "bemidbar",
      name: "Бемидбар",
      file: "/tora/obj-bemidbar.ts",
      href: "/books/tora/bemidbar",
      disabled: false,
    },
    {
      id: "dvarim",
      name: "Дварим",
      file: "/tora/obj-dvarim.ts",
      href: "/books/tora/dvarim",
      disabled: false,
    },
  ],
  neviim: [
    {
      id: "yehoshua",
      name: "Йехошуа",
      file: "/neviim/obj-yehoshua.ts",
      href: "/books/neviim/yehoshua",
      disabled: false,
    },
  ],
  ketuvim: [
    {
      id: "ketuvim",
      name: "Тегилим",
      file: "",
      href: "#",
      disabled: true,
    },
  ],
};
