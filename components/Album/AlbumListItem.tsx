/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Album from "@/interfaces/album";

type Props = {
  album: Album;
};

export default function AlbumListItem({ album }: Props) {
  const [addReview, setAddReview] = useState<boolean>(false);

  return (
    <>
      <a href={`/album/${album.id}`} className="font-medium text-white border-2 border-indigo-500/50 ">
        <div className="w-64 h-64 bg-red-100 relative border-white rounded">
          <div className="absolute inset-0 bg-cover bg-center z-0">
            <img src={album.image} alt="" />
          </div>
          <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10  text-xl text-white font-semibold hover:backdrop-blur-sm flex items-center justify-center">
            <div className="">{album.name}</div>
            {/* <div className="flex items-center">{album.groupe}</div> */}
          </div>
        </div>
      </a>
    </>
  );
}
