/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const TeachOnEdu = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleApply = (data) => {
    console.log(data);
  };

  return (
    <div>
      <SectionTitle
        title="COME TEACH WITH US "
        subtitle="Become an instructor and change lives — including your own"
      ></SectionTitle>
      <div className="mt-8">
        <div className="divider mb-8 divider-primary">
          {" "}
          <h1 className="text-3xl text-primary-1 text-center font-semibold">
            — APPLY NOW —
          </h1>
        </div>

        <div className="flex justify-evenly">
          <div>
            <div className="flex-1 ">
              <form onSubmit={handleSubmit(handleApply)} className="flex-1">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white text-lg">
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
                    <span className="label-text text-white text-lg">Title</span>
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
                    <span className="label-text text-white text-lg">
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
                  <button className="btn bg-primary-1 hover:bg-primary-1 text-lg text-white hover:bg-btn-1">
                    SUBMIT FOR REVIEW
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="divider divider-horizontal divider-secondary">X</div>

          <div className=" flex flex-col justify-center items-center">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
