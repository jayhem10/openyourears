export default interface Track {
    map(arg0: (review: Track, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    id:string,
    piste:number,
    title: number,
    duration:string,
    artist:number,
    album:number
};

