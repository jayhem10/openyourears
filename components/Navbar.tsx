import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Router from "next/router";

export default function Navbar({ session }) {
  const supabase = useSupabaseClient();

  const logout = () => {
    supabase.auth.signOut();
    Router.push("/");
  };

  return (
    <nav className="px-2 border-gray-200 dark:border-gray-700 sticky top-0 z-50 bg-[#313378]">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700">
            <li>
              <Link href="/" className="flex items-center">
                <img
                  src="https://s1.qwant.com/thumbr/0x380/a/a/633a12baf625d4dd0d966fec9b462d73bfa9754b296122658bba3189b0cf87/24191-white-music-notes-design.png?u=https%3A%2F%2Fwww.downloadclipart.net%2Flarge%2F24191-white-music-notes-design.png&q=0&b=1&p=0&a=0"
                  className="h-6 mr-3 sm:h-10"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  OpenYourEars
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/albums"
                className="block py-3 pl-3 pr-4 text-white "
                aria-current="page"
              >
                Albums
              </Link>
            </li>
          </ul>
        </div>
        {session && (
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 md:dark:text-white  md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link href="/myaccount" className="">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                    alt=""
                    width={25}
                    color="white"
                  />
                </Link>
              </li>
              <li>
                <a
                  onClick={() => logout()}
                  className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
