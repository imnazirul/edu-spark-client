/* eslint-disable react/no-unescaped-entities */
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>Error | EduSpark</title>
      </Helmet>

      <div className="container min-h-screen px-6 py-8 mx-auto flex items-center justify-center gap-8 font-poppins">
        <div className="w-full flex flex-col text-center justify-center">
          <div className="flex justify-center">
            <img
              className="max-w-80"
              src="https://i.ibb.co/5YCJxtp/Group.png"
              alt=""
            />
            s
          </div>

          <div className=" my-5 ">
            <h1 className="font-poppins  mb-3 text-2xl text-blue-600 font-semibold   md:text-3xl uppercase">
              Page not found!
            </h1>
          </div>
          <p className="mt-1 text-lg md:text-2xl max-w-3xl mx-auto">
            Sorry, the page you're looking for is unavailable. You might find
            what you're looking for by using our Navigation Menu.
          </p>

          <Link to="/">
            {" "}
            <button className="btn mt-5 px-5 text-white transition-colors duration-200 rounded-lg hover:bg-transparent hover:text-blue-500 hover:border-blue-600  bg-blue-600">
              BACK TO HOME
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
