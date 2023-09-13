import Album from "@/interfaces/album";
import supabase from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  visibility: boolean;
  changeVisible: any;
  getAlbums: any;
};

const AlbumAdd = ({ visibility, changeVisible, getAlbums }: Props) => {
  const [album, setAlbum] = useState<Album>();
  const [albumName, setAlbumName] = useState<string>("");
  const [groupe, setGroupe] = useState<string>("");
  const [nbTitle, setNbTitle] = useState<number>(0);
  const [styleOne, setStyleOne] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  let [lastInsertedId, setLastInsertedId] = useState<number>(0);

  async function fillNewAlbum(
    albumName: string,
    groupe: string,
    nbTitle: number,
    styleOne: string,
    releaseDate: string,
    image: string
  ) {
    await fetchLastAlbum();
    const data = {
      id: ++lastInsertedId,
      name: albumName,
      groupe: groupe,
      nb_title: nbTitle,
      styleOne: styleOne,
      release_date: releaseDate,
      image: image,
    };
    try {
      let { error } = await supabase.from("albums").insert([data]);
      if (error) throw error;
      toast.success("Album added with success !");
      changeVisible(false);
      getAlbums();
    } catch (errorAdd) {
      toast.error("An error has occured, you album have not been added !");
    }
  }

  async function fetchLastAlbum() {
    let { data, error } = await supabase
      .from("albums")
      .select("id")
      .order("id", { ascending: false });
    if (data) {
      setLastInsertedId(data[0].id);
    }
  }

  useEffect(() => {
    fetchLastAlbum();
  });

  return (
    <>
      {visibility && (
        <div className="modal">

          <div className="bg-[#030303] border-2 border-indigo-500/50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[80vw] md:w-[50vw] max-h-[90vh] overflow-y-auto ">
          <div className="divide-y divide-indigo-800" >

            <h1 className="text-2xl font-bold mb-4">Add an album</h1>
            <div className="mb-4 mt-3">
              <label className=" text-white font-bold mt-8" htmlFor="albumName">Album name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#313378] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline"
                name="albumName"
                id="albumName"
                placeholder="Album"
                onChange={(e) => setAlbumName(e.currentTarget.value)}
              />{" "}
            </div>
            </div>
            <div className="mb-6">
              <label className="text-white" htmlFor="groupe">Artist</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#39397f] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="groupe"
                id="groupe"
                placeholder="Artist"
                onChange={(e) => setGroupe(e.currentTarget.value)}
              />
            </div>
            <div className="mb-6">
              <label className="text-white" htmlFor="style">Music style</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#39397f] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="styleOne"
                id="styleOne"
                placeholder="Style"
                onChange={(e) => {
                  setStyleOne(e.currentTarget.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label className="text-white" htmlFor="nbtitle">Number of tracks</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#39397f] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="nbtitle"
                id="nbTitle"
                placeholder="Number of tracks"
                min={0}
                onChange={(e) => setNbTitle(parseInt(e.currentTarget.value))}
              />
            </div>
            <div className="mb-6">
              <label className="text-white" htmlFor="release-date">Release date</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#39397f] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="releaseDate"
                id="release-date"
                placeholder="Release date"
                onChange={(e) => setReleaseDate(e.currentTarget.value)}
              />
            </div>
            <div className="mb-6">
              <label className="text-white" htmlFor="release-date">URL Cover</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#39397f] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="image"
                id="image"
                placeholder="URL"
                onChange={(e) => setImage(e.currentTarget.value)}
              />
            </div>
            <div className="flex items-center justify-around">
              <button
                type="submit"
                className="m-2  hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded"
                onClick={() =>
                  fillNewAlbum(
                    albumName,
                    groupe,
                    nbTitle,
                    styleOne,
                    releaseDate,
                    image
                  )
                }
              >
                Send
              </button>
              <a href="#" onClick={() => changeVisible(visibility)}>
              <button className="m-2 hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded">
                  Fermer
              </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumAdd;
