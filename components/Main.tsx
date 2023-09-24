/* eslint-disable @next/next/no-img-element */
import Album from "@/interfaces/album";
import supabase from "@/utils/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import Notation from "@/interfaces/notation";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Loader from "./Ui/Loader";
import Article from "./Home/ArticleAlbumToReview";
import SeeAllAlbum from "./Home/SeeAllAlbums";
import ArticleLastAlbum from "./Home/ArticleLastAlbum";
import ArticleLastReviews from "./Home/ArticleLastReviews";
import ArticleBestRankedAlbum from "./Home/ArticleBestRankedAlbum";

type Props = {};

export default function Main({}: Props) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = useState<any>();
  const [albums, setAlbums] = useState<Album[]>();
  const [reviews, setReviews] = useState<Notation[]>();
  const [bestAlbums, setBestAlbums] = useState<Album[]>();
  const [albumsToReviews, setAlbumsToReviews] = useState<Album[]>();


  const [isLoadingAlbums, setIsLoadingAlbums] = useState<boolean>(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);
  const [isLoadingBestAlbums, setIsLoadingBestAlbums] = useState<boolean>(true);
  const [isLoadingAlbumsToReviews, setIsLoadingAlbumsToReviews] = useState<boolean>(true);



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
    getAlbumsNotReviewedByUser();
  }, []);

  const getLastAlbum = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select()
      .range(0, 9)
      .order("id", { ascending: false });
    setAlbums(data as Album[]);
    setIsLoadingAlbums(false);
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
    setIsLoadingReviews(false);
  };

  const getBestAlbums = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select()
      .range(0, 9)
      .order("average", { ascending: false })
      .not("average", "is", null);
    setBestAlbums(data as Album[]);
    setIsLoadingBestAlbums(false);
  };

  const getAlbumsNotReviewedByUser = async () => {

    const { data, error } = await  supabase
      .from('reviews')
      .select('album_id')
      .eq('user_id', session?.user.id);
      const values = [];
      if (data) {
        for (const objet of data) {
          values.push(objet.album_id);
        }
      }

    if (values) {
      const { data, error } = await supabase
      .from('albums')
      .select()
      .not('id', 'in', `(${values.toString()})`
      );
      setAlbumsToReviews(data as Album[]);
      setIsLoadingAlbumsToReviews(false);
    };
}

  return (
    <>
      <div className="h-fit ">
        <div className=" flex flex-col items-center justify-center  text-center overflow-hidden pt-8">
          {user && (
            <h1 className="mt-5 text-2xl">
              Welcome {" "}
              <span className="uppercase text-[#3e419a]">{user.username}</span>
            </h1>
          )}
        </div>

        {/* Derniers albums ajoutés */}
        <h2 className="pl-8 mt-4">Last albums</h2>
        <div className="w-full text-center  flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7275f2]/80">
          {albums?.map((album, i) => {
            return (
              <div key={i}>
                <ArticleLastAlbum album={album}/>
              </div>
            );
          })}
          {!isLoadingAlbums && albums &&
            <SeeAllAlbum/>
          }
          {isLoadingAlbums && < Loader/>}
        </div>

        {/* Denières notes d'albums */}
        <h2 className="pl-8 pt-10">Last reviews</h2>
        <div className="w-full text-center  flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7275f2]/80">
          {reviews && reviews?.map((review, i) => {
            return (
              <div key={i}>
                <ArticleLastReviews review={review}/>
              </div>
            );
          })}
          {!isLoadingReviews && reviews &&
            <SeeAllAlbum/>
          }
          {isLoadingReviews && < Loader/>}
        </div>

        {/* Meilleurs albums */}
        <h2 className="pl-8 pt-10">Best ranked albums</h2>
        <div className="w-full text-center mb-10 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7275f2]/80">
          {!isLoadingBestAlbums && bestAlbums?.map((bestAlbum, i) => {
            return (
              <div key={i}>
                <ArticleBestRankedAlbum album={bestAlbum}/>
              </div>
            );
          })}
          {!isLoadingBestAlbums && albums &&
            <SeeAllAlbum/>
          }
          {isLoadingBestAlbums && < Loader/>}
        </div>

          {/* Albums à noter */}
        <h2 className="pl-8 pt-10">Albums to reviews</h2>
        <div className="w-full text-center mb-10 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7275f2]/80">
          {!isLoadingAlbumsToReviews && albumsToReviews?.map((albumsToReview, i) => {
            return (
              <div key={i}>
                <Article album={albumsToReview}/>
              </div>
            );
          })}
          {!isLoadingAlbumsToReviews && albums &&
            <SeeAllAlbum/>
          }
          {isLoadingAlbumsToReviews && < Loader/>}
        </div>
      </div>
    </>
  );
}
