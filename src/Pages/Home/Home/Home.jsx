import PopularClasses from "../PopularClasses/PopularClasses";
import Banner from "../Banner/Banner";
import StudentFeedback from "../StudentFeedback/StudentFeedback";
import UserStats from "../UserStats/UserStats";
import BecomeInstructor from "../BecomeInstructor/BecomeInstructor";
import EduArticles from "../EduArticles/EduArticles";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <UserStats></UserStats>
      <BecomeInstructor></BecomeInstructor>
      <EduArticles></EduArticles>
      <StudentFeedback></StudentFeedback>
    </>
  );
};

export default Home;
