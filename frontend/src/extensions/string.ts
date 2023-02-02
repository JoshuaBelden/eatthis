import { translations } from "@/resources/translations";

declare global {
  interface String {
    toMessage(): string;
  }
}

String.prototype.toMessage = function() {
  return translations['en-us'][String(this)];
}
