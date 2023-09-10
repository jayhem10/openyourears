/* eslint-disable @next/next/no-img-element */
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

type Props = {
  session: any;
};

export default function NavigationBar({ session }: Props) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const logout = () => {
    supabase.auth.signOut();
    Router.push("/");
  };
  console.log(router.pathname);
  return (
    <Navbar
      fluid
      rounded
      className="px-2 border-gray-200 dark:border-gray-700 sticky top-0 z-50 bg-[#313378]"
    >
      <Navbar.Brand href="/">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="https://s1.qwant.com/thumbr/0x380/a/a/633a12baf625d4dd0d966fec9b462d73bfa9754b296122658bba3189b0cf87/24191-white-music-notes-design.png?u=https%3A%2F%2Fwww.downloadclipart.net%2Flarge%2F24191-white-music-notes-design.png&q=0&b=1&p=0&a=0"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          OpenYourEars
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 ">
        <Dropdown
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://cdn-icons-png.flaticon.com/512/219/219983.png"
              rounded
            />
          }
          className="bg-[#313378]"
        >
          <Dropdown.Header>
            <span className="block text-sm text-white">
              {session?.user?.email}
            </span>
          </Dropdown.Header>
          <div>
            <Link href="/myaccount" className={router.pathname == "/myaccount" ? "text-[#7275f2] ml-3" :  "ml-3 text-white hover:text-[#7275f2]"}>
                My account
            </Link>
          </div>
          <Dropdown.Divider />
          <div
            onClick={() => logout()}
            className="ml-3 text-white cursor-pointer hover:text-[#7275f2]"
          >
            Logout
          </div>
        </Dropdown>
        <Navbar.Toggle className="bg-[#313378] text-white hover:bg-[#313378] hover:text-wh"/>
      </div>
      <Navbar.Collapse className="">
        <Navbar.Link href="/" className="hover:bg-[#7275f2] ">
          <p className={router.pathname == "/" ? "text-[#7275f2] hover:text-white md:hover:text-[#7275f2]" : "text-white hover:text-white md:hover:text-[#7275f2] md:active:text-[#7275f2]"}>Home</p>
        </Navbar.Link>
        <Navbar.Link href="/albums" className="hover:bg-[#7275f2] hover:text-white">
          <p className={router.pathname == "/albums" ? "text-[#7275f2] hover:text-white md:hover:text-[#7275f2]" : "text-white hover:text-white md:hover:text-[#7275f2] md:active:text-[#7275f2]"}>Albums</p>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
