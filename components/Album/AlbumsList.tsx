/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import AlbumListItem from "./AlbumListItem";
import Album from "@/interfaces/album";
import Loader from "../Ui/Loader";

type Props = {
  albums: Album[]
};

export default function AlbumsList({ albums}: Props) {
  return (
    <>
      <div className="text-center my-3">Albums</div>
      <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
        {albums &&
          albums.map((album: Album, i: React.Key | null | undefined) => {
            return <AlbumListItem key={i} album={album} />;
          })}
      </div>

    </>
  );
}
