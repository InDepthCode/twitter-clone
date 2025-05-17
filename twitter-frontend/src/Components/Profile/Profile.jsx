import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import {Box, IconButton, Typography} from '@mui/material'; // Import Box for layout
import bannerimg from '../../assets/banner.jpg';

const Profile = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <Box>
      <Box
        className="z-50 flex items-center sticky top-0 bg-white bg-opacity-95 border-b border-gray-200 p-1 w-100%"
        sx={{ justifyContent: 'flex-start' , ml:0.2, mt:2}} // Align back button and title to the start
      >
        <IconButton onClick={handleBack} sx={{mr:0}}>
          <ArrowBackIcon className="cursor-pointer text-gray-800" />
        </IconButton>
        <Typography variant="h6" className="ml-4 font-bold text-gray-900 opacity-90">
          Code with Amrut
        </Typography>
      </Box>

      {/* Main profile content will go here, it will be centered due to the parent Box */}
      <Box sx={{ padding: 1, width: '100%' }}>
        <section>
          <img src={bannerimg} className='w-[100%] h-[15rem]'></img>
        </section>
      </Box>
    </Box>
  );
};

export default Profile;