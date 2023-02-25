export default interface Artist {
    map(arg0: (note: Artist, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    id:string,
    name: string,
    nationality:string,
};

