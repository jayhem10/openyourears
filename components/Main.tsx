/* eslint-disable @next/next/no-img-element */
import Album from "@/interfaces/album";
import supabase from "@/utils/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import Notation from "@/interfaces/notation";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

type Props = {};

export default function Main({}: Props) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  const [visible, setVisibility] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [albums, setAlbums] = useState<Album[]>();
  const [reviews, setReviews] = useState<Notation[]>();
  const [bestAlbums, setBestAlbums] = useState<Album[]>();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", session?.user.id)
        .single();
      setUser(data);
    };
    getCurrentUser();
    getLastAlbum();
    getLastReviews();
    getBestAlbums();
  }, []);

  const getLastAlbum = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select()
      .range(0, 9)
      .order("id", { ascending: false });
    setAlbums(data as Album[]);
  };

  const getLastReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `*,
        user:profiles(*),
        album:albums(*)`
      )
      .range(0, 9)
      .order("id", { ascending: false });
    setReviews(data as Notation[]);
  };

  const getBestAlbums = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select()
      .range(0, 9)
      .order("average", { ascending: false })
      .not("average", "is", null);
    setBestAlbums(data as Album[]);
  };

  return (
    <>
      <div className="h-fit ">
        <div className=" flex flex-col items-center justify-center  text-center overflow-hidden pt-8">
          {user && (
            <h1 className="mt-5 text-2xl">
              Bienvenue{" "}
              <span className="uppercase text-[#313378]">{user.username}</span>
            </h1>
          )}
        </div>

        <h2 className="pl-8">Last albums</h2>
        <div className="w-full text-center  flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7275f2]/80">
          {/* {jobs.filter(p => p.locale === locale).map((job, i) => { */}
          {albums?.map((album, i) => {
            return (
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
                  className="w-24 object-contain object-center"
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
                <footer className="h-10 uppercase pt-5 text-gray-300">
                  {album.release_date}
                </footer>
              </article>
            );
          })}
          <article
            className="h-92 my-auto w-48 rounded-lg items-center flex-shrink-0 py-5  bg-[#292929] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200"
            onClick={() => router.push(`albums`)}
          >
            <div className="px-0 md:px-5">
              <p className="font-bold text-l mt-1">+</p>
            </div>
            <footer className="h-10 uppercase py-5 text-gray-300">
              See all albums
            </footer>
          </article>
        </div>

        <h2 className="pl-8 pt-10">Last reviews</h2>
        <div className="w-full text-center  flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7275f2]/80">
          {/* {jobs.filter(p => p.locale === locale).map((job, i) => { */}
          {reviews?.map((review, i) => {
            return (
              <article
                key={review.id}
                className="flex flex-col h-72 justify-between w-48 rounded-lg items-center  flex-shrink-0 py-5 snap-center bg-[#292929] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200"
                onClick={() => router.push(`album/${review.album.id}`)}
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
                  className="w-24 object-contain object-center"
                  src={review.album.image}
                  alt="logo"
                />
                <div className="px-0 md:px-5">
                  <h4 className="text-l font-light">
                    {review.comment.length > 50
                      ? review.comment.substring(0, 50) + "..."
                      : review.comment}
                  </h4>
                  <p className="font-bold text-l mt-1">
                    {review.note} / {review.album.nb_title}
                  </p>
                </div>
                <footer className="h-10 py-5 text-gray-300">
                  by {review.user.username}
                </footer>
              </article>
            );
          })}
          <article
            className="h-92 my-auto w-48 rounded-lg items-center  flex-shrink-0 py-5 bg-[#292929] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200"
            onClick={() => router.push(`albums`)}
          >
            <div className="px-0 md:px-5">
              <p className="font-bold text-l mt-1">+</p>
            </div>
            <footer className="h-10 uppercase py-5 text-gray-300">
              See all albums
            </footer>
          </article>
        </div>

        <h2 className="pl-8 pt-10">Best ranked albums</h2>
        <div className="w-full text-center mb-10 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7275f2]/80">
          {/* {jobs.filter(p => p.locale === locale).map((job, i) => { */}
          {bestAlbums?.map((bestAlbum, i) => {
            return (
              <article
                key={bestAlbum.id}
                className="flex flex-col h-72 justify-between w-48 rounded-lg items-center  flex-shrink-0 py-5 snap-center bg-[#292929] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200"
                onClick={() => router.push(`album/${bestAlbum.id}`)}
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
                  className="w-24 object-contain object-center"
                  src={bestAlbum.image}
                  alt="logo"
                />
                <div className="px-0 md:px-5">
                  <h4 className="text-l font-light">
                    {bestAlbum.name.length > 50
                      ? bestAlbum.name.substring(0, 50) + "..."
                      : bestAlbum.name}
                  </h4>
                  <p className="font-bold text-l mt-1">{bestAlbum.groupe}</p>
                </div>
                <footer className="h-10 uppercase pt-5 text-gray-300">
                  {bestAlbum.average}
                </footer>
              </article>
            );
          })}
          <article
            className="h-92 my-auto w-48 rounded-lg items-center flex-shrink-0 py-5 bg-[#292929] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200"
            onClick={() => router.push(`albums`)}
          >
            <div className="px-0 md:px-5">
              <p className="font-bold text-l mt-1">+</p>
            </div>
            <footer className="h-10 uppercase py-5 text-gray-300">
              See all albums
            </footer>
          </article>
        </div>
        <div className="my-16">.</div>
      </div>
    </>
  );
}
