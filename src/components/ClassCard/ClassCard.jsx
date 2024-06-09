/* eslint-disable react/prop-types */

import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useEnrolledClassIds from "../../CustomHooks/useEnrolledClassIds";
import useAuth from "../../CustomHooks/useAuth";

const ClassCard = ({ SClass }) => {
  const { enrolledClassIds } = useEnrolledClassIds();
  const { user } = useAuth();

  return (
    <>
      <div className=" pb-5 bg-base-100  border rounded-lg  ">
        <div className="relative">
          <img
            className="rounded-t-lg object-cover h-52 w-full"
            src={SClass.image}
            alt=""
          />
          <p className="text-white bg-secondary-1 bg-opacity-50 font-semibold inline-block px-3 py-1 absolute rounded-3xl top-2 left-1">
            Course Fee: ${SClass.price}
          </p>
        </div>
        <div className="p-2 md:p-5 flex justify-between flex-col items-start ">
          <h5 className="mb-1 text-xl font-semibold tracking-tight text-secondary-1">
            {SClass.title}
          </h5>
          <p className="flex  mb-1 gap-1 items-center text-sm">
            <FaPeopleGroup></FaPeopleGroup> Total Enrollment:
            <span className="font-semibold"> {SClass.totalEnrollment}</span>
          </p>
          <p className="mb-3 text-sm">{SClass.short_description}</p>
          <div className="flex justify-between items-center w-full">
            <div className="">
              <p className="flex gap-1 items-center max-sm:text-sm font-semibold">
                <img
                  className="w-7 h-7 rounded-full object-cover"
                  src={SClass.teacherImg}
                  alt=""
                />
                {SClass.name}
              </p>
            </div>
            <div>
              {user ? (
                <>
                  {enrolledClassIds.find((id) => {
                    console.log(id == SClass._id, id, SClass._id);
                    return id == SClass._id;
                  }) ? (
                    <button className="btn   text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                      Already Enrolled
                    </button>
                  ) : (
                    <Link to={`/class_details/${SClass._id}`}>
                      {" "}
                      <button className="btn  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                        Enroll Now
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>
                    </Link>
                  )}
                </>
              ) : (
                <Link to={`/class_details/${SClass._id}`}>
                  {" "}
                  <button className="btn max-sm:btn-sm  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    Enroll Now
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
