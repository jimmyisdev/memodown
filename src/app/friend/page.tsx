import PageTopic from "@/components/shared/PageTopic";
import SharedLink from "@/components/shared/SharedLink";
import AddFriend from "@/components/friend/AddFriend";
import FriendList from "@/components/friend/FriendList";
import GlobalSetting from "@/components/shared/GlobalSetting";
import { Suspense } from "react";
import LoadingStatus from "@/components/shared/LoadingStatus";

export default function Page() {
    return (
        <main className="relative flex min-h-screen flex-col items-center p-24 overflow-scroll">
            <SharedLink hrefLink="/" btnText="Back" />
            <PageTopic topicText="Friend" />
            <AddFriend />
            <Suspense fallback={<LoadingStatus />}>
                <FriendList />
            </Suspense>
            <GlobalSetting />
        </main>
    )
}