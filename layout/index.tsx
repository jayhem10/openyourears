import NavigationBar from "@/components/NavigationBar";
import { useSession } from "@supabase/auth-helpers-react";
import Head from "next/head";
import React from "react";

export function IndexLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  return (
    <>
      <Head>
        <title>OpenYourEars</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar session={session} />
      <div className="child-view text-white snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-[#0ef5e3] scrollbar-thumb-[#0ef5e3]/80">
        {children}
      </div>
        <footer className="footer footer-center p-4  mt-3 z-10">
            <p className="text-sm">Copyright © 2023 - All right reserved by OpenYourEars</p>
      </footer>
    </>
  );
}
