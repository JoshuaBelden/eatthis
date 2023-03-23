import { translations } from '@/resources/translations'

export const defaultLocale = 'en-us'

const translate = (key: string, locale = defaultLocale) => {
  if (!(locale in translations)) {
    return key
  }

  if (!(key in translations[locale])) {
    return key
  }

  return translations[locale][key]
}

declare global {
  interface String {
    translate(): string
  }
}

String.prototype.translate = function (locale = defaultLocale) {
  return translate(String(this), locale)
}

export const i18n = {
  translate
}
