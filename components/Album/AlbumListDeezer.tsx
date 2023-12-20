// components/AlbumList.tsx

import DeezerAlbum from "@/interfaces/deezer/deezerAlbum";
import React from "react";

type Props = {
  albums: DeezerAlbum[] | null | undefined;
  onSelectAlbum: any;
};

const AlbumList = ({ albums, onSelectAlbum }: Props) => {
  return (
    <div className="grid md:grid-cols-5 gap-2 grid-cols-1">
      {albums &&
        albums.map((album) => (
          <a
            key={album.id}
            className="my-3"
            href="#"
            onClick={() => onSelectAlbum(album)}
          >
            <div className="w-48 h-48 md:w-32 md:h-32 bg-red-100 relative border-white rounded mx-auto">
              
              <div className="absolute inset-0 bg-cover bg-center z-0">
                <img src={album.cover_medium} alt="cover"  />
              </div>
              <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10  text-base text-indigo-700 font-semibold hover:backdrop-blur-md flex items-center justify-center">
                <div className="">{album.title}</div>
                {/* <div className="flex items-center">{album.groupe}</div> */}
              </div>
            </div>
          </a>
        ))}
    </div>
  );
};

export default AlbumList;
