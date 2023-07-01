import Album from "./album";
import Profiles from "./profile";

export default interface Notation {
    user?: Profiles;
    album?: Album;
    map(arg0: (review: Notation, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    id:number,
    note: number,
    comment:string,
    user_id:number,
    average:number,
};

