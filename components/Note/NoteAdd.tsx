import Notation from "@/interfaces/notation";
import supabase from "@/utils/supabase";
import { User, useSession } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";

type Props = {
  closeAddingNote: any;
  albumId?: number;
  user: User;
  notation?: Notation;
};

const NoteAdd = ({ closeAddingNote, albumId, user, notation }: Props) => {
  const [note, setNote] = useState<number>(notation ? notation?.note : 0);
  const [comment, setComment] = useState<string>(
    notation ? notation?.comment : ""
  );
  let [lastInsertedId, setLastInsertedId] = useState<number>(0);

  async function fillNewNote(note: number, comment: string) {
    // await fetchLastNote();
    const data = {
      id: ++lastInsertedId,
      note: note,
      comment: comment,
      user_id: user.id,
      album_id: albumId,
    };
    try {
      let { error } = await supabase.from("notes").insert([data]);
      if (error) throw error;
      closeAddingNote();
      alert("Note added with success !");
    } catch (errorAdd) {
      alert("An error has occured, you note have not been added !");
      console.log(errorAdd);
    }
  }

  async function updateNote(note: number, comment: string) {
    // await fetchLastNote();
    const data = {
      note: note,
      comment: comment,
    };
    try {
      let { error } = await supabase.from("notes").update([data]).eq('id', notation?.id);
      if (error) throw error;
      closeAddingNote();
      alert("Note updated with success !");
    } catch (errorUpdate) {
      alert("An error has occured, you note have not been updated !");
      console.log(errorUpdate);
    }
  }

  async function fetchLastNote() {
    let { data, error } = await supabase
      .from("notes")
      .select("id")
      .order("id", { ascending: false });
    if (data) {
      setLastInsertedId(data[0].id);
    }
  }

  useEffect(() => {
    fetchLastNote();
  });

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
            <label htmlFor="noteName">Rate</label>
            <input
              type="number"
              name="note"
              id="note"
              placeholder="Note"
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
            <button type="submit" onClick={() => fillNewNote(note, comment)}>
              Submit
            </button>
          ) : (
            <button type="submit" onClick={() => updateNote(note, comment)}>
              Update
            </button>
          )}
        </div>
        <div className="modal_footer py-4">
          <button onClick={() => closeAddingNote()}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NoteAdd;
