'use client'

import { useState } from "react"
import imageCompression from "browser-image-compression"
import { supabase } from "@/lib/supabase/supabase"
import { extractText, ocrRegexDataClient } from "@/lib/utils"
import { processAndUpload } from "@/components/processAndUpload"

function UploadVoucher() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

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
        </div>
    )
}

export default UploadVoucher