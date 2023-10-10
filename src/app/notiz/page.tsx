"use client";

import NotizContainer from "@/components/notiz/NotizContainer";
import NotizGenerator from "@/components/notiz/NotizGenerator";
import SharedLink from "@/components/shared/SharedLink";
import PageTopic from "@/components/shared/PageTopic";
import { useSelector } from "react-redux";
import GlobalSetting from "@/components/shared/GlobalSetting";

export default function Page() {
    return (
        <>
            {/* <head>
                <title>Memodown - Notiz</title>
                <meta name="description" content='login page' />
            </head> */}
            <main className="flex min-h-screen flex-col items-center  p-24 ">
                <SharedLink hrefLink="/" btnText="Back" />
                <PageTopic topicText="Notiz" />
                <NotizGenerator />
                <NotizContainer />
                <GlobalSetting />
            </main >
        </>
    )
}