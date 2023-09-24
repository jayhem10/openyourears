import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import Notation from "@/interfaces/notation";
import Album from "@/interfaces/album";
import Track from "@/interfaces/track";
import { IndexLayout } from "@/layout";
import ReviewAForm from "@/components/Review/ReviewForm";
import Loader from "@/components/Ui/Loader";
import CommentSection from "@/components/Comments/CommentSection";
import { toast } from "react-toastify";

type Props = {};

export default function Review({}: Props) {
  const supabase = useSupabaseClient();

  const router = useRouter();
  const { id } = router.query;

  const [reviews, setReviews] = useState<Notation[]>([]);
  const [review, setReview] = useState<Notation>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<Album>();
  const [tracks, setTracks] = useState<Track[]>();
  const [user, setUser] = useState<any>();

  const [average, setAverage] = useState<number>(0);

  const [addingReview, setAddingReview] = useState<boolean>(false);
  const [updatingReview, setUpdatingReview] = useState<boolean>(false);
  const [alreadyReviewd, setAlreadyReviewd] = useState<boolean>(false);

  useEffect(() => {
    const getAlbum = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select()
        .eq("id", id)
        .single();
      setAlbum(data);
      setIsLoading(false);
    };
    const getTracks = async () => {
      const { data, error } = await supabase
        .from("tracks")
        .select()
        .eq("album", id);
      setTracks(data as Track[]);
      setIsLoading(false);
    };

    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data.user);
    };

    if (id) {
      getReviews();
      getAlbum();
      getTracks();
      getCurrentUser();
      getReviewAverage();
    }
  }, [id]);

  useEffect(() => {
    if (reviews && album) {
      getReviewAverage();
    }
    if (user && reviews) {
      checkIsAlreadyReviewd();
    }
  }, [reviews, user]);

  const getReviewAverage = async () => {
    var sum = 0;
    let count = 0;
    count = reviews.length > 0 ? reviews.length : 0;

    reviews?.forEach((element) => {
      sum += element.note;
    });
    if (count > 0 && album && album?.nb_title > 0) {
      setAverage(sum / count / (album?.nb_title / 10));
    } else setAverage(0);
  };

  const getReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `*,
        user:profiles(*)`
      )
      .eq("album_id", id);
    setReviews(data as Notation[]);
  };

  const closeAddingReview = () => {
    setAddingReview(false);
    setUpdatingReview(false);
    setReview(undefined);
    getReviews();
  };

  const handleEdit = (review: SetStateAction<Notation | undefined>) => {
    setReview(review as Notation);
    setUpdatingReview(true);
  };

  const checkIsAlreadyReviewd = async () => {
    if (reviews.some((e) => e.user_id === user.id)) {
      setAlreadyReviewd(true);
    } else {
      setAlreadyReviewd(false);
    }
  };

  useEffect(() => {
    if (average) {
      updateAverage();
    }
  }, [average]);

  async function updateAverage() {
    const data = {
      average: average,
    };

    try {
      let { error } = await supabase
        .from("albums")
        .update([data])
        .eq("id", album?.id);
      if (error) throw error;
      closeAddingReview();
      toast.info("Average updated with success !");
    } catch (errorAdd) {
      toast.error("Average not updated !");
    }
  }
  return (
    <>
      <IndexLayout>
        {!isLoading && album && reviews && user && (
          // <div className="albumCover" style={{
          //   backgroundImage: `url(${album.image})`
          // }}>
          <div>
            <a href={`/albums`} className="font-medium text-white">
              <button className="m-2 hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded">
                back
              </button>
            </a>
            <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-2 gap-4 mt-8">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mx-auto ">
                    <img width="250px" src={album.image} alt="vinyl" />
                  </div>
                  <div className="my-auto">
                    <div className="font-bold text-2xl mb-2 text-blue-50 uppercase">
                      {album.groupe}
                    </div>
                    <div className="text-xl mb-2">{album.name}</div>
                    <div className="text-l mb-2">{album.nb_title} titres</div>
                    <p className="mb-2">{album.release_date}</p>
                    <div className=" pt-4 pb-2">
                      <span className=" bg-[#4547a8] rounded-full px-3 py-1 text-xs font-semibold text-blue-50 mr-2 mb-2 uppercase">
                        {album.styleOne}
                      </span>
                      <span className=" bg-[#4547a8] rounded-full px-3 py-1 text-xs font-semibold text-blue-50 mr-2 mb-2 uppercase">
                        {album.styleTwo}
                      </span>
                      <span className=" bg-[#4547a8] rounded-full px-3 py-1 text-xs font-semibold text-blue-50 mr-2 mb-2 uppercase">
                        {album.styleThree}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-80 md:w-full text-l my-5 mr-2 mb-2 px-3 py-1 text-center border border-[#4547a8] rounded-full">
                        Moyenne :{" "}
                        {average == 0 ? "Aucune review" : average.toFixed(2)} /
                        10
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" overflow-y-auto">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                  <thead className="text-xs text-white uppercase bg-[#313378] border-b border-[#18122B] dark:text-white">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Note
                        <div className="text-center">/ {album.nb_title}</div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Comment
                      </th>
                      <th scope="col" className="px-6 py-3">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews &&
                      reviews.map(
                        (review: Notation, i: React.Key | null | undefined) => {
                          return (
                            <tr
                              key={review.id}
                              className="bg-[#131430] border-b border-[#18122B] hover:bg-[#7275f2]"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-blue-50  dark:text-blue-100 text-center"
                              >
                                {review.note}
                              </th>
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium text-blue-50  dark:text-blue-100"
                              >
                                {review.comment}
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium text-blue-50 dark:text-blue-100"
                              >
                                {review?.user?.username}
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium text-blue-50 dark:text-blue-100"
                              >
                                {review.user_id == user.id && (
                                  <button
                                    onClick={() => handleEdit(review)}
                                    className="m-2  hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded"
                                  >
                                    Edit
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
                {reviews?.length == 0 && (
                  <p className="text-center mt-3">No Reviews</p>
                )}
                <div className="mt-10 flex justify-center">
                  {!alreadyReviewd && (
                    <button
                      className="m-2 bg-[#4547a8] hover:bg-[#4547a8] text-blue-50 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-[#4547a8] hover:border-transparent rounded"
                      onClick={() => setAddingReview(true)}
                    >
                      <svg
                        width={25}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className=""
                      >
                        <path d="M96 352V96c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V293.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zM272 128c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256h48c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H320V144c0-8.8-7.2-16-16-16H272zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 224c0 48.6 39.4 88 88 88H296z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center  text-center overflow-hidden pt-8">
          {addingReview && (
            <ReviewAForm
              closeAddingReview={closeAddingReview}
              album={album}
              user={user}
            />
          )}
          {updatingReview && (
            <ReviewAForm
              closeAddingReview={closeAddingReview}
              album={album}
              user={user}
              notation={review}
            />
          )}
          {!isLoading && album == null && <div>This album does not exist</div>}
          {isLoading && <Loader />}
        </div>

        <CommentSection />
      </IndexLayout>
    </>
  );
}
