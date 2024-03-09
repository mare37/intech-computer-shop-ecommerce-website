import style from "./MainLayout.module.scss"


import Navbar from "./Navbar/Navbar";

import Sidebar from "./Sidebar/Sidebar";

import Popup from "./popup";
import Spinner from "./Spinner/spinner";
import OrderItem from "./OrderItem/orderitem";
import Enquiry from "./Components/Enquiry/enquiry";

import Loading from "./Loading/loading";

import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className={style.mainLayOut} >
      <Navbar />

      <Sidebar />

      <Popup />

      <Spinner/>
      <OrderItem/>
      <Enquiry/>
      

    

      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
