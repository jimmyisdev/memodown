"use client";

import NotizContainer from "@/components/notiz/NotizContainer";
import NotizGenerator from "@/components/notiz/NotizGenerator";
import SharedLink from "@/components/shared/SharedLink";
import PageTopic from "@/components/shared/PageTopic";
import { useSelector } from "react-redux";

export default function Page() {
    return (
        <>
            {/* <head>
                <title>Memodown - Notiz</title>
                <meta name="description" content='login page' />
            </head> */}
            <main className="flex min-h-screen flex-col items-center  p-24 ">
                <PageTopic topicText="Notiz" />
                <NotizGenerator />
                <NotizContainer />
                <SharedLink hrefLink="/" btnText="Back" />
            </main >
        </>
    )
}