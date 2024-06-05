import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ClassCard from "../../components/ClassCard/ClassCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: classes = [],
    isPending,
    // // isError,
    // refetch,
  } = useQuery({
    queryKey: ["approvedClasses", "approved"],
    queryFn: async () => {
      const res = await axiosPublic.get("/approved_classes");
      return res.data;
    },
  });

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div>
      <SectionTitle title="ALL CLASSES"></SectionTitle>
      <div className="grid md:grid-cols-3 gap-5">
        {classes.map((sClass, index) => (
          <ClassCard key={index} SClass={sClass}></ClassCard>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
