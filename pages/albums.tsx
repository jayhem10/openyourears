/* eslint-disable @next/next/no-img-element */
import AlbumAdd from "@/components/Album/AlbumAdd";
import AlbumsList from "@/components/Album/AlbumsList";
import { IndexLayout } from "@/layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import Album from "@/interfaces/album";

type Props = {
};

export default function Albums({}: Props) {

  const[visible, setVisibility] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Album[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeVisible = () => {
    setVisibility(!visible);
  }

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select()
      .order("id", { ascending: false });
    setAlbums(data as Album[]);
    setIsLoading(false);
  };

  return (
    <IndexLayout>
      <div className=" flex flex-col items-center justify-center text-center overflow-hidden">
        <button className="my-5" onClick={() => changeVisible()}><a href="#" >add Album</a></button>
        <AlbumAdd visibility={visible} changeVisible={changeVisible} getAlbums={getAlbums}/>
        {albums &&
          <AlbumsList albums={albums} isLoading={isLoading}/>
        }
      </div>
    </IndexLayout>
  );
}
