import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notation from "@/interfaces/notation";
import Album from "@/interfaces/album";
import Track from "@/interfaces/track";
import { IndexLayout } from "@/layout";

type Props = {};

export default function Note({}: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();

  const router = useRouter();
  const { id } = router.query;

  const [notes, setNotes] = useState<Notation[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<Album>();
  const [tracks, setTracks] = useState<Track[]>();

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
    const getTracks = async () => {
      const { data, error } = await supabase
        .from("tracks")
        .select()
        .eq("album", id);
      setTracks(data as Track[]);
      setIsLoading(false);
    };
    if (id) {
      getNotes();
      getAlbum();
      getTracks();
    }
  }, [id]);

  return (
    <>
      <IndexLayout>
        {!isLoading && album && notes && (
          <>
            <a href={`/`} className="font-medium text-white">
              <button className="m-2 bg-[#4547a8] hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded">
                back
              </button>
            </a>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mx-auto">
                    <img width="250px" src={album.image} alt="vinyl" />
                  </div>
                  <div className="my-auto">
                    <div className="font-bold text-2xl mb-2 text-blue-50 uppercase">
                      {album.groupe}
                    </div>
                    <div className="text-xl mb-2">{album.name}</div>
                    <p className="mb-2">{album.release_date}</p>
                    <div className=" pt-4 pb-2">
                      <span className=" bg-[#4547a8] rounded-full px-3 py-1 text-xs font-semibold text-blue-50 mr-2 mb-2 uppercase">
                        {album.style}
                      </span>
                      <span className=" bg-[#4547a8] rounded-full px-3 py-1 text-xs font-semibold text-blue-50 mr-2 mb-2 uppercase">
                        {album.style}
                      </span>
                      <span className=" bg-[#4547a8] rounded-full px-3 py-1 text-xs font-semibold text-blue-50 mr-2 mb-2 uppercase">
                        {album.style}
                      </span>
                    </div>
                    <div className="mt-10 flex justify-center">
                      <a className="" href="">
                        <svg
                          width={25}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className=""
                        >
                          <path d="M96 352V96c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V293.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zM272 128c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256h48c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H320V144c0-8.8-7.2-16-16-16H272zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 224c0 48.6 39.4 88 88 88H296z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <table className="w-3/4 text-sm text-left  mx-10 mt-10">
                  <thead className="text-xs  uppercase border-b">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tracks &&
                      tracks.map(
                        (track: Track, i: React.Key | null | undefined) => {
                          return (
                            <tr key={track.id} className="">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap"
                              >
                                {track.piste}
                              </th>
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap"
                              >
                                {track.title}
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap"
                              >
                                {track.duration}
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
                {tracks?.length == 0 && (
                  <p className="text-center mt-3">No tracks</p>
                )}
              </div>
              <div className="">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100 mx-10">
                  <thead className="text-xs text-white uppercase bg-[#313378] border-b border-[#18122B] dark:text-white">
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
                            <tr
                              key={note.id}
                              className="bg-[#131430] border-b border-[#18122B] hover:bg-[#2e746c]"
                            >
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
                          );
                        }
                      )}
                  </tbody>
                </table>
                {notes?.length == 0 && (
                  <p className="text-center mt-3">No Notes</p>
                )}
              </div>
            </div>
          </>
        )}
      </IndexLayout>
    </>
  );
}
