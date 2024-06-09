import { Link } from "react-router-dom";

const BecomeInstructor = () => {
  return (
    <>
      <section className="bg-base-200 mt-8 lg:mt-16">
        <div className="container flex flex-col justify-center lg:p-6 mx-auto sm:py-8 lg:py-12 md:flex-row lg:justify-between p-3 ">
          <div className="flex items-center justify-center lg:p-6 md:mt-8 lg:mt-0">
            <img
              src="https://i.ibb.co/vdd8cN3/3d-minimal-self-development-concept-self-learning-concept-reading-a-book-to-get-a-new-idea-knowledge.webp"
              alt=""
              className="object-contain  lg:h-96 xl:h-112 "
            />
          </div>
          <div className="flex flex-col justify-center md:p-6 text-center rounded-sm  lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-none sm:text-6xl">
              BECOME AN
              <span className="text-primary-1 brightness-110"> INSTRUCTOR</span>
            </h1>
            <p className="mt-6 mb-8 md:text-lg sm:mb-12">
              Empower others through expertise. Join us to share knowledge,
              <br className="hidden md:inline lg:hidden" />
              inspire minds, and shape the future. Become a valued instructor
              today!{" "}
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 bg-base-200 sm:space-x-4 lg:justify-start">
              <Link
                className="px-8 py-3 md:text-lg md:font-semibold rounded  bg-secondary-1 filter mb-2 brightness-125 text-white"
                to="teach_on_edu_spark"
              >
                START TEACHING TODAY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BecomeInstructor;
