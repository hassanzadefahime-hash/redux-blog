
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom";




const MainLayout = () => {
  return (
    <>
            <div className="bg-gray-100 flex flex-col min-h-screen">
        <Navbar />
            <div className="md:p-auto px-3">
                <Outlet />
            </div>
            <Footer />
        </div>
    </>
  );
};

export default MainLayout;

