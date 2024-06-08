import Slider from "react-slick";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaPeopleGroup } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";

import { Link } from "react-router-dom";

const PopularClasses = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: classes = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popular_classes");
      return res.data;
    },
  });

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="slider-container mt-8 lg:mt-16 ">
        <SectionTitle
          title="POPULAR COURSES"
          subtitle="Explore our top-rated courses in programming,Designing, Marketing and more. Learn from expert tutors and enhance your skills"
        ></SectionTitle>

        {isError ? (
          <div className="h-[50vh] flex items-center justify-center">
            <h1 className="text-5xl text-center">Data Not Found!</h1>
          </div>
        ) : (
          <Slider {...settings}>
            {classes.map((item, index) => (
              <div
                key={index}
                className=" flex justify-between bg-base-300 border-4 border-base-100 h-[410px] rounded-xl  "
              >
                <div className="h-full border rounded-xl overflow-hidden">
                  <div className="relative">
                    <img
                      className="rounded-t-lg object-cover h-52 w-full"
                      src={item?.image}
                      alt=""
                    />
                    <p className="text-white bg-secondary-1 bg-opacity-50 font-semibold inline-block px-3 py-1 absolute rounded-3xl top-2 left-1">
                      Course Fee: ${item?.price}
                    </p>
                  </div>
                  <div className="p-2 py-3 md:p-5 flex justify-between flex-col items-start">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-semibold tracking-tight text-secondary-1">
                        {item?.title}
                      </h5>
                    </a>
                    <p className="mb-3 text-sm">{item?.short_description}</p>
                    <div className="flex justify-between  w-full">
                      <div className="">
                        <p className="flex gap-1 text-sm items-center">
                          <FaPeopleGroup></FaPeopleGroup> Total Enrollment:
                          <span className="font-semibold">
                            {" "}
                            {item?.totalEnrollment}
                          </span>
                        </p>
                        <p className="flex gap-1 text-sm items-center font-semibold">
                          <img
                            className="w-7 h-7 rounded-full object-cover"
                            src={item?.teacherImg}
                            alt=""
                          />
                          {item?.name}
                        </p>
                      </div>

                      <div className="">
                        <Link to={`/class_details/${item?._id}`}>
                          {" "}
                          <button className="btn px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default PopularClasses;
