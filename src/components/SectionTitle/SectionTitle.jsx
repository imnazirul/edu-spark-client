/* eslint-disable react/prop-types */
const SectionTitle = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold font-poppins">
        {title}
      </h1>
      <p className="text-sm md:text-lg text-center max-w-3xl mx-auto mt-3 mb-4 font-poppins">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;
