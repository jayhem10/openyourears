/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import AlbumListItem from "./AlbumListItem";
import Album from "@/interfaces/album";

type Props = {};

export default function AlbumsList({}: Props) {
  const [albums, setAlbums] = useState<Album[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAlbums = async () => {
      const { data, error } = await supabase.from("albums").select().order('id',  { ascending: false });;
      setAlbums(data as Album[]);
      setIsLoading(false);
    };
    getAlbums();
  }, []);

  return (
    <>
      <div className="text-center my-3">Albums</div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-3/5">
        <table className="table table-fit max-w-screen-2xl text-sm text-left text-blue-100 dark:text-blue-100 ">
          <thead className="text-xs text-white uppercase bg-[#131430] border-b border-[#00000] dark:text-white">
            <tr>
            <th  className="px-6 py-3">
                Pochette
              </th>
              <th  className="px-6 py-3">
                Album
              </th>
              <th className="px-6 py-3">
                Band
              </th>
              <th className="px-6 py-3">
                Style
              </th>
              <th className="px-6 py-3">
                Nb Title
              </th>
              <th className="px-6 py-3">
                Release Date
              </th>
              <th className="px-6 py-3">
                Added at
              </th>
              <th className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {albums &&
              albums.map((album: Album, i: React.Key | null | undefined) => {
                return <AlbumListItem key={i} album={album} />;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
