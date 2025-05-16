import React from 'react';
import { Box, Typography, IconButton, Avatar, Divider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        padding: 2, // Add some overall padding
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        minHeight: '100vh', // Ensure it takes at least the full viewport height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingY: 1.5,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        marginBottom: 2, // Add some space below the header
      }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon sx={{ cursor: 'pointer' }} />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Profile
        </Typography>
      </Box>

      {/* Profile Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
        <Avatar
          alt="User Profile"
          src="https://i.pravatar.cc/150?u=amrut" // Replace with actual user image
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="h5" fontWeight="bold">
          FullStack Noob
        </Typography>
        <Typography color="textSecondary">
          @code_with_amrut
        </Typography>
        <Divider sx={{ width: '80%', marginY: 2 }} />
        <Typography variant="body2" textAlign="center" color="textSecondary">
          Passionate about coding and building awesome things! Sharing my journey and insights.
        </Typography>

        {/* Add more profile sections here */}
        <Box sx={{ width: '100%', marginTop: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recent Activity
          </Typography>
          <Typography variant="body1" color="textSecondary">
            No recent activity to show.
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginTop: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Followers
          </Typography>
          <Typography variant="body1" color="textSecondary">
            No followers yet.
          </Typography>
        </Box>

        {/* You can add more sections like "Following", "Tweets", etc. */}
      </Box>
    </Box>
  );
};

export default Profile;