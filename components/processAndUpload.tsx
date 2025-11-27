import imageCompression from 'browser-image-compression';
import Tesseract from 'tesseract.js';
import { supabase as supa } from '../lib/supabase/supabase';

export async function processAndUpload(file: File | null) {
    if (!file) return;
    // 1. comprimir
    const compressed = await imageCompression(file, { maxSizeMB: 0.3, maxWidthOrHeight: 1600 });

    // 2. OCR rápido
    const { data } = await Tesseract.recognize(compressed, 'spa', {
        logger: m => console.log(m)
    });
    // TODO: lograr subir a supabase storage y llamar el edge
    const text = data.text;
    // heurística:
    const dniMatch = text.match(/\b\d{8}\b/);
    const nroOrdenMatch = text.match(/NRO[\.\s]*ORDEN[:\s]*([0-9]+)/i) || text.match(/ORDEN[:\s]*([0-9]+)/i);
    console.log("matcho: ", dniMatch, " y ", nroOrdenMatch)
    const dni = dniMatch ? dniMatch[0] : null;
    const nro_orden = nroOrdenMatch ? nroOrdenMatch[1] : null;
    console.log("matcho: ", dni, " y ", nro_orden)
    // 3. subir imagen a storage
    const path = `tickets/${dni}.jpg`;
    const { data: uploadData, error } = await supa.storage.from('tickets').upload(path, compressed, { cacheControl: '3600', upsert: true });
    if (error) throw error;

    const publicUrl = supa.storage.from('tickets').getPublicUrl(path).data.publicUrl;
    console.log("Se genero la url:", publicUrl);
    // 4. llamar edge
    // const res = await fetch('/api/ticket/upload', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nro_orden, documento: dni, image_url: publicUrl, raw_ocr_text: text })
    // });

    // return res.json();
    return;
}
