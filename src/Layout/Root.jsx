import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="overflow-x-hidden">
        <Toaster></Toaster>
        <div className="space-y-5 lg:space-y-10 mt-[70px]">
          <div className="container mx-auto font-poppins px-5 lg:px-10 ">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default Root;
