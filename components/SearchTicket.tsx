'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { supabase } from "../lib/supabase/supabase"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import {
    ButtonGroup,
    ButtonGroupText,
} from "@/components/ui/button-group"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { CarouselVoucher } from './carousel'

export default function SearchTicket() {
    // Estado para capturar el código OTP
    const [otp, setOtp] = useState("");
    const [voucher, setVoucher] = useState('');

    // Estado para capturar el DNI/CE
    const [documento, setDocumento] = useState("")

    const handleSubmit = async () => {
        console.log("Código OTP:", otp)
        console.log("Documento:", documento)

        // Aquí puedes llamar a tu API, router, etc.
        let { data: VOUCHERS, error } = await supabase.storage
            .from('tickets')
            .createSignedUrl(`tickets/${documento}.jpg`, 60)

        if (error) {
            console.error("Error al buscar la boleta:", error)
        } else {
            setVoucher(VOUCHERS?.signedUrl || '')
            console.log("Boleta encontrada:", VOUCHERS)
        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-8">

            {/* ----- CAPTURAR OTP ----- */}
            <div>
                {/* <InputOTP
                    maxLength={4}
                    value={otp}
                    onChange={(value) => setOtp(value)}   // ← Captura el OTP
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSeparator />
                        <InputOTPSlot index={1} />
                        <InputOTPSeparator />
                        <InputOTPSlot index={2} />
                        <InputOTPSeparator />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                </InputOTP> */}
            </div>

            {/* ----- CAPTURAR DNI/CE ----- */}
            <div className="grid w-full max-w-sm gap-6">
                <ButtonGroup>

                    <ButtonGroupText asChild>
                        <label htmlFor="documento">DNI/CE</label>
                    </ButtonGroupText>

                    <InputGroup>
                        <InputGroupInput
                            id="documento"
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}   // ← Captura el Documento
                            placeholder="Ingresa tu documento"
                        />

                        <InputGroupAddon align="inline-end">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-align-box-left-top"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M9 13h-2" /><path d="M13 10h-6" /><path d="M11 7h-4" /></svg>
                        </InputGroupAddon>
                    </InputGroup>

                    {/* BOTÓN DE ACCIÓN */}
                    <Button onClick={handleSubmit}>
                        Buscar
                    </Button>
                </ButtonGroup>
            </div>

            {/* ----- MOSTRAMOS LA BOLETA ----- */}
            <div>
                {/* Aquí puedes renderizar la boleta obtenida */}
                {/* <CarouselVoucher voucher={voucher} /> */}
                {voucher && (
                    <div className="border p-4 rounded-lg shadow-md">
                        <Image src={voucher} alt="Voucher" width={400} height={900} />
                    </div>
                )}
            </div>
        </div>
    )
}