import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: role = "unknown", isPending: isRoleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${user?.email}
        `);
      // console.log(res);
      return res.data?.role;
    },
  });

  return { role, isRoleLoading };
};

export default useRole;
