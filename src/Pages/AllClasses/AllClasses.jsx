import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ClassCard from "../../components/ClassCard/ClassCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import useEnrolledClassIds from "../../CustomHooks/useEnrolledClassIds";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const { isIdsPending } = useEnrolledClassIds();
  const {
    data: classes = [],
    isPending,
    isError,
    // refetch,
  } = useQuery({
    queryKey: ["approvedClasses", "approved"],
    queryFn: async () => {
      const res = await axiosPublic.get("/approved_classes");
      return res.data;
    },
  });

  if (isPending || isIdsPending) {
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
    <div>
      <Helmet>
        <title>All Classes | EduSpark</title>
      </Helmet>
      <SectionTitle title="ALL CLASSES"></SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((sClass, index) => (
          <ClassCard key={index} SClass={sClass}></ClassCard>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
