'use client'
import Link from 'next/link'
import { useGetUserInfoQuery } from '@/redux/features/authSlice'
import LoadingMsg from '@/components/shared/LoadingMsg'
import GlobalSetting from '@/components/shared/GlobalSetting'

export default function Home() {
  const { data, isFetching: isFetchingUserInfo } = useGetUserInfoQuery()

  return (
    <main className="flex min-h-screen flex-col items-center  p-24 ">
      {isFetchingUserInfo && <LoadingMsg />}
      {
        !isFetchingUserInfo && <>
          <h1 className='font-black text-blue-900 text-xl my-3  p-3'>Hi {data?.data?.username}</h1>
          <ul className='my-3  p-3'>
            <li className='font-extrabold mb-4 hover:text-blue-900 active:text-blue-900 focus:text-blue-900'>
              <Link href='/notiz'>Notiz</Link>
            </li>
            <li className=' font-extrabold mb-4 hover:text-blue-900 active:text-blue-900 focus:text-blue-900'>
              <Link href='/friend'>Friend</Link>
            </li>
            <li className=' font-extrabold mb-4 hover:text-blue-900 active:text-blue-900 focus:text-blue-900'>
              <Link href='/message'>Message</Link>
            </li>
          </ul>
        </>
      }
      <GlobalSetting />
    </main>
  )
}
