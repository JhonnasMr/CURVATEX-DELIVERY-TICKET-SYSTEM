export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { supabase } from "@/lib/supabase/supabase";


export default async function handler(req: NextRequest): Promise<Response> {
    try {
        if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

        const { nro_orden, documento, image_url, raw_ocr_text } = await req.json();

        // 1) buscar fila
        const { data: rows, error } = await supabase
            .from('VOUCHERS')
            .select('*')
            .eq('NRO_ORDEN', nro_orden)
            .limit(1);

        if (error) throw error;
        if (!rows || rows.length === 0) return new Response(JSON.stringify({ ok: false, reason: 'not_found' }), { status: 404 });

        const row = rows[0];

        // 2) comparar documento (puedes hacer fuzzy si quieres)
        if (String(row.documento).replace(/\D/g, '') !== String(documento).replace(/\D/g, '')) {
            return new Response(JSON.stringify({ ok: false, reason: 'document_mismatch', db_documento: row.documento }), { status: 400 });
        }

        // 3) update
        const { data, error: upErr } = await supabase
            .from('VOUCHERS')
            .update({ url: image_url, stado: true, updated_at: new Date().toISOString() })
            .eq('NRO_ORDEN', nro_orden);

        if (upErr) throw upErr;

        return new Response(JSON.stringify({ ok: true, data }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
    }
}
