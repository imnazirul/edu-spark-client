import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role, isPending: isRoleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}
        `);
      // console.log(res);
      return res.data?.role;
    },
  });

  return { role, isRoleLoading };
};

export default useRole;
