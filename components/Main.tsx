/* eslint-disable @next/next/no-img-element */
import supabase from "@/utils/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";

type Props = {
};

export default function Main({  }: Props) {
  const supabase = useSupabaseClient();
  const session = useSession();

  const[visible, setVisibility] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getCurrentUser = async () => {
        const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq("id", session?.user.id)
        .single();
        setUser(data)
    };
    getCurrentUser()
  }, [])
  

console.log("user",user)
  return (
    <div className=" flex flex-col items-center justify-center  text-center overflow-hidden pt-8">
      {user && 
        <h1 className="mt-5 text-2xl">Bienvenue <span className="uppercase text-[#313378]">{user.username}</span></h1>
      }
    </div>
  
  );
}
