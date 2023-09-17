/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { toast } from "react-toastify";

type Props = {
  getComments: any;
  userId: string | undefined;
  albumId: string | string[];
};

export default function CommentAdd({getComments, userId, albumId}: Props) {
  let [lastInsertedId, setLastInsertedId] = useState<number>(0);
  const [commentary, setCommentary] = useState<string>("");

  useEffect(() => {
    fetchLastComment();
  });

  async function fillNewComment(
    comment: string,
  ) {
    await fetchLastComment();
    const data = {
      id: ++lastInsertedId,
      commentary: commentary,
      album_id:albumId,
      user_id:userId
    };
    try {
      let { error } = await supabase.from("comments").insert([data]);
      if (error) throw error;
      toast.success("Comment added with success !");
      setCommentary("");
      getComments();
    } catch (errorAdd) {
      toast.error("An error occured");
    }
  }

  async function fetchLastComment() {
    let { data, error } = await supabase
      .from("comments")
      .select("id")
      .order("id", { ascending: false });
    if (data) {
      setLastInsertedId(data[0].id);
    }
  }

  return (
    <>
      <div className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={6}
            value={commentary}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
            onChange={(e) => setCommentary(e.currentTarget.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          onClick={() => fillNewComment(commentary)}
        >
          Post comment
        </button>
      </div>
    </>
  );
}
