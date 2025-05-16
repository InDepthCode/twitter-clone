import React from 'react'
import {Box} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {useNavigate} from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleBack =() =>{
    navigate(-1);
  }
  return (
    <div>
      <Box sx={{ zIndex: 50, display: 'flex', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <HomeOutlinedIcon sx={{cursor: 'pointer'}} onClick={handleBack} />

    <h1>hey there</h1>
      </Box>
    </div>
  )
}
export default Profile
