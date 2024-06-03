import { useEffect, useState } from "react";

const MyEnrollClass = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    fetch("/myenroll.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEnrolledClasses(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 my-8">
      {enrolledClasses.map((enrolledClass, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-start max-w-3xl  border border-gray-200 rounded-lg shadow md:flex-row  bg-gradient-to-r  from-blue-500 to-blue-800 bg-base-300 bg-blend-overlay bg-opacity-20"
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
              <button className="btn bg-blue-900 hover:bg-transparent border-blue-900 hover:border-blue-900 hover:scale-105 transition duration-300 text-white  text-lg font-medium ">
                Continue Class
              </button>
              <button className="btn text-white text-lg border-2 border-blue-900 hover:bg-blue-900 hover:border-blue-900   bg-transparent  hover:scale-105 transition duration-300">
                Outline
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEnrollClass;
