import { Grid } from '@mui/material';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';

const HomePage = () => {
  return (
    <Grid container className="px-5 lg:px-36 justify-between">
      {/* Left Part: Navigation (only on large screens) */}
      <Grid
        item
        lg={3}
        className="hidden lg:block relative"
      >
        <Navigation />
      </Grid>

      {/* Middle Part */}
      <Grid
        item
        xs={12}
        lg={6}
        className="relative"
      >
        <HomeSection />
      </Grid>

      {/* Right Part: only on large screens */}
      <Grid
        item
        lg={3}
        className="hidden lg:block relative"
      >
        <HomeSection />
      </Grid>
    </Grid>
  );
};

export default HomePage;