import { useRouter } from "next/router";

export default function SeeAllAlbum() {
  const router = useRouter();

  return (
    <>
      <article
        className="h-92 my-auto w-48 rounded-lg items-center snap-center flex-shrink-0 py-5 bg-[#292929] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200"
        onClick={() => router.push(`albums`)}
      >
        <div className="px-0 md:px-5">
          <p className="font-bold text-l mt-1">+</p>
        </div>
        <footer className="h-10 uppercase py-5 text-gray-300">
          See all albums
        </footer>
      </article>
    </>
  );
}
