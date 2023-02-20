export default interface Album {
    map(arg0: (album: Album, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    name: string,
    groupe:string,
    nb_title:number,
    style:string,
    release_date:string,
    created_at:string,
};

