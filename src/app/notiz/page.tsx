"use client";

import NotizContainer from "@/components/notiz/NotizContainer";
import NotizGenerator from "@/components/notiz/NotizGenerator";
import SharedLink from "@/components/shared/SharedLink";
import PageTopic from "@/components/shared/PageTopic";
import GlobalSetting from "@/components/shared/GlobalSetting";

export default function Page() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center  p-24 ">
                <SharedLink hrefLink="/" btnText="Back" />
                <PageTopic topicText="Note" />
                <NotizGenerator />
                <NotizContainer />
                <GlobalSetting />
            </main >
        </>
    )
}