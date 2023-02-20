/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import Album from "@/interfaces/album";

type Props = {
  album: Album;
};

export default function AlbumListItem({ album }: Props) {
  return (
    <>
      <tr className="bg-[#3A9188] border-b border-[#062925] hover:bg-[#2e746c]">
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
                    <a href="#" className="font-medium text-white hover:underline">Edit </a> 
                </td>
            </tr>
    </>
  );
}
