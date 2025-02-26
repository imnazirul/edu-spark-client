import { BsPeopleFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const ClassDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: classItem = {},
    isPending,
    isError,
    // refetch,
  } = useQuery({
    queryKey: ["SingleClassItem", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/single_class/${id}`);
      return res.data;
    },
    refetchOnWindowFocus: "always",
  });

  if (isPending) {
    return (
      <div className="mt-24">
        <div className="flex flex-col-reverse lg:flex-row gap-5 w-full ">
          <div className=" w-full py-5 lg:p-5">
            <div className="skeleton h-10 mb-5 w-full"></div>
            <div className="skeleton h-4 mb-2 w-full"></div>
            <div className="skeleton h-4 w-full mb-8"></div>
            <div className=" h-10 w-full flex gap-1 items-center mb-5">
              {" "}
              <div className="skeleton h-12 w-12 rounded-full"></div>
              <div className="skeleton h-7 w-60"></div>
            </div>
            <div className="skeleton h-12 rounded-xl w-60 mb-5"></div>
            <div className="skeleton h-12 w-40"></div>
          </div>
          <div className="skeleton w-full">
            <div className="skeleton h-48 md:h-80 w-full"></div>
          </div>
        </div>
        <div className="flex gap-10 mt-3 lg:mt-5  lg:px-5">
          <div className="skeleton h-10  w-full"></div>{" "}
          <div className="skeleton h-10 w-full"></div>
        </div>
        <div className="skeleton h-40 mt-5  w-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <h1 className="text-5xl text-center">Data Not Found!</h1>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Class Details | EduSpark</title>
      </Helmet>
      <section className="bg-base-200 p-5 ">
        <div className="container flex flex-col mx-auto lg:flex-row-reverse">
          <div className="w-full lg:w-[60%] flex items-center">
            <img
              className=" max-md:h-44  w-full object-cover border-4 border-pink-500"
              src={classItem.image}
              alt=""
            />
          </div>
          <div className="flex flex-col space-y-3 md:space-y-5  w-full py-4 lg:w-2/3 md:p-8 lg:p-10 lg:pt-5">
            <div className="flex item-center gap-1">
              {" "}
              <h2 className="text-xl md:text-3xl font-semibold  border-l-[6px] border-primary-1 pl-1">
                {classItem.title}
              </h2>
            </div>
            <p className="text-primary-1 inline-block px-3 py-1 self-start rounded-3xl bg-primary-1 bg-opacity-20">
              {classItem.category}
            </p>

            <p className=" ">{classItem.short_description}</p>
            <div className="flex gap-2 items-center">
              {" "}
              <img
                alt=""
                className="w-7 md:w-10 h-7 md:h-10 rounded-full object-cover ring-[3px]  ring-blue-500 dark:bg-gray-500 "
                src={classItem?.teacherImg}
              />
              <h3 className="text-lg md:text-xl font-semibold">
                Instructor: {classItem.name}
              </h3>
            </div>
            <div className="flex overflow-hidden rounded-lg bg-base-200">
              <div className="flex items-center justify-center px-3 bg-primary-1 text-white">
                <BsPeopleFill className="text-2xl"></BsPeopleFill>
              </div>
              <div className="flex items-center p-2 gap-1 md:gap-2 md:p-3">
                <p className="text-lg md:text-xl font-medium">
                  {classItem.totalEnrollment}
                </p>
                <p className="text-lg md:text-xl font-medium">
                  Student Enrolled
                </p>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold">
              Fee: <span className="text-xl">$</span>
              <span className="text-2xl md:text-3xl">{classItem.price}</span>
            </h2>
          </div>
        </div>
        <div className="flex justify-between mt-2 gap-2 md:gap-24">
          <Link
            className="btn md:px-10 flex-1 md:text-lg font-medium rounded-3xl bg-primary-1 text-white hover:bg-primary-1 hover:bg-opacity-30 hover:border-primary-1 hover:border-2 hover:text-blue-700"
            to={`/payment/${classItem?._id}`}
          >
            <button>PAY NOW</button>
          </Link>
          <button className="flex-1  btn md:px-10  md:text-lg font-medium rounded-3xl border-2 bg-secondary-1 bg-opacity-30  border-secondary-1  text-pink-800 hover:bg-pink-600 hover:text-white ">
            ADD TO CART
          </button>
        </div>
      </section>
      <div className="bg-base-200 p-5 mt-8">
        <div className="">
          <h2 className="text-xl font-semibold">More Details</h2>
          <p className="mt-4 mb-8 ">{classItem?.long_description}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
