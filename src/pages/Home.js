import React from "react";
import DashInfo from "../components/DashInfo";
import MainCalendar from "../components/MainCalendar";
import Message from "../components/Message";

const Home = () => {
  return (
    <div className="columns">
      <div className="column is-6">
        <DashInfo />
        <Message />
      </div>
      <div className="column is-6">
        <MainCalendar />
      </div>
    </div>
  );
};

export default Home;
