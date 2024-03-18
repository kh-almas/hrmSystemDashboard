import React, {Fragment, useContext} from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./common/footer";
import Header from "./common/header-component/header";
import RightSidebar from "./common/right-sidebar";
import Sidebar from "./common/sidebar-component/sidebar";
import ThemeCustomizer from "./common/theme-customizer";
// import Loader from "./common/loader";
import { Outlet } from "react-router-dom";
import "../assets/index.css";
import {SelectContext} from "./Provider/CustomSelectProvider";

const AppLayout = (props) => {
  const {modalRefForAddProductInInventory} = useContext(SelectContext);
  return (
    <Fragment>
      {/* <Loader /> */}
      <Header />
      <div className="page-wrapper"  ref={modalRefForAddProductInInventory}>
        <div className="page-body-wrapper">
          <Sidebar />
          <RightSidebar />
          <div className="page-body mt-0">
            <Outlet />
          </div>
          <Footer />
          {/*<ThemeCustomizer />*/}
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AppLayout;
