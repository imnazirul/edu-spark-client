import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselSlider = () => {
  return (
    <Carousel
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      transitionTime={700}
    >
      <div
        className="hero h-[210px] md:h-[300px] lg:h-[500px] "
        style={{
          backgroundImage:
            "url(https://i.ibb.co/QJwfkVv/fotis-fotopoulos-Du-HKo-V44prg-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl  max-sm:space-y-1">
            {/* <h1 className="lg:mb-5 text-lg lg:text-4xl font-bold md:text-2xl font-poppins ">
                
              </h1> */}
            <h1 className="text-3xl mb-4 font-bold leading-none sm:text-5xl">
              <span className="text-white"> WEB</span>
              <span className="text-primary-1"> DEVELOPMENT</span>
            </h1>
            <p className="md:mb-5 max-sm:text-sm font-poppins lg:text-lg text-[#ffffffCC] flex flex-col">
              Unleash your creativity with courses in graphic design, covering
              essential tools like Photoshop, Illustrator, and InDesign.
            </p>
            <div className="flex gap-5 justify-center">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded bg-secondary-1 bg-opacity-80 dark:text-gray-50"
              >
                ENROLL NOW
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold  rounded text-white bg-primary-1 bg-opacity-80 border-0"
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hero h-[210px] md:h-[300px] lg:h-[500px] "
        style={{
          backgroundImage:
            "url(https://i.ibb.co/2SqpBbM/theme-photos-CGpif-H3-Fj-OA-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl  max-sm:space-y-1">
            {/* <h1 className="lg:mb-5 text-lg lg:text-4xl font-bold md:text-2xl font-poppins ">
                
              </h1> */}
            <h1 className="text-3xl mb-4 font-bold leading-none sm:text-5xl">
              <span className="text-white">GRAPHIC</span>
              <span className="text-primary-1"> DESIGN</span>
            </h1>
            <p className="md:mb-5 max-sm:text-sm font-poppins lg:text-lg text-[#ffffffCC] flex flex-col">
              Unleash your creativity with courses in graphic design, covering
              essential tools like Photoshop, Illustrator, and InDesign.
            </p>
            <div className="flex gap-5 justify-center">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded bg-secondary-1 bg-opacity-80 dark:text-gray-50"
              >
                ENROLL NOW
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold  rounded text-white bg-primary-1 bg-opacity-80 border-0"
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hero h-[210px] md:h-[300px] lg:h-[500px] "
        style={{
          backgroundImage:
            "url(https://i.ibb.co/Dg3CC4f/pexels-pixabay-38544.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl  max-sm:space-y-1">
            {/* <h1 className="lg:mb-5 text-lg lg:text-4xl font-bold md:text-2xl font-poppins ">
                
              </h1> */}
            <h1 className="text-3xl mb-4 font-bold leading-none sm:text-5xl">
              <span className="text-white">MOBILE APP</span>
              <span className="text-primary-1"> DEVELOPMENT</span>
            </h1>
            <p className="md:mb-5 max-sm:text-sm font-poppins lg:text-lg text-[#ffffffCC] flex flex-col">
              Unleash your creativity with courses in graphic design, covering
              essential tools like Photoshop, Illustrator, and InDesign.
            </p>
            <div className="flex gap-5 justify-center">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded bg-secondary-1 bg-opacity-80 dark:text-gray-50"
              >
                ENROLL NOW
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold  rounded text-white bg-primary-1 bg-opacity-80 border-0"
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hero h-[210px] md:h-[300px] lg:h-[500px] "
        style={{
          backgroundImage:
            "url(https://i.ibb.co/GvJPpkS/pexels-punchbrandstock-905163.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl  max-sm:space-y-1">
            {/* <h1 className="lg:mb-5 text-lg lg:text-4xl font-bold md:text-2xl font-poppins ">
                
              </h1> */}
            <h1 className="text-3xl mb-4 font-bold leading-none sm:text-5xl">
              <span className="text-white"> DIGITAL</span>
              <span className="text-primary-1"> MARKETING</span>
            </h1>
            <p className="md:mb-5 max-sm:text-sm font-poppins lg:text-lg text-[#ffffffCC] flex flex-col">
              Unleash your creativity with courses in graphic design, covering
              essential tools like Photoshop, Illustrator, and InDesign.
            </p>
            <div className="flex gap-5 justify-center">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded bg-secondary-1 bg-opacity-80 dark:text-gray-50"
              >
                ENROLL NOW
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold  rounded text-white bg-primary-1 bg-opacity-80 border-0"
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hero h-[210px] md:h-[300px] lg:h-[500px] "
        style={{
          backgroundImage:
            "url(https://i.ibb.co/HrY9p2J/adi-goldstein-EUs-Vw-EOsbl-E-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl  max-sm:space-y-1">
            {/* <h1 className="lg:mb-5 text-lg lg:text-4xl font-bold md:text-2xl font-poppins ">
                
              </h1> */}
            <h1 className="text-3xl mb-4 font-bold leading-none sm:text-5xl">
              <span className="text-white">CYBER</span>
              <span className="text-primary-1"> SECURITY</span>
            </h1>
            <p className="md:mb-5 max-sm:text-sm font-poppins lg:text-lg text-[#ffffffCC] flex flex-col">
              Unleash your creativity with courses in graphic design, covering
              essential tools like Photoshop, Illustrator, and InDesign.
            </p>
            <div className="flex gap-5 justify-center">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded bg-secondary-1 bg-opacity-80 dark:text-gray-50"
              >
                ENROLL NOW
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold  rounded text-white bg-primary-1 bg-opacity-80 border-0"
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hero h-[210px] md:h-[300px] lg:h-[500px] "
        style={{
          backgroundImage:
            "url(https://i.ibb.co/VTkCvdN/pexels-tranmautritam-326503.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl  max-sm:space-y-1">
            {/* <h1 className="lg:mb-5 text-lg lg:text-4xl font-bold md:text-2xl font-poppins ">
                
              </h1> */}
            <h1 className="text-3xl mb-4 font-bold leading-none sm:text-5xl">
              <span className="text-white">WEB</span>
              <span className="text-primary-1"> DESIGN</span>
            </h1>
            <p className="md:mb-5 max-sm:text-sm font-poppins lg:text-lg text-[#ffffffCC] flex flex-col">
              Unleash your creativity with courses in graphic design, covering
              essential tools like Photoshop, Illustrator, and InDesign.
            </p>
            <div className="flex gap-5 justify-center">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded bg-secondary-1 bg-opacity-80 dark:text-gray-50"
              >
                ENROLL NOW
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold  rounded text-white bg-primary-1 bg-opacity-80 border-0"
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default CarouselSlider;
