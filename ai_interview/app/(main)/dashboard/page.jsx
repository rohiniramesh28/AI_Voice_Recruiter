"use client";

import React from 'react';
import WelcomeContainer from './_components/WelcomeContainer';
import CreateOptions from './_components/CreateOptions';
import LatestInterviewsList from './_components/LatestInterviewsList';

function Dashboard() {
  return (
    <div >
      {/* Optional Welcome Section */}
      {/* <WelcomeContainer /> */}

      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>

      {/* Options to create something (interview, etc.) */}
      <CreateOptions />

      {/* Recent interviews or activity */}
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
