import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const MyClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], isPending } = useQuery({
    queryKey: ["teacherClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher_classes/${user?.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/001/937/601/original/online-education-application-learning-worldwide-on-computer-mobile-website-background-social-distance-concept-the-classroom-training-course-library-illustration-flat-vector.jpg')]">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold font-poppins underline mb-4">
        YOUR CLASSES
      </h1>

      <div className="grid grid-cols-2 items-center gap-5">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="flex glass card flex-col items-center justify-start max-w-3xl  border border-gray-200 rounded-lg shadow md:flex-row  bg-base-300 bg-blend-overlay bg-opacity-20"
          >
            <div className="h-full overflow-hidden w-72 rounded-xl p-5">
              <img
                className="object-cover w-full h-40 rounded-xl  "
                src={classItem.image}
                alt=""
              />
            </div>
            <div className="flex flex-col max-sm:items-center px-3">
              <h2 className="mb-2 text-2xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-gray-700 to-gray-900 font-bold tracking-tight max-sm:text-center">
                {classItem.title}
              </h2>
              <p className="mb-3 font-normal text-white  ">{classItem.name}</p>
              <div className="flex gap-5 pb-4">
                {" "}
                <button className="btn bg-blue-900 hover:bg-transparent border-blue-900 hover:border-blue-900 hover:scale-105 transition duration-300 text-white  text-lg font-medium ">
                  Update
                </button>
                <button className="btn text-white text-lg border-2 border-blue-900 hover:bg-blue-900 hover:border-blue-900   bg-transparent  hover:scale-105 transition duration-300">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
