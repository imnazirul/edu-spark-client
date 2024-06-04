import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublicMutationPost = (url) => {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post(url, data);
      console.log("user added to database", res.data);
      return res.data;
    },
  });
};

export default usePublicMutationPost;
