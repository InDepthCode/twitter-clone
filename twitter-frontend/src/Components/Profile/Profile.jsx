import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import {Avatar, Box, Button, IconButton, Typography} from '@mui/material'; // Import Box for layout
import bannerimg from '../../assets/banner.jpg';

function handleOpenProfileModel() {
  console.log("Open profile model")
}

function handleFollowUser() {
  console.log("Follow user")
}

const Profile = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <Box>
      {/* Header */}
      <Box
        className="z-50 flex items-center sticky top-0 bg-white bg-opacity-95 border-b border-gray-200 p-2 w-full"
        sx={{ justifyContent: 'flex-start', ml: 0.2, mt: 2 }} // Align back button and title to the start
      >
        <IconButton onClick={handleBack} sx={{ mr: 0 }}>
          <ArrowBackIcon className="cursor-pointer text-gray-800" />
        </IconButton>
        <Typography variant="h6" className="ml-4 font-bold text-gray-900 opacity-90">
          Code with Amrut
        </Typography>

      </Box>

      {/* Banner Image */}
      <Box sx={{ width: '100%' }}>
        <img src={bannerimg} className="w-full h-[15rem] object-cover" alt="Profile Banner" />
      </Box>

      {/* Profile Picture Section */}
      <Box className="pl-6" > {/* Negative margin to overlap banner */}
        <Box className="flex justify-start items-start h-20" > {/* Adjust height as needed */}
          <Avatar
            alt="sample user"
            src="https://i.pravatar.cc/150?u=consistentmaleid"
            sx={{ width: "9rem", height: "9rem", border: "4px solid white" , mt:-6, ml:2 }}
            className="cursor-pointer shadow-md"
          />

          {(
            <Button
              variant="outlined"
              size="small"
              sx={{borderRadius: '9999px', color: 'black', ml: '55%', mt: 2}}
              onClick={handleOpenProfileModel}
            >
              Edit profile
            </Button>
          )}

        </Box>


        <Box mt={0} ml={0}>
          <Typography variant="h6" fontWeight="bold">
            Amrut Wankhede {/* Replace with actual name */}
          </Typography>
          <Typography color="textSecondary">
            @code_with_amrut {/* Replace with actual username */}
          </Typography>

        </Box>
      </Box>
      </Box>

  );
};

export default Profile;