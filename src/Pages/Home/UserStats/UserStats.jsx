import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";

const UserStats = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: webStats = {},
    isPending,
    isError,
  } = useQuery({
    queryKey: ["site_data"],
    queryFn: async () => {
      const res = await axiosPublic("/total_site_data");
      return res.data;
    },
  });

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  if (isError) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <h1 className="text-5xl text-center">Data Not Found!</h1>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="max-w-6xl md:px-6 py-10 mx-auto">
          <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

            <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl  md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
              <img
                className="h-48 max-sm:w-full md:mx-6 rounded-xl object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                src="https://i.ibb.co/vw54wqG/pexels-mikael-blomkvist-6476590.jpg"
                alt="client photo"
              />

              <div className="mt-2 flex-1 flex gap-5 flex-col md:mx-6">
                <div className="flex items-center justify-between bg-secondary-1 brightness-110 text-white px-4 py-2 rounded-md">
                  <div className="text-xl font-bold"></div>
                  <div className="flex items-center">
                    <div className="text-2xl md:text-3xl  lg:text-4xl md:font-semibold lg:font-bold">
                      {webStats.totalUser}
                      <p>Total Users</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-secondary-1 brightness-110 text-white px-4 py-2 rounded-md">
                  <div className="flex items-center">
                    <div className="text-2xl md:text-3xl  lg:text-4xl md:font-semibold lg:font-bold">
                      {webStats.totalClasses}

                      <p> Total Classes</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-secondary-1 brightness-110 text-white px-4 py-2 rounded-md">
                  <div className="text-xl font-bold"></div>

                  <div className="flex items-center">
                    <div className="text-2xl md:text-3xl  lg:text-4xl md:font-semibold lg:font-bold">
                      {webStats.totalEnrollment}

                      <p> Total Enrollment</p>
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
