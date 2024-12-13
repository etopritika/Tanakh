import { BooksBySection } from "./types";

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
      href: "/sections/tora/books/beresheet/chapters/1",
      disabled: false,
    },
    {
      id: "schmot",
      name: "Шмот",
      file: "/tora/obj-schmot.js",
      href: "/sections/tora/books/schmot/chapters/1",
      disabled: false,
    },
    {
      id: "vaikra",
      name: "Ваикра",
      file: "/tora/obj-vaikra.js",
      href: "/sections/tora/books/vaikra/chapters/1",
      disabled: false,
    },
    {
      id: "bemidbar",
      name: "Бемидбар",
      file: "/tora/obj-bemidbar.js",
      href: "/sections/tora/books/bemidbar/chapters/1",
      disabled: false,
    },
    {
      id: "dvarim",
      name: "Дварим",
      file: "/tora/obj-dvarim.js",
      href: "/sections/tora/books/dvarim/chapters/1",
      disabled: false,
    },
  ],
  neviim: [
    {
      id: "neviim",
      name: "Йешуа",
      file: "",
      href: "",
      disabled: true,
    },
  ],
  ketuvim: [
    {
      id: "ketuvim",
      name: "Тегілім",
      file: "",
      href: "",
      disabled: true,
    },
  ],
};
