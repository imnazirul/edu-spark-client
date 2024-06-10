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
      {isPending || isIdsPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-5 lg:gap-10">
          <div className="flex flex-col gap-3 md:gap-6 border p-5 rounded-xl">
            <div className="skeleton h-60 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <hr className="" />
            <div className="skeleton h-8 w-20"></div>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 border p-5 rounded-xl">
            <div className="skeleton h-60 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <hr className="" />
            <div className="skeleton h-8 w-20"></div>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 border p-5 rounded-xl">
            <div className="skeleton h-60 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <hr className="" />
            <div className="skeleton h-8 w-20"></div>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 border p-5 rounded-xl">
            <div className="skeleton h-60 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <hr className="" />
            <div className="skeleton h-8 w-20"></div>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 border p-5 rounded-xl">
            <div className="skeleton h-60 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <hr className="" />
            <div className="skeleton h-8 w-20"></div>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 border p-5 rounded-xl">
            <div className="skeleton h-60 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <hr className="" />
            <div className="skeleton h-8 w-20"></div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((sClass, index) => (
            <ClassCard key={index} SClass={sClass}></ClassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClasses;
