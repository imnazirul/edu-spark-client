/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const MyEnrollClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: enrolledClasses,
    isPending,
    // refetch,
  } = useQuery({
    queryKey: ["myEnrolledClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my_enrolled_classes/${user?.email}`);
      // console.log(res.data, enrolledClassIds);
      return res.data;
    },
  });

  if (isPending) {
    return <h1 className="text-5xl text-center-mt-10">Loading...</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 mb-8">
      {enrolledClasses.length === 0 ? (
        <div className="h-[70vh] flex items-center justify-center">
          <h1 className="text-4xl font-semibold text-center">
            YOU DIDN'T ENROLLED ANY CLASSES
          </h1>
        </div>
      ) : (
        enrolledClasses.map((enrolledClass, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start max-w-5xl  border border-gray-200 rounded-lg shadow md:flex-row  bg-gradient-to-r  from-blue-700 to-blue-400 bg-base-300 bg-blend-overlay bg-opacity-20"
          >
            <div className="h-full overflow-hidden w-72 rounded-xl p-5">
              <img
                className="object-cover w-full h-40 rounded-xl  "
                src={enrolledClass.image}
                alt=""
              />
            </div>
            <div className="flex flex-col max-sm:items-center px-3">
              <h2 className="mb-2 text-2xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-gray-700 to-gray-900 font-bold tracking-tight max-sm:text-center">
                {enrolledClass.title}
              </h2>
              <p className="mb-3 font-normal text-white  ">
                {enrolledClass.name}
              </p>
              <div className="flex gap-5 pb-4">
                {" "}
                <Link to={`/dashboard/my_enrolled_class/${enrolledClass._id}`}>
                  <button className="btn bg-blue-900 hover:bg-transparent border-blue-900 hover:border-blue-900 hover:scale-105 transition duration-300 text-white  text-lg font-medium ">
                    Continue Class
                  </button>
                </Link>
                <button className="btn text-white text-lg border-2 border-blue-900 hover:bg-blue-900 hover:border-blue-900   bg-transparent  hover:scale-105 transition duration-300">
                  Outline
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyEnrollClass;
