import React, { useEffect } from 'react';
import { Box, Divider, IconButton, Typography, Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard.jsx";

const TweetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the tweet ID from the URL
  const handleBack = () => navigate(-1);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component mount
  }, []);

  // Replace this with your actual logic to fetch the main tweet and any
  // related replies or content based on the 'id'
  const mainTweet = {
    id: id,
    user: '__Amrut_',
    username: 'CubesSolves',
    avatar: '../../assets/pfp3.jpg', // Adjust the path as needed
    time: '8:11 PM May 15, 2025', // Example timestamp
    content: 'Almost finished the middle part now btw i am using React.js and Tailwind now onto the Explore part.',
    image: 'https://pbs.twimg.com/media/GEgKz-xa0AAQ9iK?format=jpg&name=small', // Example image URL
    likeCount: 3,
    replyCount: 2,
    retweetCount: 2,
  };

  // Example array of replies (replace with your fetched data)
  const replies = [
    {
      id: `reply-${id}-1`,
      user: 'Shubham T',
      username: 'ShubhamTambwe',
      avatar: 'https://pbs.twimg.com/profile_images/1674073787273744384/w4m475_normal.jpg', // Example avatar
      time: 'May 15',
      content: 'Looks good 👍',
      likeCount: 1,
      replyCount: 0,
      retweetCount: 0,
    },
    // Add more replies here
  ];

  return (
    <React.Fragment>
      {/* Header */}
      <Box
        className="z-50 flex items-center sticky top-0 bg-white bg-opacity-95 border-b border-gray-200 p-2 w-full"
        sx={{ justifyContent: 'flex-start', alignItems: 'center', ml: 0.2, mt: 2 }}
      >
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon className="cursor-pointer text-gray-800" />
        </IconButton>
        <Typography variant="h6" className="font-bold text-gray-900 opacity-90">
          Post
        </Typography>
      </Box>

      {/* Main Tweet Section */}
      <Box>
        {mainTweet && <TweetCard tweet={mainTweet} isDetailedTweet={true} />}
        <Divider />
      </Box>

      {/* Replies Section */}
      <Box mt={2}>
        {replies.map((reply) => (
          <Box key={reply.id} sx={{ pl: 2 }}>
            <TweetCard tweet={reply} isComment={true} />
            <Divider />
          </Box>
        ))}
        {replies.length === 0 && (
          <Typography sx={{ p: 2, color: 'textSecondary' }}>No replies yet.</Typography>
        )}
      </Box>

      {/* Add a section for composing a reply if needed */}
      <Box sx={{ p: 2, mt: 2, borderTop: '1px solid #e0e0e0' }}>
        {/* Placeholder for a reply input */}
        <Typography variant="h6" color="textSecondary">Reply</Typography>
        {/* You can add an Avatar and a text input here */}
      </Box>
    </React.Fragment>
  );
};

export default TweetDetails;