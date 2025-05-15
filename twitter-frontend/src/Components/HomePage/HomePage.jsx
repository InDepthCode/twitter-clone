import { Grid } from '@mui/material';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';
import Explore from '../ExploreSection/Explore';

const HomePage = () => {
  return (
    <Grid container className="min-h-screen w-full bg-white text-black">
      {/* Left Sidebar - Navigation */}
      <Grid item lg={3} className="hidden lg:block border-gray-200" sx={{ minHeight: '100vh' }}> {/* Added minHeight */}
        <div className="sticky top-0 overflow-y-auto"> {/* Removed min-h-screen from here */}
          <Navigation />
        </div>
      </Grid>

      {/* Center Feed */}
      <Grid item xs={12} sm={10} md={8} lg={6} className="border-x border-gray-200">
        <HomeSection />
      </Grid>

      {/* Right Widgets */}
      <Grid item lg={3} className="hidden lg:block px-6">
       <Explore />
      </Grid>
    </Grid>
  );
};

export default HomePage;