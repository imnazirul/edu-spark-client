import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>Error | EduSpark</title>
      </Helmet>
      <h1 className="text-5xl">error</h1>
    </div>
  );
};

export default ErrorPage;
