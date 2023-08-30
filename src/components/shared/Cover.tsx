"use client";
import Image from "next/image";

export default function Cover() {
    return (
        <div>
            <Image
                src="/md_logo.png"
                width={200}
                height={200}
                alt="Logo"
            />
            <div>
                <h1 className="text-2xl mb-2 font-extrabold">Memodown</h1>
                <p className="text-xl font-medium">Best Memo App</p>
            </div>
        </div>
    )
}

