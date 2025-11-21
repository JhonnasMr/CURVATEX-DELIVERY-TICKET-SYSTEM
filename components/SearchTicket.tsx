import React from 'react'
import Image from 'next/image'
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

export default function SearchTicket() {
    return (
        <div className='w-full flex flex-col items-center gap-8'>
            <div>
                <InputOTP maxLength={8}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <div>
                <div className="grid w-full max-w-sm gap-6">
                    <ButtonGroup>
                        <ButtonGroupText asChild>
                            <label htmlFor="documeent">DNI/CE</label>
                        </ButtonGroupText>
                        <InputGroup>
                            <InputGroupInput id="url" />
                            <InputGroupAddon align="inline-end">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-align-box-left-top"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M9 13h-2" /><path d="M13 10h-6" /><path d="M11 7h-4" /></svg>
                            </InputGroupAddon>
                        </InputGroup>
                        <ButtonGroupText>Buscar</ButtonGroupText>
                    </ButtonGroup>
                </div>
            </div>
            <div>
                <Image
                    src="/illustrations/search-ticket.svg"
                    alt="Search Ticket Illustration"
                    width={300}
                    height={300}
                />
            </div>
        </div>
    )
}