/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useAuth from "../../CustomHooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const TeachOnEdu = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [appliedExists, setAppliedExists] = useState(null);

  const {
    mutate: applyForTeaching,
    isPending: isPostPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/teacher_requests", data);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.insertedId) {
        refetch();
        Swal.fire({
          title: "Submitted Successfully!",
          text: "Please Wait You Got Any Response",
          icon: "success",
        });
      }
    },
  });

  // check if his any application already in Pending
  const {
    data: applications = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher_requests/${user?.email}`);
      setAppliedExists(res.data.find((sData) => sData.status === "pending"));
      console.log(res.data);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleApply = (data) => {
    const teacherInfo = {
      ...data,
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
      status: "pending",
    };
    applyForTeaching(teacherInfo);
  };

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div>
      <SectionTitle
        title="COME TEACH WITH US "
        subtitle="Become an instructor and change lives — including your own"
      ></SectionTitle>
      <div className="mt-8">
        {!appliedExists && (
          <div className="divider mb-8 divider-primary">
            {" "}
            <h1 className="text-3xl text-primary-1 text-center font-semibold">
              — APPLY NOW —
            </h1>
          </div>
        )}

        <div className="flex justify-evenly">
          <div>
            <div className="flex-1 ">
              {appliedExists ? (
                <>
                  <button className="btn bg-primary-1 hover:bg-primary-1 text-lg text-white hover:bg-btn-1">
                    <QueryBuilderIcon></QueryBuilderIcon> YOUR REQUEST IS IN
                    PENDING...
                  </button>

                  <p className="mt-5 text-xl font-semibold ">
                    YOUR SUBMITTED INFO:
                  </p>
                  <form className="flex-1">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text  text-lg">
                          Experience Level
                        </span>
                      </label>
                      <input
                        readOnly
                        defaultValue={appliedExists.experience}
                        placeholder="Title"
                        className="input w-full input-bordered"
                      />
                    </div>

                    <div className="form-control relative">
                      <label className="label">
                        <span className="label-text  text-lg">Title</span>
                      </label>
                      <input
                        readOnly
                        defaultValue={appliedExists.title}
                        placeholder="Title"
                        className="input w-full input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text  text-lg">Category</span>
                      </label>
                      <input
                        readOnly
                        defaultValue={appliedExists.category}
                        placeholder="Title"
                        className="input w-full input-bordered"
                      />
                    </div>
                    <button className="btn bg-primary-1 hover:bg-primary-1 mt-3 text-lg text-white hover:bg-btn-1">
                      <AutorenewRoundedIcon></AutorenewRoundedIcon>WE WILL
                      RESPONSE SHORTLY...
                    </button>
                  </form>
                </>
              ) : (
                <form onSubmit={handleSubmit(handleApply)} className="flex-1">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text  text-lg">
                        Select Your Experience Level
                      </span>
                    </label>
                    <select
                      defaultValue="default"
                      {...register("experience", {
                        required: {
                          value: true,
                          message: "Experience is a Required Field!",
                        },
                      })}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled value="default">
                        Select Experience Level
                      </option>
                      <option value="Beginner">Beginner</option>
                      <option value="Mid-Level">Mid-Level</option>
                      <option value="Experienced">Experienced</option>
                    </select>
                  </div>

                  <div className="form-control relative">
                    <label className="label">
                      <span className="label-text  text-lg">Title</span>
                    </label>
                    <input
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Title is a Required Field!",
                        },
                      })}
                      placeholder="Title"
                      className="input w-full input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text  text-lg">
                        Select Category
                      </span>
                    </label>
                    <select
                      defaultValue="default"
                      {...register("category", {
                        required: {
                          value: true,
                          message: "Category is a Required Field!",
                        },
                      })}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled value="default">
                        Select Category
                      </option>
                      <option>Web Development</option>
                      <option>App Development</option>
                      <option>Cyber Security</option>
                      <option>Web Design</option>
                      <option>Graphic Design</option>
                      <option>Digital Marketing</option>
                    </select>
                  </div>
                  <div className="form-control mt-6">
                    {applications.length > 0 ? (
                      <button className="btn bg-primary-1 hover:bg-primary-1 text-lg text-white hover:bg-btn-1">
                        {isPostPending
                          ? "SUBMITTING..."
                          : isSuccess
                          ? "SUBMITTED"
                          : " REQUEST FOR ANOTHER"}
                      </button>
                    ) : (
                      <button className="btn bg-primary-1 hover:bg-primary-1 text-lg text-white hover:bg-btn-1">
                        {isPostPending
                          ? "SUBMITTING..."
                          : isSuccess
                          ? "SUBMITTED"
                          : "SUBMIT FOR REVIEW"}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="divider divider-horizontal divider-secondary">X</div>

          <div className=" flex flex-col justify-center items-center">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
            <div className="text-center mb-5">
              <h1 className="text-xl">
                <span className="font-semibold">MS KHAN</span>
              </h1>
              <h3 className="text-lg">
                <span className="font-medium">mskhan@gmail.com</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachOnEdu;
