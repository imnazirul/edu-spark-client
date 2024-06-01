import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PopularCategories = () => {
  return (
    <div className="mt-8 lg:mt-16">
      <SectionTitle
        title="TOP CATEGORIES"
        subtitle="Pick the Right category and Build your career"
      ></SectionTitle>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-base-200 p-3 hover:scale-105 transition cursor-pointer duration-300 rounded-lg">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 512 512"
            >
              <g>
                <path
                  d="m497 31h-482c-8.401 0-15 6.599-15 15v420c0 8.401 6.599 15 15 15h482c8.401 0 15-6.599 15-15v-420c0-8.401-6.599-15-15-15z"
                  fill="#edf5ff"
                ></path>
                <path
                  d="m512 46v420c0 8.401-6.599 15-15 15h-241v-450h241c8.401 0 15 6.599 15 15z"
                  fill="#d5e8fe"
                ></path>
                <path
                  d="m436 151h-180-180c-8.401 0-15 6.599-15 15v240c0 8.401 6.599 15 15 15h180 180c8.401 0 15-6.599 15-15v-240c0-8.401-6.599-15-15-15z"
                  fill="#6aa9ff"
                ></path>
                <path
                  d="m451 166v240c0 8.401-6.599 15-15 15h-180v-270h180c8.401 0 15 6.599 15 15z"
                  fill="#4895ff"
                ></path>
                <circle cx="436" cy="106" fill="#e63950" r="15"></circle>
                <circle cx="376" cy="106" fill="#4895ff" r="15"></circle>
                <circle cx="316" cy="106" fill="#4895ff" r="15"></circle>
                <path
                  d="m318.52 324.32c-4.6-6.899-2.739-16.201 4.16-20.801l26.279-17.519-26.279-17.52c-6.899-4.6-8.76-13.901-4.16-20.801 4.585-6.899 13.843-8.76 20.801-4.16l45 30c4.175 2.783 6.68 7.471 6.68 12.48s-2.505 9.697-6.68 12.48l-45 30c-7.02 4.654-16.281 2.633-20.801-4.159z"
                  fill="#d5e8fe"
                ></path>
                <path
                  d="m172.68 328.48-45-30c-4.175-2.783-6.68-7.471-6.68-12.48s2.505-9.697 6.68-12.48l45-30c6.899-4.6 16.201-2.739 20.801 4.16s2.739 16.201-4.16 20.801l-26.28 17.519 26.279 17.52c6.899 4.6 8.76 13.901 4.16 20.801-4.521 6.793-13.785 8.81-20.8 4.159z"
                  fill="#edf5ff"
                ></path>
                <path
                  d="m256 91h-180c-8.291 0-15 6.709-15 15s6.709 15 15 15h180c8.291 0 15-6.709 15-15s-6.709-15-15-15z"
                  fill="#5f55af"
                ></path>
                <path
                  d="m271 106c0-8.291-6.709-15-15-15v30c8.291 0 15-6.709 15-15z"
                  fill="#453d83"
                ></path>
                <path
                  d="m292.709 212.582c-7.412-3.706-16.392-.688-20.127 6.709l-16.582 33.164-43.418 86.836c-3.706 7.412-.703 16.421 6.709 20.127 7.48 3.715 16.436.652 20.127-6.709l16.582-33.164 43.418-86.836c3.706-7.412.703-16.421-6.709-20.127z"
                  fill="#edf5ff"
                ></path>
                <path
                  d="m292.709 212.582c-7.412-3.706-16.392-.688-20.127 6.709l-16.582 33.164v67.09l43.418-86.836c3.706-7.412.703-16.421-6.709-20.127z"
                  fill="#d5e8fe"
                ></path>
              </g>
            </svg>
            <h3 className="text-xl text-secondary-1f font-semibold">
              WEB DEVELOPMENT
            </h3>
            <button className=" btn-xs mt-2 bg-secondary-1 text-white">
              SEE COURSES
            </button>
          </div>
        </div>
        <div className="bg-base-200 p-3 hover:scale-105 transition cursor-pointer duration-300 rounded-lg">
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12"
              src="https://i.ibb.co/b2m0Yww/app-development.png"
              alt=""
            />
            <h3 className="text-xl text-secondary-1f font-semibold">
              APP DEVELOPMENTS
            </h3>
            <button className=" btn-xs mt-2 bg-secondary-1 text-white">
              SEE COURSES
            </button>
          </div>
        </div>
        <div className="bg-base-200 p-3 hover:scale-105 transition cursor-pointer duration-300 rounded-lg">
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12"
              src="https://i.ibb.co/KXv7y20/ui-ux.png"
              alt=""
            />
            <h3 className="text-xl text-secondary-1f font-semibold">
              UI/UX DESIGN
            </h3>
            <button className=" btn-xs mt-2 bg-secondary-1 text-white">
              SEE COURSES
            </button>
          </div>
        </div>
        <div className="bg-base-200 p-3 hover:scale-105 transition cursor-pointer duration-300 rounded-lg">
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12"
              src="https://i.ibb.co/sJv2Lyg/cyber-security.png"
              alt=""
            />
            <h3 className="text-xl text-secondary-1f font-semibold">
              CYBER SECURITY
            </h3>
            <button className=" btn-xs mt-2 bg-secondary-1 text-white">
              SEE COURSES
            </button>
          </div>
        </div>
        <div className="bg-base-200 p-3 hover:scale-105 transition cursor-pointer duration-300 rounded-lg">
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12"
              src="https://i.ibb.co/xL3fPYk/illustration.png"
              alt=""
            />
            <h3 className="text-xl text-secondary-1f font-semibold">
              GRAPHICS DESIGN
            </h3>
            <button className=" btn-xs mt-2 bg-secondary-1 text-white">
              SEE COURSES
            </button>
          </div>
        </div>
        <div className="bg-base-200 p-3 hover:scale-105 transition cursor-pointer duration-300 rounded-lg">
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12"
              src="https://i.ibb.co/9q5cCsS/promote.png"
              alt=""
            />
            <h3 className="text-xl text-secondary-1f font-semibold">
              DIGITAL MARKETING
            </h3>
            <button className=" btn-xs mt-2 bg-secondary-1 text-white">
              SEE COURSES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
