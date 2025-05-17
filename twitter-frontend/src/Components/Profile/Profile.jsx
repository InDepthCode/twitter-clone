import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import bannerimg from '../../assets/banner.jpg'; // Ensure this path is correct
import pfp from '../../assets/pfp3.jpg'; // Assuming you have a profile picture
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function handleOpenProfileModel() {
  console.log("Open profile model");
}

function handleFollowUser() {
  console.log("Follow user");
}

const Profile = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const isCurrentUserProfile = true; // Replace with your actual logic
  const displayName = "__Amrut_"; // Replace with actual display name
  const username = "@CubesSolves"; // Replace with actual username
  const bio = "Hello, im code with zos, you will find full stack project tutorial on our website"; // Replace with actual bio
  const location = "Indian"; // Replace with actual location
  const joinedDate = "Joined Jun 2022"; // Replace with actual joined date
  const followingCount = 300; // Replace with actual following count
  const followersCount =" 1M"; // Replace with actual followers count


  return (
    <Box>
      {/* Header */}
      <Box
        className="z-50 flex items-center sticky top-0 bg-white bg-opacity-95 border-b border-gray-200 p-2 w-full"
        sx={{ justifyContent: 'flex-start', alignItems: 'center', ml: 0.2, mt: 2 }}
      >
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon className="cursor-pointer text-gray-800" />
        </IconButton>
        <Typography variant="h6" className="font-bold text-gray-900 opacity-90">
          {displayName}
        </Typography>
      </Box>

      {/* Banner Image */}
      <Box sx={{ width: '100%' }}>
        <img src={bannerimg} className="w-full h-[15rem] object-cover" alt="Profile Banner" />
      </Box>

      {/* Profile Info Section */}
      <Box className="pl-6 relative">
        {/* Avatar */}
        <Box sx={{ position: 'absolute', top: '-9rem', left: '1rem', display: 'flex', alignItems: 'center', ml:1 }}>
          <Avatar
            alt={displayName}
            src={pfp} // Use your imported profile picture
            sx={{ width: "9rem", height: "9rem", border: "4px solid white", mr: 1 }}
            className="cursor-pointer shadow-md"
          />
          {/* The verified icon in the image seems to be next to the display name, not the avatar */}
        </Box>


        {/* Edit Profile Button */}
        <Box sx={{ position: 'absolute', top: '-5rem', right: '1rem' }}>
          {/*<EmailOutlinedIcon />*/}
          <Button
            variant="outlined"
            size="small"
            sx={{ borderRadius: '9999px', color: 'black', borderColor: 'rgba(0, 0, 0, 0.23)' , mr:3 }}
            onClick={isCurrentUserProfile ? handleOpenProfileModel : handleFollowUser}
          >
            {isCurrentUserProfile ? 'Edit profile' : 'Follow'}
          </Button>
        </Box>

        {/* User Details */}
        <Box mt={12} ml={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mr: 0.5 }}>
              {displayName}
            </Typography>
            <VerifiedIcon sx={{ color: '#1DA1F2', fontSize: '1.1rem' , ml:1}} />
          </Box>
          <Typography color="textSecondary" sx={{ ml:'-82%'}}>
            {username}
          </Typography>
          <Typography mt={1} ml={-9}>{bio}</Typography>
          <Box mt={1.5} ml={1} color="textSecondary" sx={{ display: 'flex', gap: 2, alignItems: 'center', fontSize: '0.9rem' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 0 }}>
              <BusinessCenterOutlinedIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />
              Education
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <LocationOnOutlinedIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />
              {location}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonthOutlinedIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />
              {joinedDate}
            </Typography>
          </Box>
          <Box mt={2} ml={1} sx={{ display: 'flex', gap: 3 }}>
            <Button size="medium" sx={{ fontWeight: 'bold', color: 'black', padding: 0, minWidth: 0 }}>
              {followingCount} <Typography component="span" fontWeight="normal" color="textSecondary" sx={{ ml: 0.5 , textTransform: 'none'  }}>Following</Typography>
            </Button>
            <Button size="medium" sx={{ fontWeight: 'bold', color: 'black', padding: 0, minWidth: 0 }}>
              {followersCount} <Typography component="span" fontWeight="normal" color="textSecondary" sx={{ ml: 0.5, textTransform: 'none'  }}>Followers</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;