import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'


export default function Navbar({session}) {
  const supabase = useSupabaseClient();

  return (
    <nav className="px-2 border-gray-200 dark:bg-[#062925] dark:border-gray-700">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <img src="https://s1.qwant.com/thumbr/0x380/a/a/633a12baf625d4dd0d966fec9b462d73bfa9754b296122658bba3189b0cf87/24191-white-music-notes-design.png?u=https%3A%2F%2Fwww.downloadclipart.net%2Flarge%2F24191-white-music-notes-design.png&q=0&b=1&p=0&a=0" className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">OpenYourEars</span>
        </Link>
        {session && 
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-[#062925]  md:dark:bg-[#062925]  dark:border-gray-700">
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</Link>
            </li>              
            <li>
              <Link href="/myaccount" className=""><img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="" width={25} color="white" /></Link>
            </li>
            <li>
              <a onClick={() => supabase.auth.signOut()} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
            </li>
          </ul>
        </div>
        }
      </div>
    </nav>

  )
}
