// pages/index.tsx

import DeezerAlbum from "@/interfaces/deezer/deezerAlbum";
import supabase from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AlbumList from "./AlbumListDeezer";
import Search from "./AlbumSearchDeezer";

type Props = {
  visibility: boolean;
  changeVisible: any;
  getAlbums: any;
};

const AlbumAddDeezer = ({ visibility, changeVisible, getAlbums }: Props) => {
  const [albums, setAlbums] = useState<DeezerAlbum[] | null | undefined>();
  const [selectedAlbum, setSelectedAlbum] = useState<DeezerAlbum | null>(null);
  const [addingAlbum, setAddingAlbum] = useState<DeezerAlbum | null>(null);

  let [lastInsertedId, setLastInsertedId] = useState<number>(0);
  
  const searchAlbums = async (query: string) => {
    setSelectedAlbum(null)
    setAddingAlbum(null)
    try {
      const response = await fetch(`/api/search?album=${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setAlbums(jsonData as DeezerAlbum[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const emptySearch = () => {
    setAlbums(null);
    setSelectedAlbum(null);
    setAddingAlbum(null)

  };

  const handleSelectAlbum = (album: DeezerAlbum | null) => {
    setSelectedAlbum(album);
    setAlbums([]);
  };

  async function fillNewAlbum() {
    try {
      const response = await fetch(`/api/getalbum?album_id=${selectedAlbum?.id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        const jsonData = await response.json();
        setAddingAlbum(jsonData as DeezerAlbum);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }

    await fetchLastAlbum();
    const existAlbum = await getAlbumByDeezerId();
    if (existAlbum == null && addingAlbum) {
      await sendData(addingAlbum);  
    }else{
      toast.info("This album already exists.")
    }
  }

  async function sendData(addingAlbum : DeezerAlbum) {
    const data = {
      id: ++lastInsertedId,
      name: addingAlbum?.title,
      groupe: addingAlbum?.artist.name,
      nb_title: addingAlbum?.nb_tracks,
      styleOne: addingAlbum?.genres?.data[0].name,
      release_date: addingAlbum?.release_date,
      image: addingAlbum?.cover_big,
      deezer_id: addingAlbum?.id,
    };
    try {
      let { error } = await supabase.from("albums").insert([data]);
      if (error) throw error;
      toast.success("Album added with success !");
      setSelectedAlbum(null);
      setAlbums(null)
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

  const getAlbumByDeezerId = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select()
      .eq("deezer_id", selectedAlbum?.id);

      if (data && data?.length > 0) {
        return data;
      }else{
        return null;
      }
  };

  return (
    <>
      {visibility && (
        <div className="modal mt-20">
          <div className="bg-[#030303] border-2 border-indigo-500/50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[80vw] md:w-[50vw] max-h-[90vh] overflow-y-auto ">
            <h1 className="my-3">Search for an album</h1>
            <Search onSearch={searchAlbums} emptySearch={emptySearch} />
            {!selectedAlbum && (
              <AlbumList albums={albums} onSelectAlbum={handleSelectAlbum} />
            )}
            {selectedAlbum && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mb-3">
                  <div className="mx-auto">
                    <img src={selectedAlbum.cover_medium} alt="" />
                  </div>
                  <div className="text-start my-auto">
                    <p className="font-bold text-xl">{selectedAlbum.title}</p>
                    <p>{selectedAlbum.artist.name}</p>
                    <p>{selectedAlbum.nb_tracks} tracks</p>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center justify-around">
              {selectedAlbum && (
                <button
                  type="submit"
                  className="m-2  hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded"
                  onClick={() => fillNewAlbum()}
                >
                  Confirm add
                </button>
              )}
              <a href="#" onClick={() => changeVisible(visibility)}>
                <button
                  onClick={() => handleSelectAlbum(null)}
                  className="m-2 hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded"
                >
                  Close
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumAddDeezer;
