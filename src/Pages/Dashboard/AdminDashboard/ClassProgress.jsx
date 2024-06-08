import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ReactStars from "react-rating-stars-component";
import { Helmet } from "react-helmet-async";

const ClassProgress = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: feedbacks,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["feedbacks", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedback/${id}`);
      return res.data;
    },
  });

  const {
    data: classData,
    isPending: isClassPending,
    isError: isClassError,
  } = useQuery({
    queryKey: ["total_classes_data", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total_classes_data/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isPending || isClassPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  if (isError || isClassError) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <h1 className="text-5xl text-center">Data Not Found!</h1>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Class Progress | Dashboard</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl text-center font-semibold font-poppins uppercase underline">
        Feedbacks And Progress For This Class
      </h1>
      <h1 className="text-2xl  mt-5 font-semibold font-poppins uppercase bg-blue-500 px-3 rounded-xl py-2 text-white">
        CLASS PROGRESS
      </h1>
      <div className="flex gap-5 mt-5">
        <div className="flex flex-1 border bg-base-100  p-3 rounded-lg items-center gap-5">
          <img
            className="w-28 object-cover h-28"
            src="https://i.ibb.co/mCknyzc/laptop.png"
            alt=""
          />

          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold ">{classData.totalEnrolled}</p>
            <p className="capitalize font-semibold text-lg">
              TOTAL ENROLLED STUDENTS
            </p>
          </div>
        </div>

        <div className="flex flex-1 border bg-base-100  p-3 rounded-lg items-center gap-5">
          <img
            className="w-28 h-28"
            src="https://i.ibb.co/qD4fcqR/training.png"
            alt=""
          />

          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold ">
              {classData.totalAssignment}
            </p>
            <p className="capitalize font-semibold text-lg">ASSIGNMENTS</p>
          </div>
        </div>
      </div>

      <h1 className="text-2xl my-5  font-semibold font-poppins uppercase bg-blue-500 px-3 rounded-xl py-2 text-white">
        CLASS FEEDBACKS
      </h1>

      {feedbacks.length === 0 ? (
        <div className="h-[20vh] flex items-center justify-center">
          <h1 className="text-3xl font-semibold">
            No Feedback Found For This Class !
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="flex flex-col gap-4 bg-base-100 border-2 rounded-xl p-4"
            >
              <div className="flex justify justify-between">
                <div className="flex gap-2 items-center">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={feedback?.studentImg}
                    alt=""
                  />
                  <h1>{feedback?.studentName}</h1>
                </div>
                <div className="flex p-1 gap-1">
                  <ReactStars
                    value={feedback.rating}
                    size={30}
                    isHalf={true}
                    edit={false}
                    activeColor="#FFD700"
                  />{" "}
                  <div className="flex items-center">
                    (<p className="text-lg font-medium">{feedback.rating}</p>{" "}
                    <StarRoundedIcon
                      sx={{ color: "gold", fontSize: "25px" }}
                    ></StarRoundedIcon>
                    )
                  </div>
                </div>
              </div>

              <div>{feedback.description}</div>

              <div className="flex justify-between">
                <span>{feedback?.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassProgress;
