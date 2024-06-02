import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: userInfo = [],
    isPending,
    // isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: Boolean(user?.email),
  });

  if (isPending) {
    return <h1 className="text-xl text-center mt-16">Loading...</h1>;
  }

  return (
    <>
      <div className="w-full  px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-base-100 w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="..."
                    src={user?.photoURL}
                    className="shadow-xl w-28 rounded-full h-auto align-middle border-4 border-primary-1  "
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center mt-5">
                <h1 className="text-3xl font-bold block uppercase tracking-wide text-blueGray-600">
                  {user?.displayName}
                </h1>
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  ({userInfo?.role})
                </span>
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      22
                    </span>
                    <span className="text-sm text-blueGray-400">Friends</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-sm text-blueGray-400">Photos</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      89
                    </span>
                    <span className="text-sm text-blueGray-400">Comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                Email: {userInfo?.email}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                Phone: {user?.phoneNumber || "Not Available"}
              </div>
              <div className="flex justify-between items-center mt-8">
                <p className="mb-2 text-blueGray-600 ">
                  Account Created - {user?.metadata?.creationTime}
                </p>
                <p className="mb-2 text-blueGray-600">
                  Last Sign In - {user?.metadata?.lastSignInTime}
                </p>
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    An artist of considerable range, Jenna the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
                  </p>
                  <a
                    href="javascript:void(0);"
                    className="font-normal text-pink-500"
                  >
                    Show more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
