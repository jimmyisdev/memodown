import PageTopic from "@/components/shared/PageTopic";
import SharedLink from "@/components/shared/SharedLink";
import GlobalSetting from "@/components/shared/GlobalSetting";
import FormatStraight from "@/components/formatter/FormatStraight";
export default function Page() {
    return (
        <main className=" relative flex min-h-screen flex-col items-center  p-24 overflow-scroll">
            <SharedLink hrefLink="/" btnText="Back" />
            <PageTopic topicText="Format" />
            <FormatStraight />
            <GlobalSetting />
        </main>
    )
}