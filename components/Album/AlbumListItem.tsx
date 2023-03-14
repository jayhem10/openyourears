/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Album from "@/interfaces/album";
import AlbumEdit from "./AlbumEdit";

type Props = {
  album: Album;
};

export default function AlbumListItem({ album }: Props) {
  const [editVisible, setEditVisible] = useState<boolean>(false)

  const changeEditVisible = () => {
    setEditVisible(!editVisible);
  }

  useEffect(() => {
    console.log(editVisible)
  },[editVisible])

  return (
    <>
      <tr className="bg-[#4547a8] border-b border-[#00000] hover:bg-[#7275f2]">
            <th className="px-6 py-4">
                <img src={album.image} alt=""  width={80}/>
            </th>
            <td scope="row" className="px-6 py-4 font-medium text-blue-50 dark:text-blue-100">
                {album.name}
            </td>
            <td className="px-6 py-4">
                {album.groupe}
            </td>
            <td className="px-6 py-4">
                {album.styleOne}
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
                <a href="#" className="font-medium text-white ">
                <button className="ml-2 bg-transparent  text-blue-50 dark:text-blue-100 font-semibold py-2 px-4 hover:bg-[#131430] rounded" onClick={()=>{changeEditVisible()}}>
                Edit
                </button>
                </a> 
                <a href={`/album/${album.id}`} className="font-medium text-white">
                <button className="ml-2 bg-transparent  text-blue-50 dark:text-blue-100 font-semibold py-2 px-4  hover:bg-[#131430] rounded">
                +
                </button>
                </a> 
            </td>
        </tr>
        <AlbumEdit visibility={editVisible} changeVisible={changeEditVisible} idAlbum={album.id}/>
    </>
  );
}
