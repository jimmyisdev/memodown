"use client";
import { Suspense } from "react";
import NotizContainer from "@/components/notiz/NotizContainer";
import NotizGenerator from "@/components/notiz/NotizGenerator";
import SharedLink from "@/components/shared/SharedLink";
import PageTopic from "@/components/shared/PageTopic";
import GlobalSetting from "@/components/shared/GlobalSetting";
import LoadingStatus from "@/components/shared/LoadingStatus";

export default function Page() {
    return (
        <main className="relative flex min-h-screen flex-col items-center  p-24 overflow-scroll">
            <SharedLink hrefLink="/" btnText="Back" />
            <PageTopic topicText="Note" />
            <NotizGenerator />
            <Suspense fallback={<LoadingStatus />}>
                <NotizContainer />
            </Suspense >
            <GlobalSetting />
        </main >
    )
}