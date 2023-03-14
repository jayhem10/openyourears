import { User } from "@supabase/supabase-js";
import Album from "./album";

export default interface Notation {
    user?: User;
    album?: Album;
    map(arg0: (review: Notation, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    id:number,
    note: number,
    comment:string,
    user_id:number,
    average:number,
};

