import Album from "@/interfaces/album";
import Notation from "@/interfaces/notation";
import supabase from "@/utils/supabase";
import { User, useSession } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  closeAddingReview: any;
  album?: Album;
  user: User;
  notation?: Notation;
};

const ReviewForm = ({ closeAddingReview, album, user, notation }: Props) => {
  const [note, setNote] = useState<number>(notation ? notation?.note : 0);
  const [comment, setComment] = useState<string>(
    notation ? notation?.comment : ""
  );
  let [lastInsertedId, setLastInsertedId] = useState<number>(0);

  async function fillNewReview(review: number, comment: string) {
    const data = {
      id: ++lastInsertedId,
      note: note,
      comment: comment,
      user_id: user.id,
      album_id: album?.id,
    };
    try {
      let { error } = await supabase.from("reviews").insert([data]);
      if (error) throw error;
      closeAddingReview();
      toast.success("Review added with success !");
    } catch (errorAdd) {
      toast.error("An error has occured, you review have not been added !");
    }
  }

  async function updateReview(review: number, comment: string) {
    const data = {
      note: note,
      comment: comment,
    };
    try {
      let { error } = await supabase
        .from("reviews")
        .update([data])
        .eq("id", notation?.id);
      if (error) throw error;
      closeAddingReview();
      toast.success("Review updated with success !");
    } catch (errorUpdate) {
      toast.error("An error has occured, you review have not been updated !");
    }
  }

  async function fetchLastReview() {
    let { data, error } = await supabase
      .from("reviews")
      .select("id")
      .order("id", { ascending: false });
    if (data) {
      setLastInsertedId(data[0].id);
    }
  }

  useEffect(() => {
    fetchLastReview();
  });

  useEffect(() => {
    if (note && album && note > album.nb_title) {
      setNote(album.nb_title);
    }
    if (note && note < 0) {
      setNote(0);
    }
  }, [album, note]);

  return (
    <div className="modal" >
      <div className="bg-[#030303] border-2 border-indigo-500/50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[80vw] md:w-[50vw]">
        {notation != null ? (
          <h1 className="text-2xl font-bold mb-4">Update your rate</h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">Add a new rate</h1>
        )}
        <hr />
        <div className="mb-4 mt-2 text-white">
          <label htmlFor="noteName" className="text-white mb-2 mt-4">
            Rate on <b> {album?.nb_title}</b> tracks
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#39397f] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="review"
            id="review"
            placeholder="Review"
            defaultValue={notation?.note}
            onChange={(e) => setNote(parseInt(e.currentTarget.value))}
            autoFocus={true}
          />
          <div className="mb-8 mt-2">
            <label htmlFor="groupe" className="text-white mb-2 mt-4">
              Comment
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#39397f] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline"
              type="textarea"
              name="comment"
              id="comment"
              placeholder="Comment"
              defaultValue={notation?.comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
          </div>
          <div className="flex items-center justify-around">
            {notation == null ? (
              <button
                type="submit"
                className="m-2  hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded"
                onClick={() => fillNewReview(note, comment)}
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className="m-2 hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded"
                onClick={() => updateReview(note, comment)}
              >
                Update
              </button>
            )}
            <a href="#" onClick={() => closeAddingReview()}>
              <button className="m-2  hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded">
                Fermer
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
