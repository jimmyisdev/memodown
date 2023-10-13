import PageTopic from "@/components/shared/PageTopic";
import SharedLink from "@/components/shared/SharedLink";
import AddFriend from "@/components/friend/AddFriend";
import FriendList from "@/components/friend/FriendList";
import GlobalSetting from "@/components/shared/GlobalSetting";

export default function Page() {
    return (
        <main className="relative flex min-h-screen flex-col items-center p-24 overflow-scroll">
            <SharedLink hrefLink="/" btnText="Back" />
            <PageTopic topicText="Friend" />
            <AddFriend />
            <FriendList />
            <GlobalSetting />
        </main>
    )
}