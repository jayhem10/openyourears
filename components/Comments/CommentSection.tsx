/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import CommentAdd from "./CommentAdd";
import CommentItem from "./CommentItem";
import Comment from "@/interfaces/comment";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Loader from "../Ui/Loader";

type Props = {};

export default function CommentSection({}: Props) {
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabaseClient();
  const user = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[] | null>([]);

  useEffect(() => {
    if (id) {
      getComments();
      setIsLoading(false);
    }
  }, [id]);

  const getComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `*,
        user:profiles(*),
        album:albums(*)`
      )
      .eq("album_id", id)
      .order("created_at", { ascending: false });
      setComments(data);
  };
  return (
    <>
    {!isLoading ?
      <section className=" py-8 lg:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            {/* component total comments */}
            <h2 className="text-lg lg:text-2xl font-bold text-white">
              Comments ({comments?.length})
            </h2>
            {/* component total comments END */}
          </div>

          {/* component add a  comment */}
          {id && 
            <CommentAdd getComments={getComments} userId={user?.id} albumId={id}/>
          }
          {/* component add a  comment */}

          {/* component list  comments */}
          {comments && !isLoading && comments.map((comment: Comment, i: React.Key | null | undefined) => {
            return <CommentItem key={i} comment={comment} getComments={getComments}/>;
          })}
        </div>
      </section>
      :
      <div className="flex items-center justify-center  text-center overflow-hidden pt-8">
        <Loader/>
      </div>
      }
    </>
  );
}
