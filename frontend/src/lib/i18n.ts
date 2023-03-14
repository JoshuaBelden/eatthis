import { translations } from "@/resources/translations";

export const defaultLocale = 'en-us'

declare global {
  interface String {
    translate(): string;
  }
}

String.prototype.translate = function(locale = defaultLocale) {
  return translations[defaultLocale][String(this)];
}

export const i18n = {
  translate: (key: string, locale = defaultLocale) => {
    return locale in translations ? translations[locale][key] : key
  },
}