import Album from "@/interfaces/album";
import Notation from "@/interfaces/notation";
import supabase from "@/utils/supabase";
import { User, useSession } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";

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
      alert("Review added with success !");
    } catch (errorAdd) {
      alert("An error has occured, you review have not been added !");
    }
  }

  async function updateReview(review: number, comment: string) {
    const data = {
      note: note,
      comment: comment,
    };
    try {
      let { error } = await supabase.from("reviews").update([data]).eq('id', notation?.id);
      if (error) throw error;
      closeAddingReview();
      alert("Review updated with success !");
    } catch (errorUpdate) {
      alert("An error has occured, you review have not been updated !");
      console.log(errorUpdate);
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
    if (note && album &&note > album.nb_title) {
      setNote(album.nb_title);
    }
    if (note && note < 0) {
      setNote(0);
    }
  }, [album, note])
  

  return (
    <div className="modal">
      <div className="modal_content">
        <div className="modal_header">
          {notation != null ? (
            <h1>Update your rate</h1>
          ) : (
            <h1>Add a new rate</h1>
          )}
        </div>
        <div className="modal_body">
          <div className="form-group">
            <label htmlFor="noteName">Rate on <b> {album?.nb_title}</b> tracks</label>
            <input
              type="number"
              name="review"
              id="review"
              placeholder="Review"
              defaultValue={notation?.note}
              onChange={(e) => setNote(parseInt(e.currentTarget.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="groupe">Comment</label>
            <input
              type="textarea"
              name="comment"
              id="comment"
              placeholder="Comment"
              defaultValue={notation?.comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
          </div>
          {notation == null ? (
            <button type="submit" onClick={() => fillNewReview(note, comment)}>
              Submit
            </button>
          ) : (
            <button type="submit" onClick={() => updateReview(note, comment)}>
              Update
            </button>
          )}
        </div>
        <div className="modal_footer py-4">
          <button onClick={() => closeAddingReview()}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
