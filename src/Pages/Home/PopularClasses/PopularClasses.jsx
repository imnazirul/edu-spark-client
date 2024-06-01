import { useEffect, useState } from "react";
import Slider from "react-slick";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsPersonSquare } from "react-icons/bs";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("/popularclass.json")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
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
      <div className="slider-container mt-8 lg:mt-16 h-[550px]">
        <SectionTitle
          title="POPULAR COURSES"
          subtitle="Explore our top-rated courses in programming,Designing, Marketing and more. Learn from expert tutors and enhance your skills"
        ></SectionTitle>

        <Slider {...settings}>
          {classes.map((item, index) => (
            <div
              key={index}
              className="max-w-sm flex justify-between bg-base-300 border border-gray-200 rounded-lg  "
            >
              <div className="relative">
                <img
                  className="rounded-t-lg h-52 w-full"
                  src={item.image}
                  alt=""
                />
                <p className="text-white bg-secondary-1 bg-opacity-50 font-semibold inline-block px-3 py-1 absolute rounded-3xl top-2 left-1">
                  Course Fee: ${item.price}
                </p>
              </div>
              <div className="p-5 flex justify-between flex-col items-start h-[200px]">
                <a href="#">
                  <h5 className="mb-2 text-xl font-semibold tracking-tight text-secondary-1">
                    {item.title}
                  </h5>
                </a>
                <p className="mb-3 text-sm">{item.description}</p>
                <div className="flex justify-between w-full">
                  <div className="">
                    <p className="flex gap-1 items-center">
                      <FaPeopleGroup></FaPeopleGroup> Total Enrollment:
                      <span className="font-semibold"> {item.enrolment}</span>
                    </p>
                    <p className="flex gap-1 items-center font-semibold">
                      <BsPersonSquare></BsPersonSquare>
                      {item.name}
                    </p>
                  </div>
                  <button
                    href="#"
                    className="btn px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                  >
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
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default PopularClasses;
