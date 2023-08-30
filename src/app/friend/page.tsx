import PageTopic from "@/components/shared/PageTopic";
import SharedLink from "@/components/shared/SharedLink";
import AddFriend from "@/components/friend/AddFriend";
import FriendList from "@/components/friend/FriendList";

export default function Page() {

    return (
        <main className="flex min-h-screen flex-col items-center  p-24 " >
            <PageTopic topicText="Friend" />
            <AddFriend />
            <FriendList />
            <SharedLink hrefLink="/" btnText="Back" />
        </main>
    )
}