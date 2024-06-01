import PopularClasses from "../PopularClasses/PopularClasses";
import Banner from "../Banner/Banner";
import StudentFeedback from "../StudentFeedback/StudentFeedback";
import UserStats from "../UserStats/UserStats";
import BecomeInstructor from "../BecomeInstructor/BecomeInstructor";
import EduArticles from "../EduArticles/EduArticles";
import PopularCategories from "../PopularCategories/PopularCategories";
import NewsLetter from "../NewsLetter/NewsLetter";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <UserStats></UserStats>
      <BecomeInstructor></BecomeInstructor>
      <EduArticles></EduArticles>
      <StudentFeedback></StudentFeedback>
      <PopularCategories></PopularCategories>
      <NewsLetter></NewsLetter>
    </>
  );
};

export default Home;
