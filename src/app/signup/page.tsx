"use client";

import { useSignupMutation } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Cover from "@/components/shared/Cover";
import AuthLink from "@/components/shared/SharedLink";
import LoadingMsg from "@/components/shared/LoadingMsg";
import { toast } from "react-toastify";

export default function Page() {
    const router = useRouter();
    const [signup, { isLoading, isSuccess, isError, error, data }] = useSignupMutation()
    useEffect(() => {
        if (isSuccess) {
            if (data?.data?.username && data?.data?.email) {
                router.push("/login");
                toast.info('Signup Success!')
            } else return
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error('Error occured!')
        }
    }, [isError])

    return (
        <main className="flex flex-row flex-wrap h-screen items-center justify-center ">
            <Cover />
            <div className="flex flex-col m-5">
                {isLoading && <LoadingMsg />}
                {!isLoading && (
                    <>
                        <AuthForm type="Signup" isLoading={isLoading} handler={signup} />
                        <AuthLink hrefLink="/login" btnText="Member Login" />
                    </>
                )}
            </div>
        </main>
    )
}