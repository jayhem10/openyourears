import Album from "./album";
import Profiles from "./profile";

export default interface Comment {
    user?: Profiles;
    id:number,
    commentary:string,
    user_id:number,
    album_id:number,
    created_at: string
};

