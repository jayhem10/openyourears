/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Album from "@/interfaces/album";

type Props = {
  album: Album;
};

export default function AlbumListItem({ album }: Props) {
  const [addNote, setAddNote] = useState<boolean>(false);

  return (
    <>
      <tr className="bg-[#4547a8] border-b border-[#00000] hover:bg-[#7275f2]">
            <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                {album.name}
            </th>
            <td className="px-6 py-4">
                {album.groupe}
            </td>
            <td className="px-6 py-4">
                {album.style}
            </td>
            <td className="px-6 py-4">
                {album.nb_title}
            </td>
            <td className="px-6 py-4">
                {album.release_date}
            </td>
            <td className="px-6 py-4">
                {album.created_at}
            </td>
            <td className="px-6 py-4">
                <a href="#" className="font-medium text-white ">Edit</a> 
                <a href={`/album/${album.id}`} className="font-medium text-white">
                <button className="ml-2 bg-transparent  text-blue-50 dark:text-blue-100 font-semibold py-2 px-4  rounded">
                +
                </button>
                </a> 
            </td>
        </tr>
    </>
  );
}
