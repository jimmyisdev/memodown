"use client";
import SharedLink from "@/components/shared/SharedLink";
import PageTopic from "@/components/shared/PageTopic";
import GlobalSetting from "@/components/shared/GlobalSetting";
import Omikuji from "@/components/omikuji/Omikuji";

export default function Page() {
    return (
        <main className="relative flex min-h-screen flex-col items-center  p-24 overflow-scroll">
            <SharedLink hrefLink="/" btnText="Back" />
            <PageTopic topicText="Omikuji" />
            <Omikuji />
            <GlobalSetting />
        </main >
    )
}