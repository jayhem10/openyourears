/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Notation from "@/interfaces/notation";

type Props = {
  review: Notation;
};

export default function ArticleLastReviews({ review }: Props) {
  const router = useRouter();

  return (
    <>
      <article
        key={review.id}
        className="flex flex-col h-72 justify-between w-48 rounded-lg items-center  flex-shrink-0 py-5 snap-center bg-[#292929] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200"
        onClick={() => router.push(`album/${review?.album?.id}`)}
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
          src={review.album?.image}
          alt="logo"
        />
        <div className="px-0 md:px-5">
          <h4 className="text-l font-light">
            {review.comment.length > 50
              ? review.comment.substring(0, 50) + "..."
              : review.comment}
          </h4>
          <p className="font-bold text-l mt-1">
            {review.note} / {review.album?.nb_title}
          </p>
        </div>
        <footer className="h-10 py-5 text-gray-300">
          by {review.user?.username}
        </footer>
      </article>
    </>
  );
}
