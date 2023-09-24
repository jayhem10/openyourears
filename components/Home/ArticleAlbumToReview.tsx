/* eslint-disable @next/next/no-img-element */
import React from "react";
import Album from "@/interfaces/album";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type Props = {
  album: Album;
};

export default function Article({ album }: Props) {
  const router = useRouter();

  return (
    <>
      <article
        key={album.id}
        className="flex flex-col h-72 justify-between w-48 rounded-lg items-center  flex-shrink-0 py-5 snap-center bg-[#292929] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200"
        onClick={() => router.push(`album/${album.id}`)}
      >
        <motion.img
          initial={{
            y: -100,
            opacity: 0,
          }}
          transition={{
            duration: 1.2,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="w-32 object-contain object-center"
          src={album.image}
          alt="logo"
        />
        <div className="px-0 md:px-5">
          <h4 className="text-l font-light">
            {album.name.length > 50
              ? album.name.substring(0, 50) + "..."
              : album.name}
          </h4>
          <p className="font-bold text-l mt-1">{album.groupe}</p>
        </div>
      </article>
    </>
  );
}
