import React, {useEffect} from 'react';
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard.jsx";

const TweetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the tweet ID from the URL
  const handleBack = () => navigate(-1);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component mount
  },[]);

  // Replace this with your actual logic to fetch the tweet details
  const tweetDetails = {
    id: id,
    user: '__Amrut_',
    username: 'CubesSolves',
    avatar: '../../assets/pfp3.jpg', // Adjust the path as needed
    time: '2h',
    content: 'This is the detailed content of the tweet with ID: ' + id,
    // Add other relevant tweet details here
  };

  return (
    <React.Fragment>
      <Box
        className="z-50 flex items-center sticky top-0 bg-white bg-opacity-95 border-b border-gray-200 p-2 w-full"
        sx={{ justifyContent: 'flex-start', alignItems: 'center', ml: 0.2, mt: 2 }}
      >
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon className="cursor-pointer text-gray-800" />
        </IconButton>
        <Typography variant="h6" className="font-bold text-gray-900 opacity-90">
          Tweet
        </Typography>
      </Box>
      <Box>
        {tweetDetails && <TweetCard tweet={tweetDetails} />}
        <Divider />
        {/* You can add more UI elements below the main tweet, like comments */}
      </Box>
    </React.Fragment>
  );
};

export default TweetDetails;