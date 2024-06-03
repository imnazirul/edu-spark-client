import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublicMutationPost = (url) => {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post(url, data);
      return res.data;
    },
  });
};

export default usePublicMutationPost;
