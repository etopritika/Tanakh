import { BooksBySection } from "./types";

export const ROUTES = {
  auth: "/auth",
  home: "/",
  forgotPassword: "/forgot-password",
  section: "/:sectionName",
  book: "/:sectionName/:bookName",
  chapter: "/:sectionName/:bookName/:chapterId/:subChapterId?",
  search: "/search",
  blueprints: "/blueprints",
};

export const BOOKS: BooksBySection = {
  tora: [
    {
      id: "beresheet",
      name: "Берешит",
      file: "/tora/obj-beresheet.ts",
      href: "/tora/beresheet",
      disabled: false,
    },
    {
      id: "schmot",
      name: "Шмот",
      file: "/tora/obj-schmot.ts",
      href: "/tora/schmot",
      disabled: false,
    },
    {
      id: "vaikra",
      name: "Ваикра",
      file: "/tora/obj-vaikra.ts",
      href: "/tora/vaikra",
      disabled: false,
    },
    {
      id: "bemidbar",
      name: "Бемидбар",
      file: "/tora/obj-bemidbar.ts",
      href: "/tora/bemidbar",
      disabled: false,
    },
    {
      id: "dvarim",
      name: "Дварим",
      file: "/tora/obj-dvarim.ts",
      href: "/tora/dvarim",
      disabled: false,
    },
  ],
  neviim: [
    {
      id: "yehoshua",
      name: "Йехошуа",
      file: "/neviim/obj-yehoshua.ts",
      href: "/neviim/yehoshua",
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
