export default interface Artist {
    map(arg0: (review: Artist, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    id:string,
    name: string,
    nationality:string,
};

