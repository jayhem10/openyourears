import DeezerAlbum from "@/interfaces/deezer/deezerAlbum";
import supabase from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Ui/Loader";
import AlbumList from "./AlbumListDeezer";
import Search from "./AlbumSearchDeezer";

type Props = {
  visibility: boolean;
  changeVisible: any;
  getAlbums: any;
};

const AlbumAddDeezer = ({ visibility, changeVisible, getAlbums }: Props) => {
  const [albums, setAlbums] = useState<DeezerAlbum[] | null | undefined>(); 
  const [searchingAlbums, setSearchingAlbums] = useState<boolean>(false); 
  const [selectedAlbum, setSelectedAlbum] = useState<DeezerAlbum | null>(null); // album sélectionné api deezer
  const [albumToAdd, setAlbumToAdd] = useState<DeezerAlbum | null>(null); // l'album qui sera ajouter en base
  let [lastInsertedId, setLastInsertedId] = useState<number>(0); // Initialize with null

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [albumAlreadyExist, setAlbumAlreadyExist] = useState<boolean>(false);

  useEffect(() => {
    if (albumToAdd) {
      getAlbumByDeezerId();
    }
  }, [albumToAdd]);

  useEffect(() => {
    if (isChecked && !albumAlreadyExist && albumToAdd) {
      sendData(albumToAdd);
    }
  }, [isChecked, albumAlreadyExist]);

  useEffect(() => {
    fetchLastAlbum();
  }, []);


  const searchAlbums = async (query: string) => {
    setSelectedAlbum(null);
    setAlbumToAdd(null);
    setSearchingAlbums(true);
    try {
      const response = await fetch(`/api/search?album=${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        const jsonData = await response.json();
        setAlbums(jsonData as DeezerAlbum[]);
        setSearchingAlbums(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function fillNewAlbum() {
    try {
      const response = await fetch(
        `/api/getalbum?album_id=${selectedAlbum?.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        const jsonData = await response.json();
        setAlbumToAdd(jsonData as DeezerAlbum);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    await fetchLastAlbum();
  }

  const handleSelectAlbum = (album: DeezerAlbum | null) => {
    setSelectedAlbum(album);
    setAlbums([]);
  };

  async function sendData(albumToAdd: DeezerAlbum) {
    const data = {
      id: ++lastInsertedId,
      name: albumToAdd?.title,
      groupe: albumToAdd?.artist.name,
      nb_title: albumToAdd?.nb_tracks,
      styleOne: albumToAdd?.genres?.data[0].name,
      release_date: albumToAdd?.release_date,
      image: albumToAdd?.cover_big,
      deezer_id: albumToAdd?.id,
    };
    try {
      let { error } = await supabase.from("albums").insert([data]);
      if (error) throw error;
      showToast("success", "Album added with success !");
      setSelectedAlbum(null);
      setAlbums(null);
      changeVisible(false);
      setIsChecked(false);
      setAlbumAlreadyExist(false);
      getAlbums();
    } catch (errorAdd) {
      showToast(
        "error",
        "An error has occurred, your album has not been added !"
      );
    }
  }

  async function fetchLastAlbum() {
    let { data, error } = await supabase
      .from("albums")
      .select("id")
      .order("id", { ascending: false });
    if (data) {
      setLastInsertedId(data[0]?.id || 0); // Set to 0 if no data
    }
  }



  const getAlbumByDeezerId = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select()
      .eq("deezer_id", selectedAlbum?.id);

    if (data && data?.length > 0) {
      setIsChecked(true);
      setAlbumAlreadyExist(true);
      showToast("info", "This album already exist");
    } else {
      setIsChecked(true);
      setAlbumAlreadyExist(false);
    }
  };

  const showToast = (type: string, message: string) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast.info(message);
        break;
    }
  };

  return (
    <>
      {visibility && (
        <div className="modal">
          <div className="bg-[#030303] border-2 border-indigo-500/50 shadow-md rounded px-2 md:px-8 pt-6 w-[80vw] md:w-[50vw] max-h-[75vh] snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7275f2]/80">
            <h1 className="mt-2 mb-4 text-2xl font-bold">Search for an album</h1>
            <Search onSearch={searchAlbums} />
            {!selectedAlbum && !searchingAlbums &&
              <AlbumList albums={albums} onSelectAlbum={handleSelectAlbum} />
            }
            {searchingAlbums && 
              <div className="my-3">
              <Loader/>
              </div>
            }

            {selectedAlbum && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mb-3">
                  <div className="mx-auto">
                    <img src={selectedAlbum.cover_medium} alt="cover" />
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
                  className="m-4 hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded"
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
