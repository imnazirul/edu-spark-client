import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ClassCard from "../../components/ClassCard/ClassCard";

const AllClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("/Classes.json")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

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
