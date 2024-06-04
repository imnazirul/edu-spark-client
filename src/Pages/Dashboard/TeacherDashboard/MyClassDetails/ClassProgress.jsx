const ClassProgress = () => {
  return (
    <>
      <section className="p-6 my-6 font-poppins bg-base-300 rounded-xl">
        <div className="container grid grid-cols-1  mx-auto md:grid-cols-2 gap-5">
          <div className="flex border bg-base-100  p-3 rounded-lg items-center gap-5">
            <div className="">
              <img
                className="w-28 h-28"
                src="https://i.ibb.co/mCknyzc/laptop.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold ">1000</p>
              <p className="capitalize font-semibold text-lg">
                TOTAL ENROLLED STUDENTS
              </p>
            </div>
          </div>
          <div className="flex border bg-base-100  p-3 rounded-lg items-center gap-5">
            <div className="">
              <img
                className="w-28 h-28"
                src="https://i.ibb.co/qD4fcqR/training.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold ">10</p>
              <p className="capitalize font-semibold text-lg">ASSIGNMENTS</p>
            </div>
          </div>
          <div className="flex border bg-base-100  p-3 rounded-lg items-center gap-5">
            <div className="">
              <img
                className="w-28 h-28"
                src="https://i.ibb.co/c8ndc38/notification.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold ">79</p>
              <p className="capitalize font-semibold text-lg">
                ASSIGNMENT SUBMISSION PER DAY
              </p>
            </div>
          </div>
          <div className="flex border bg-base-100  p-3 rounded-lg items-center gap-5">
            <div className="">
              <img
                className="w-28 h-28"
                src="https://i.ibb.co/8dDzkP1/graph.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold ">79%</p>
              <p className="capitalize font-semibold text-lg">
                ASSIGNMENT SUBMISSION RATE
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassProgress;
