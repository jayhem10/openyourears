/* eslint-disable @next/next/no-img-element */
import AlbumAdd from "@/components/Album/AlbumAdd";
import AlbumsList from "@/components/Album/AlbumsList";
import { IndexLayout } from "@/layout";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
};

export default function Albums({  }: Props) {

  const[visible, setVisibility] = useState<boolean>(false);

  const changeVisible = () => {
    setVisibility(!visible);
  }
  return (
    <IndexLayout>
      <div className="h-screen flex flex-col items-center justify-center  text-center overflow-hidden pt-8">
        <button><a href="#" onClick={() => changeVisible()}>add Album</a></button>
        <AlbumAdd visibility={visible} changeVisible={changeVisible} />
        <AlbumsList/>
      </div>
    </IndexLayout>
  );
}
