import { User } from "@supabase/supabase-js";

export default interface Notation {
    user: User;
    map(arg0: (note: Notation, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    id:number,
    note: number,
    comment:string,
    user_id:number,
    album:number,
};

