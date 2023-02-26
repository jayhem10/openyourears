export default interface Album {
    map(arg0: (album: Album, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    id:number,
    name: string,
    groupe:string,
    nb_title:number,
    styleOne:string,
    styleTwo:string,
    styleThree:string,
    release_date:string,
    created_at:string,
    image:string
};

