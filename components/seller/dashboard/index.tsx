import React from "react";
import ShopInfo from "./ShopInfo";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <ShopInfo />
    </div>
  );
};

export default Dashboard;
