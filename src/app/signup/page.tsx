"use client";

import { useSignupMutation } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Cover from "@/components/shared/Cover";
import AuthLink from "@/components/shared/SharedLink";
import ErrorMsg from "@/components/shared/ErrorMsg";
import LoadingMsg from "@/components/shared/LoadingMsg";

export default function Page() {
    const router = useRouter();
    const [signup, { isLoading, isSuccess, isError, error, data }] = useSignupMutation()
    useEffect(() => {
        if (isSuccess) {
            if (data?.data?.username && data?.data?.email) {
                router.push("/login");
            } else return
        }
    }, [isSuccess])

    return (
        <main className="flex flex-row flex-wrap h-screen items-center justify-center ">
            <Cover />
            <div className="flex flex-col m-5">
                {isLoading && <LoadingMsg />}
                {!isLoading && (
                    <>
                        <AuthForm type="Signup" isLoading={isLoading} handler={signup} />
                        <AuthLink hrefLink="/login" btnText="Member Login" />                    </>)
                }
                {isError && <ErrorMsg />}
            </div>
        </main>
    )
}