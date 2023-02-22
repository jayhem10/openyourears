export default interface Notation {
    map(arg0: (note: Notation, i: import("react").Key | null | undefined) => JSX.Element): import("react").ReactNode;
    id:number,
    note: number,
    comment:string,
    user:number,
    album:number
};

