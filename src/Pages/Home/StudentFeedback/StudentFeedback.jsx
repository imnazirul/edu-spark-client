import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ReactStars from "react-rating-stars-component";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const StudentFeedback = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: feedbacks = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
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
        breakpoint: 768,
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

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div className=" mt-8 lg:mt-16 ">
      <SectionTitle
        title="STUDENT FEEDBACK"
        subtitle="Rate your experience and provide feedback. Your input helps us improve our services and enhance your learning journey."
      ></SectionTitle>
      {isError ? (
        <div className="h-[50vh] flex items-center justify-center">
          <h1 className="text-5xl text-center">Data Not Found!</h1>
        </div>
      ) : (
        <div className="slider-container  relative">
          {" "}
          <Slider
            className="flex"
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {feedbacks.map((feedback, index) => (
              <div
                key={index}
                className=" flex border-[5px] border-base-100 justify-between h-80  relative rounded-xl font-poppins  "
              >
                <div className="border h-full p-3 rounded-xl">
                  <div className=" flex ">
                    <div className="relative">
                      <img
                        className="w-16 h-16 object-cover rounded-full border-2 border-blue-500"
                        src={feedback.studentImg}
                        alt=""
                      />
                      <img
                        className="w-4 h-4 absolute top-0 right-0"
                        src="https://rhoomy.smartdemowp.com/wp-content/themes/rhoomy/assets/images/verified.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-secondary-1 font-bold ml-3 text-lg md:text-xl">
                        {feedback.studentName}
                      </p>
                      <p className="text-primary-1 text-sm md:font-semibold ml-3">
                        Student
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mt-2">
                    Class: {feedback.className}
                  </h3>
                  <div className="flex gap-2">
                    <ReactStars
                      value={feedback.rating}
                      size={30}
                      isHalf={true}
                      edit={false}
                      activeColor="#FFD700"
                    />{" "}
                    <div className="flex items-center">
                      (<p className="text-lg font-medium">{feedback.rating}</p>{" "}
                      <StarRoundedIcon
                        sx={{ color: "gold", fontSize: "25px" }}
                      ></StarRoundedIcon>
                      )
                    </div>
                  </div>

                  <div className="text-2xl my-2 flex gap-1 justify-center text-[#FFD700]"></div>
                  <p className="max-sm:text-sm my-2">{feedback.description}</p>
                  <h1 className="text-xl md:text-2xl text-primary-1 font-bold text-center"></h1>
                </div>
              </div>
            ))}
          </Slider>
          <button
            className="btn absolute left-2 bg-opacity-40 top-[50%] rounded-full outline-none"
            onClick={previous}
          >
            <IoIosArrowBack></IoIosArrowBack>
          </button>{" "}
          <button
            className="btn absolute right-2 bg-opacity-40 top-[50%] rounded-full outline-none"
            onClick={next}
          >
            <IoIosArrowForward></IoIosArrowForward>
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentFeedback;
