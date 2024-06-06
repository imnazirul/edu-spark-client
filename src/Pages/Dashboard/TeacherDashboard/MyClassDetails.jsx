import { useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import useAuth from "../../../CustomHooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const MyClassDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  const {
    data: classData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["SingleClassItem", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total_classes_data/${id}`);
      return res.data;
    },
  });

  const { mutate: addAssignment } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/assignments", data);
      return res.data;
    },
    onSuccess: (response) => {
      if (response.insertedId) {
        refetch();
        document.getElementById("my_modal_1").close();
        reset();
        Swal.fire({
          title: "ASSIGNMENT ADDED SUCCESSFULLY!",
          text: "Your Assignment has been added.",
          icon: "success",
        });
      }
    },
    onError: () => {
      document.getElementById("my_modal_1").close();
      Swal.fire({
        title: "ERROR!",
        text: "An Error Ocurred While Creating Assignment.",
        icon: "error",
      });
    },
  });

  //
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  const handleAddAssignment = (formData) => {
    const currentTime = new Date().getTime();
    const deadlineTime = new Date(formData.deadline).getTime();
    if (deadlineTime < currentTime) {
      return setError("deadline", {
        type: "invalid",
        message: "Deadline cannot be any date in the past !",
      });
    } else if (deadlineTime > 4106851200000) {
      return setError("deadline", {
        type: "invalid",
        message: "Deadline Cannot Be Any Year After Year 2100 !",
      });
    }
    const assignmentData = {
      assignmentTitle: formData.assignmentTitle,
      description: formData.description,
      deadline: deadlineTime,
      classId: id,
      teacherEmail: user?.email,
      total_submitted: 0,
      submittedEmails: [],
    };
    addAssignment(assignmentData);
    console.log(assignmentData);
    // console.log(
    //   new Date(deadlineTime).toDateString(),
    //   new Date(deadlineTime).toLocaleTimeString()
    // );
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl  text-center font-semibold font-poppins underline">
        CLASS DETAILS
      </h1>
      <section className="p-6 my-6 font-poppins bg-base-300 rounded-xl">
        <div className="container grid grid-cols-1  mx-auto md:grid-cols-2 gap-5">
          <div className="flex border bg-base-100  p-3 rounded-lg items-center gap-5">
            <div className="">
              <img
                className="w-28 h-28"
                src="https://i.ibb.co/mCknyzc/laptop.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold ">
                {classData.totalEnrolled}
              </p>
              <p className="capitalize font-semibold text-lg">
                TOTAL ENROLLED STUDENTS
              </p>
            </div>
          </div>
          <div className="flex border bg-base-100  p-3 rounded-lg items-center gap-5">
            <div className="">
              <img
                className="w-28 h-28"
                src="https://i.ibb.co/qD4fcqR/training.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold ">
                {classData.totalAssignment.length}
              </p>
              <p className="capitalize font-semibold text-lg">ASSIGNMENTS</p>
            </div>
          </div>
          <div className="flex border bg-base-100  p-3 rounded-lg items-center gap-5">
            <div className="">
              <img
                className="w-28 h-28"
                src="https://i.ibb.co/c8ndc38/notification.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold ">
                {classData.totalAssignment.reduce(
                  (total, assignment) => total + assignment.total_submitted,
                  0
                )}
              </p>
              <p className="capitalize font-semibold text-lg">
                ASSIGNMENT SUBMISSION PER DAY
              </p>
            </div>
          </div>
          <div className="flex border bg-base-100  p-3 rounded-lg items-center gap-5">
            <div className="">
              <img
                className="w-28 h-28"
                src="https://i.ibb.co/8dDzkP1/graph.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold ">
                {(
                  (classData.totalAssignment.length / classData.totalEnrolled) *
                  100
                ).toFixed(2)}
                %
              </p>
              <p className="capitalize font-semibold text-lg">
                ASSIGNMENT SUBMISSION RATE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADD ASSIGNMENT */}

      <button
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className="btn bg-blue-500 hover:bg-blue-500 text-xl text-white"
      >
        <IoMdAddCircleOutline className="text-3xl font-bold"></IoMdAddCircleOutline>{" "}
        CREATE ASSIGNMENT
      </button>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box relative">
          <form onSubmit={handleSubmit(handleAddAssignment)} className="mt-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-lg">ASSIGNMENT TITLE</span>
              </label>
              <input
                {...register("assignmentTitle", {
                  required: {
                    value: true,
                    message: "Assignment Title is Required !",
                  },
                })}
                type="text"
                placeholder="Assignment Title"
                className="input input-bordered"
              />

              {errors.assignmentTitle && (
                <p className="text-red-500 font-medium font-jost">
                  {errors.assignmentTitle.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text  text-lg">ASSIGNMENT DEADLINE</span>
              </label>
              <input
                {...register("deadline", {
                  required: {
                    value: true,
                    message: "Deadline is Required !",
                  },
                })}
                type="date"
                placeholder="Deadline"
                className="input input-bordered"
                step="any"
              />

              {errors.deadline && (
                <p className="text-red-500 font-medium font-jost">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text  text-lg">
                  ASSIGNMENT DESCRIPTION
                </span>
              </label>
              <textarea
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is Required !",
                  },
                })}
                placeholder="Assignment Description"
                className="input input-bordered pt-1  h-20 text-sm  resize-none"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 font-medium font-jost">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-control  mt-6 col-span-2">
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="btn  bg-blue-500 hover:bg-blue-500 text-xl text-white"
              >
                <IoMdAddCircleOutline className="text-3xl font-bold"></IoMdAddCircleOutline>{" "}
                ADD ASSIGNMENT
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

export default MyClassDetails;
