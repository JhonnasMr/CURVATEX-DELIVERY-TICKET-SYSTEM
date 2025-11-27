'use client'

import { useState } from "react"
import imageCompression from "browser-image-compression"
import { supabase } from "@/lib/supabase/supabase"
import { extractText, ocrRegex } from "@/lib/utils"
import { processAndUpload } from "@/components/processAndUpload"

function UploadVoucher() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [extractedText, setExtractedText] = useState<string | null>(null)

    // async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const file = event.target.files?.[0]
    //     if (!file) return
    //     // 0 .- extraer texto con OCR (DNI del destinatario)
    //     const text = await extractText(file)
    //     setExtractedText(text)
    //     const nombre = ocrRegex.exec(text)?.[1] || null;
    //     const dni = ocrRegex.exec(text)?.[2] || null;
    //     console.log("Extracted Text:", text);
    //     console.log("DNI:", dni, "Nombre:", nombre);
    //     console.log("DNI:", dni, "Nombre:", nombre);
    //     try {
    //         // 1.- opciones de compresion
    //         const options = {
    //             maxSizeMB: 0.4,
    //             maxWidthOrHeight: 1280,
    //             useWebWorker: true
    //         };
    //         // 2.- comprimir la imagen
    //         const compressedFile = await imageCompression(file, options)
    //         setSelectedFile(compressedFile)

    //         // subir a supabase
    //         // const { data, error } = await supabase.storage
    //     } catch (error) {
    //         setError("Error al comprimir la imagen")
    //     }
    // }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setError(null);
        setUploading(true);
        try {
            await processAndUpload(file);
            setSelectedFile(file);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            <h1>Upload Voucher</h1>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange} />




            {uploading && <p>Uploading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
            {extractedText && (
                <pre>{extractedText}</pre>
            )}
        </div>
    )
}

export default UploadVoucher