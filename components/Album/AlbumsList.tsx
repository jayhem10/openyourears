/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import AlbumListItem from "./AlbumListItem";
import Album from "@/interfaces/album";
import Loader from "../Ui/Loader";

type Props = {};

export default function AlbumsList({}: Props) {
  const [albums, setAlbums] = useState<Album[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAlbums = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select()
        .order("id", { ascending: false });
      setAlbums(data as Album[]);
      setIsLoading(false);
    };
    getAlbums();
  }, []);

  return (
    <>
      <div className="text-center my-3">Albums</div>
      <div className="grid grid-cols-4 gap-4">
        {albums &&
          !isLoading &&
          albums.map((album: Album, i: React.Key | null | undefined) => {
            return <AlbumListItem key={i} album={album} />;
          })}
      </div>
      {isLoading && (
        <Loader/>
      )}
    </>
  );
}
