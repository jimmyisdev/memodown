"use client";

import { useLoginMutation } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Cover from "@/components/shared/Cover";
import SharedLink from "@/components/shared/SharedLink";
import LoadingMsg from "@/components/shared/LoadingMsg";
import { toast } from "react-toastify";

export default function Page() {
    const router = useRouter();
    const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()
    useEffect(() => {
        if (isSuccess) {
            if (data?.data?.username && data?.data?.email) {
                toast.success('Login Success!')
                router.push("/");
            } else return
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error('Error occured!')
        }
    }, [isError])
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
            </div>
        </main>
    )
}

