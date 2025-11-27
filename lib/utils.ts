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

export const ocrRegex = new RegExp(
  `DATOS\\s*DEL\\s*DESTINATARIO[\\s\\S]*?` +
  `Nombre\\s*\\/\\s*R[a-zA-Z\\.]{2,6}\\s*Social\\s*:\\s*([A-Za-z0-9ÁÉÍÓÚÑáéíóúñ .,-]{5,40})[\\s\\S]*?` +
  `D[MN][I1]\\s*R?U?C?\\s*:\\s*((?:\\d{8}|[Ee]\\d{8}|(?:10|15|17|20)\\d{9}))`,
  "i"
);