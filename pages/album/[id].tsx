import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Auth/Account";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notation from "@/interfaces/notation";
import Album from "@/interfaces/album";

type Props = {};

export default function Note({}: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();
  console.log("session", session);

  const router = useRouter();
  const { id } = router.query;

  const [notes, setNotes] = useState<Notation[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<Album>();

  useEffect(() => {
    const getNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("album_id", id);
      setNotes(data as Notation[]);
    };
    const getAlbum = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select()
        .eq("id", id)
        .single();
      setAlbum(data);
      setIsLoading(false);
    };
    if (id) {
      getNotes();
      getAlbum();
    }
  }, [id]);

  return (
    <>
      <Navbar session={session} />
      {!isLoading && album && notes && (
        <div className="bg-[#B8E1DD] text-black h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-[#0ef5e3] scrollbar-thumb-[#0ef5e3]/80">
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mx-auto">
                  <img width="250px" src={album.image} alt="vinyl" />
                </div>
                <div className="my-auto">
                  <div>
                    <div className="font-bold text-xl mb-2 text-black">
                      {album.groupe}
                    </div>
                    <p className="text-gray-700 text-base">
                      {album.name}, {album.release_date}
                    </p>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #{album.style}
                      </span>
                      {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100 mx-10">
              <thead className="text-xs text-white uppercase bg-[#044A42] border-b border-[#062925] dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Note
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Comment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                </tr>
              </thead>
              <tbody>
                {notes &&
                  notes.map(
                    (note: Notation, i: React.Key | null | undefined) => {
                      return (
                        <>
                          <tr className="bg-[#3A9188] border-b border-[#062925] hover:bg-[#2e746c]">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                            >
                              {note.note}
                            </th>
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                            >
                              {note.comment}
                            </td>
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                            >
                              USER
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
