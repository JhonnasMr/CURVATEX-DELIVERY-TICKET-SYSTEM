import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Tesseract from "tesseract.js";

export async function extractText(file: File): Promise<string> {
  const { data: { text } } = await Tesseract.recognize(file, "spa");
  return text;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ocrRegexDataClient = new RegExp(
  // Encabezado: DATOS DEL DESTINATARIO (tolerante)
  `DATOS\\s+DEL\\s+DESTINATARIO[\\s\\S]*?` +

  // Nombre / Razón Social
  `[\\s\\S]*?Nombre\\s*[\\/I|\\\\]?\\s*R[a-zA-Z\\.]{2,7}\\s*Social\\s*:\\s*` +
  `([A-Za-z0-9ÁÉÍÓÚÑáéíóúñ .,'-]{5,90})` +

  // DNI / RUC
  `[\\s\\S]*?D[MN][I1]\\s*\\/??\\s*R?U?C?\\s*:\\s*([0-9OIl]{8,11})`,
  "i"
);


export const ocrRegexNroOrdenAndCode = new RegExp(
  `N[RRP]{1,3}\.?[ \t]*O[RD0]{2}EN:?[ \t]*([0-9OIl]{6,12})` +
  `C[ÓO0]D[I1l]G[O0]:?[ \t]*([A-Za-z0-9OIl]{3,6})`,
  `i`
);

export const ocrRegexNroOrden = new RegExp(
  `NRO\.?[ \t]*ORDEN:?[ \t]*([0-9OIl]{6,12})`,
  `i`
);

export const ocrRegexNanoCode = new RegExp(
  `C[ÓO0]D[I1l]G[O0]:?[ \t]*([A-Za-z0-9OIl]{3,6})`,
  `i`
);