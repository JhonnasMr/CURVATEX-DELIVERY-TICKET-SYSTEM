import imageCompression from 'browser-image-compression';
import { supabase as supa } from '../lib/supabase/supabase';
import { extractText, ocrRegexDataClient, ocrRegexNanoCode, ocrRegexNroOrden, ocrRegexNroOrdenAndCode } from '@/lib/utils';

export async function processAndUpload(file: File | null) {
    if (!file) return;
    // 1. comprimir
    const compressed = await imageCompression(file, { maxSizeMB: 0.3, maxWidthOrHeight: 1600 });

    // 2. OCR rápido
    const dataText = await extractText(compressed);
    console.log(dataText)
    // TODO: lograr subir a supabase storage y llamar el edge
    // heurística:
    const dataClient = ocrRegexDataClient.exec(dataText);
    const nanoCode = ocrRegexNanoCode.exec(dataText);
    const nroOrden = ocrRegexNroOrden.exec(dataText);
    console.log('dataClient:', dataClient);
    console.log('nanoCode:', nanoCode?.[1]);
    console.log('nroOrden:', nroOrden?.[1]);
    const nombre = dataClient ? dataClient[1] : null;
    const dni = dataClient ? dataClient[2] : null;
    const nro_orden = nroOrden ? nroOrden[1] : null;

    // 3. subir imagen a storage
    const path = `tickets/${dni}.jpg`;
    const { data: uploadData, error } = await supa.storage
        .from('tickets')
        .upload(path, compressed, { cacheControl: '3600', upsert: true });

    if (error) throw error;

    // 4. llamar edge
    // const res = await fetch('/api/ticket/upload', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nro_orden, documento: dni, image_url: publicUrl, raw_ocr_text: dataText })
    // });

    // return res.json();
    return;
}
