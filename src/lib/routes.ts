import { BooksBySection } from "./types";

export const books: BooksBySection = {
  tanah: [
    {
      id: "beresheet",
      name: "Берешит",
      file: "/tanah/obj-beresheet.ts",
      href: "/tanah/beresheet/1",
      disabled: false,
    },
    {
      id: "schmot",
      name: "Шмот",
      file: "/tanah/obj-schmot.ts",
      href: "/tanah/schmot/1",
      disabled: false,
    },
    {
      id: "vaikra",
      name: "Ваикра",
      file: "/tanah/obj-vaikra.ts",
      href: "/tanah/vaikra/1",
      disabled: false,
    },
    {
      id: "bemidbar",
      name: "Бемидбар",
      file: "/tanah/obj-bemidbar.ts",
      href: "/tanah/bemidbar/1",
      disabled: false,
    },
    {
      id: "dvarim",
      name: "Дварим",
      file: "/tanah/obj-dvarim.ts",
      href: "/tanah/dvarim/1",
      disabled: false,
    },
  ],
  neviim: [
    {
      id: "yehoshua",
      name: "Йехошуа",
      file: "/neviim/obj-yehoshua.ts",
      href: "/neviim/yehoshua/1",
      disabled: false,
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
