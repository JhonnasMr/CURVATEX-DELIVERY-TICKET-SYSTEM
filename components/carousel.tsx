"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

export function CarouselVoucher({ voucher }: { voucher: string }) {
    const vouchers = voucher ? JSON.parse(voucher) : []
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        vouchers.length === 0 ? (
            <p>No se encontraron vouchers.</p>
        ) : (
            <div className="mx-auto max-w-xs">
                <Carousel setApi={setApi} className="w-full max-w-xs">
                    <CarouselContent>
                        {vouchers.map((voucher: any, index: number) => (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <Image width={375} height={850} src={voucher.URL} alt={`Voucher ${index + 1}`} />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="text-muted-foreground py-2 text-center text-sm">
                    Slide {current} of {count}
                </div>
            </div>
        )
    )
}