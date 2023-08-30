'use client'
import Link from 'next/link'
import { useGetUserInfoQuery } from '@/redux/features/authSlice'
import LogoutBtn from '@/components/shared/LogoutBtn'
import LoadingMsg from '@/components/shared/LoadingMsg'
export default function Home() {
  const { data, isFetching: isFetchingUserInfo } = useGetUserInfoQuery()
  return (
    <main className="flex min-h-screen flex-col items-center  p-24 ">
      {/* <Image
        src="/profile.png"
        width={200}
        height={200}
        alt="profile"
      />
      <section >
        <form className='m-3' method="POST" action="/upload" encType='multipart/form-data'>
          <input type="file" name='image' />
          <input type='submit' />
        </form>
      </section> */}
      {isFetchingUserInfo && <LoadingMsg />}
      {
        !isFetchingUserInfo && <>
          <h1 className='font-black text-blue-900 text-3xl my-3  p-3'>Hi {data?.data?.username}</h1>
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
          <LogoutBtn />
          {/* <button className='cursor-pointer' onClick={handleChangePasswordBtn}>Change Password</button> */}
        </>
      }
    </main>
  )
}
