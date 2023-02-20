/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AlbumsList from "./Album/AlbumsList";

type Props = {
};

export default function Main({  }: Props) {

  return (
    <div className="h-screen flex flex-col items-center justify-center  text-center overflow-hidden pt-8">
      <AlbumsList/>
    </div>
  );
}
