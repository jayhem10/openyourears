import DeezerGenre from "./deezerGenre";
import DeezerArtist from "./deezerArtist";
import DeezerContributor from "./deezerContributor";
import DeezerTrack from "./deezerTrack";

export default interface DeezerAlbum {
    id: number;
    title: string;
    upc: string;
    link: string;
    share: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
    md5_image: string;
    genre_id: number;
    genres: {
      data: DeezerGenre[];
    };
    label: string;
    nb_tracks: number;
    duration: number;
    fans: number;
    release_date: string;
    record_type: string;
    available: boolean;
    tracklist: string;
    explicit_lyrics: boolean;
    explicit_content_lyrics: number;
    explicit_content_cover: number;
    contributors: DeezerContributor[];
    artist: DeezerArtist;
    type: string;
    tracks: {
      data: DeezerTrack[];
    };
  }