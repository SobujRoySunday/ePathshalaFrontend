import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
};

export default Layout;
