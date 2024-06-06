// import { useParams } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EnrolledClassRow from "./EnrolledClassRow";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { IoMdAddCircleOutline } from "react-icons/io";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import Swal from "sweetalert2";

const EnrolledClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: assignments,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`);
      // console.log(res);
      return res.data;
    },
    refetchOnWindowFocus: "always",
  });

  const { data: classData, isPending: isClassPending } = useQuery({
    queryKey: ["SingleClassItem", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/single_class/${id}`);
      return res.data;
    },
  });

  const { mutate: addFeedback } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/feedbacks", data);
      return res.data;
    },
    onSuccess: (response) => {
      if (response.insertedId) {
        document.getElementById("my_modal_1").close();
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "THANKS FOR YOUR FEEDBACK",
          text: "We have Received Your Feedback",
        });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const {
    register,
    handleSubmit,
    // watch,
    setError,
    formState: { errors },
  } = useForm();

  const handleFeedback = (formData) => {
    if (rating === 0) {
      return setError("description", {
        type: "manual",
        message: "Select Rating.",
      });
    }
    const feedbackData = {
      rating: parseFloat(rating),
      studentName: user?.displayName,
      studentImg: user?.photoURL,
      classId: id,
      className: classData.title,
      description: formData.description,
    };

    addFeedback(feedbackData);
  };

  if (isPending || isClassPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-medium uppercase underline mb-5">
        Assignments For This Class
      </h1>
      <button
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className="btn bg-blue-500 text-white hover:bg-transparent hover:border-blue-500 hover:text-blue-500 mb-4"
      >
        {" "}
        <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon> ADD TEACHING
        EVALUATION REPORT
      </button>
      <div>
        {assignments.length === 0 ? (
          <div className="h-[50vh] flex items-center justify-center">
            <h1 className="text-4xl text-center">
              NO ASSIGNMENT AVAILABLE FOR THIS CLASS
            </h1>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table text-center">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>TITLE</th>
                  <th>DESCRIPTION</th>
                  <th>DEADLINE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {!isPending &&
                  assignments.map((assignment, index) => (
                    <EnrolledClassRow
                      IsPending={isPending}
                      Refetch={refetch}
                      key={assignment._id}
                      index={index}
                      assignment={assignment}
                    ></EnrolledClassRow>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box relative">
          <h1 className="text-2xl text-center">REPORT AND FEEDBACK</h1>
          <p className="text-center">(Select Rating Star)</p>
          <div className="flex justify-center items-center">
            <ReactStars
              count={5}
              isHalf={true}
              onChange={(rating) => setRating(rating)}
              size={70}
              activeColor="#ffd700"
            />
          </div>
          <form onSubmit={handleSubmit(handleFeedback)} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-lg">REPORT DESCRIPTION</span>
              </label>

              <textarea
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is Required !",
                  },
                })}
                placeholder="Enter Your Feedback Text"
                className="input h-32 input-bordered resize-none py-1"
              ></textarea>

              {errors.description && (
                <p className="text-red-500 mt-1 font-medium font-jost">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-control  mt-6 col-span-2">
              <button className="btn  bg-blue-500 hover:bg-blue-500 text-xl text-white">
                <IoMdAddCircleOutline className="text-3xl font-bold"></IoMdAddCircleOutline>{" "}
                ADD REPORT
              </button>
            </div>
          </form>
          <div className=" modal-action absolute -top-3 right-2">
            <form method="dialog">
              <button className="bg-gray-100 p-1 rounded-full">
                <CloseRoundedIcon
                  sx={{
                    fontSize: "40px",
                  }}
                ></CloseRoundedIcon>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EnrolledClassDetails;
