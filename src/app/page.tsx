'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from '@/redux/features/authSlice'
import LoadingStatus from '@/components/shared/LoadingStatus'
import GlobalSetting from '@/components/shared/GlobalSetting'

export default function Home() {
  const router = useRouter();
  const { data, isFetching: isFetchingUserInfo, isError } = useGetUserInfoQuery()
  useEffect(() => {
    if (isError) router.push("/login");
    return
  }, [isError])

  return (
    <main className="flex min-h-screen flex-col items-center  p-24 ">
      {isFetchingUserInfo && <LoadingStatus />}
      {
        !isFetchingUserInfo && <>
          <h1 className='font-black text-blue-900 text-xl my-3  p-3'>Hi {data?.data?.username} !</h1>
          <ul className='my-3  p-3'>
            <li className='font-bold mb-4 hover:text-blue-900 hover:font-extrabold ease-linear transition-all duration-250 '>
              <Link href='/notiz'>Note</Link>
            </li>
            <li className='font-bold mb-4 hover:text-blue-900 hover:font-extrabold ease-linear transition-all duration-250 '>
              <Link href='/friend'>Friend</Link>
            </li>
            <li className='font-bold mb-4 hover:text-blue-900 hover:font-extrabold ease-linear transition-all duration-250 '>
              <Link href='/message'>Message</Link>
            </li>
            <li className='font-bold mb-4 hover:text-blue-900 hover:font-extrabold ease-linear transition-all duration-250 '>
              <Link href='/omikuji'>Omikuji</Link>
            </li>
          </ul>
        </>
      }
      <GlobalSetting />
    </main>
  )
}
