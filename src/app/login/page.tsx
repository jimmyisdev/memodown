"use client";

import { useLoginMutation } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Cover from "@/components/shared/Cover";
import SharedLink from "@/components/shared/SharedLink";
import ErrorMsg from "@/components/shared/ErrorMsg";
import LoadingMsg from "@/components/shared/LoadingMsg";

export default function Page() {
    const router = useRouter();
    const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()
    useEffect(() => {
        if (isSuccess) {
            if (data?.data?.username && data?.data?.email) {
                router.push("/");
            } else return
        }
    }, [isSuccess])
    return (
        <main className="flex flex-row flex-wrap h-screen items-center justify-center bg-red">
            <Cover />
            <div className="flex flex-col m-5">
                {isLoading && <LoadingMsg />}
                {!isLoading && (
                    <>
                        <AuthForm type='Login' isLoading={isLoading} handler={login} />
                        <SharedLink hrefLink="/signup" btnText="Signup Now" />
                    </>)
                }
                {isError && <ErrorMsg />}
            </div>
        </main>
    )
}

