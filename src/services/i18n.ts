import * as en from "public/assets/languages/en.json";
import * as es from "public/assets/languages/es.json";

export const i18n = (language: "en" | "es" = "es") =>
  language === "en" ? en : es;
