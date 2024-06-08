import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useEnrolledClassIds = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: enrolledClassIds = [],
    isPending: isIdsPending,
    refetch,
  } = useQuery({
    queryKey: ["enrolledClass", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/enrolled_classes_ids/${user?.email}`);

      return res.data;
    },
  });

  return { enrolledClassIds, isIdsPending, refetch };
};

export default useEnrolledClassIds;
