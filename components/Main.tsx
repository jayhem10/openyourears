/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import AlbumAdd from "./Album/AlbumAdd";
import AlbumsList from "./Album/AlbumsList";

type Props = {
};

export default function Main({  }: Props) {

  const[visible, setVisibility] = useState<boolean>(false);

  const changeVisible = () => {
    setVisibility(!visible);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center  text-center overflow-hidden pt-8">
      <a href="#" onClick={() => changeVisible()}>addAlbum</a>
      <AlbumAdd visibility={visible} changeVisible={changeVisible} />
      <AlbumsList/>
    </div>
  );
}
