import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const RootLayout = () => {
    return (
        <div className="max-w-11/12 mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default RootLayout;