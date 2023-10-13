'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from '@/redux/features/authSlice'
import LoadingStatus from '@/components/shared/LoadingStatus'
import GlobalSetting from '@/components/shared/GlobalSetting'
import { mainPages } from '@/helpers/const';

export default function Home() {
  const router = useRouter();
  const { data, isFetching: isFetchingUserInfo, isError } = useGetUserInfoQuery()
  useEffect(() => {
    if (isError) router.push("/login");
    return
  }, [isError])

  return (
    <main className="relative flex min-h-screen flex-col items-center  p-24 overflow-scroll">
      {isFetchingUserInfo && <LoadingStatus />}
      {!isFetchingUserInfo && <>
        <h1 className='font-black text-blue-900 text-xl my-3  p-3'>Hi {data?.data?.username} !</h1>
        <ul className='my-3  p-3'>
          {mainPages.map(({ route, name }: { route: string, name: string }) => {
            return (
              <li className='font-bold mb-4 hover:text-blue-900 hover:font-extrabold ease-linear transition-all duration-250' key={route + name}>
                <Link href={`/${route}`}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </>}
      <GlobalSetting />
    </main>
  )
}
