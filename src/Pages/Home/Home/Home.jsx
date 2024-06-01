import PopularClasses from "../PopularClasses/PopularClasses";
import Banner from "../Banner/Banner";
import StudentFeedback from "../StudentFeedback/StudentFeedback";
import UserStats from "../UserStats/UserStats";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <UserStats></UserStats>
      <StudentFeedback></StudentFeedback>
    </>
  );
};

export default Home;
