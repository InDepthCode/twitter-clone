import { Grid } from '@mui/material';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';
import Explore from '../ExploreSection/Explore';
import Profile from "../Profile/Profile.jsx";
import { Route, Routes } from 'react-router-dom';



const HomePage = () => {
  return (
    <Grid container className="min-h-screen w-full bg-white text-black">
      {/* Left Sidebar - Navigation */}
      <Grid item lg={3} className="hidden lg:block border-gray-200" sx={{ height: '100vh', position: 'fixed', overflowY: 'hidden' }}>
        <div className="sticky top-0" style={{ height: '100vh' }}>
          <Navigation />
        </div>
      </Grid>

      {/* Center Feed */}
      <Grid item xs={12} sm={10} md={8} lg={6} className="border-x border-gray-200" sx={{ ml: { lg: '250px' , width:'50%'} }}>

        <Routes>
          <Route path="/" element={<HomeSection />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

        </Routes>



      </Grid>

      {/* Right Widgets */}
      <Grid item lg={3} className="hidden lg:block px-6" sx={{height: '100vh'}}>
       <Explore />
      </Grid>
    </Grid>
  );
};

export default HomePage;