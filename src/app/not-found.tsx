"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PageTopic from "@/components/shared/PageTopic"

export default function NotFound() {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 3000);
    }, []);
    return (
        <main className=" relative flex min-h-screen flex-col items-center  p-24 overflow-scroll">
            <PageTopic topicText="Error" />
            <p>We could not find the page you were looking for.</p>
        </main>
    )
}