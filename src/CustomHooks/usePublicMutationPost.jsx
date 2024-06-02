import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import toast from "react-hot-toast";

const usePublicMutationPost = (url) => {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post(url, data);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.insertedId) {
        toast.success("");
      }
    },
    onError: (err) => console.log(err),
  });
};

export default usePublicMutationPost;
