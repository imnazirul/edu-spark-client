import { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const UserStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = (visibility) => {
    if (visibility) {
      setIsVisible(true);
    }
  };

  return (
    <>
      <section className=" ">
        <div className="max-w-6xl px-6 py-10 mx-auto">
          <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

            <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
              <img
                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                src="https://i.ibb.co/vw54wqG/pexels-mikael-blomkvist-6476590.jpg"
                alt="client photo"
              />

              <div className="mt-2 flex-1 flex gap-5 flex-col md:mx-6">
                <div className="flex items-center justify-between bg-secondary-1 brightness-110 text-white px-4 py-2 rounded-md">
                  <div className="text-xl font-bold"></div>
                  <div className="flex items-center">
                    <div className="text-4xl font-bold">
                      {isVisible && (
                        <CountUp
                          start={0}
                          end={31256}
                          duration={2.75}
                          separator=" "
                          decimal=","
                          onEnd={() => console.log("Ended! 👏")}
                          onStart={() => console.log("Started! 💨")}
                        >
                          {({ countUpRef, start }) => (
                            <div>
                              <span ref={countUpRef} />
                              <button onClick={start}></button>
                            </div>
                          )}
                        </CountUp>
                      )}{" "}
                      Total Users
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-secondary-1 brightness-110 text-white px-4 py-2 rounded-md">
                  <div className="flex items-center">
                    <VisibilitySensor onChange={handleVisibility}>
                      <div className="text-4xl font-bold">
                        {isVisible && (
                          <CountUp
                            start={0}
                            end={1897}
                            duration={2.75}
                            separator=" "
                            decimal=","
                            onEnd={() => console.log("Ended! 👏")}
                            onStart={() => console.log("Started! 💨")}
                          >
                            {({ countUpRef, start }) => (
                              <div>
                                <span ref={countUpRef} />
                                <button onClick={start}></button>
                              </div>
                            )}
                          </CountUp>
                        )}
                        Total Classes
                      </div>
                    </VisibilitySensor>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-secondary-1 brightness-110 text-white px-4 py-2 rounded-md">
                  <div className="text-xl font-bold"></div>

                  <div className="flex items-center">
                    <div className="text-4xl font-bold">
                      {isVisible && (
                        <CountUp
                          start={0}
                          end={13569}
                          duration={2.75}
                          separator=" "
                          decimal=","
                          onEnd={() => console.log("Ended! 👏")}
                          onStart={() => console.log("Started! 💨")}
                        >
                          {({ countUpRef, start }) => (
                            <div>
                              <span ref={countUpRef} />
                              <button onClick={start}></button>
                            </div>
                          )}
                        </CountUp>
                      )}
                      Total Enrollment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default UserStats;
