import { Grid } from '@mui/material';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';

const HomePage = () => {
  return (
    <Grid container className="min-h-screen w-full bg-white text-black">
      {/* Left Sidebar - Navigation */}
      <Grid item lg={3} className="hidden lg:block border-gray-200">
        <div className="sticky top-0 min-h-screen overflow-y-auto">
          <Navigation />
        </div>
      </Grid>

      {/* Center Feed */}
      <Grid item xs={12} sm={10} md={8} lg={6} className="border-x border-gray-200">
        <HomeSection />
      </Grid>

      {/* Right Widgets */}
      <Grid item lg={3} className="hidden lg:block px-6">
        New Widget Coming soon..
      </Grid>
    </Grid>
  );
};

export default HomePage;
