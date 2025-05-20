// src/Components/TweetDetails.jsx
import React, { useEffect, useState } from 'react'; // Import useState
import { Box, Divider, IconButton, Typography, Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard.jsx";
import ReplyModal from "../HomeSection/ReplyModal.jsx"; // Import ReplyModal here

const TweetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => navigate(-1);

  // State for ReplyModal (specific to TweetDetails)
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedTweetForReply, setSelectedTweetForReply] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Your mainTweet and replies data (replace with actual fetches)
  const mainTweet = {
    id: id,
    user: '__Amrut_',
    username: 'CubesSolves',
    avatar: '../../assets/pfp3.jpg',
    time: '8:11 PM May 15, 2025',
    content: 'Almost finished the middle part now btw i am using React.js and Tailwind now onto the Explore part.',
    image: 'https://pbs.twimg.com/media/GEgKz-xa0AAQ9iK?format=jpg&name=small',
    likeCount: 3,
    replyCount: 2,
    retweetCount: 2,
  };

  const replies = [
    {
      id: `reply-${id}-1`,
      user: 'Shubham T',
      username: 'ShubhamTambwe',
      avatar: 'https://pbs.twimg.com/profile_images/1674073787273744384/w4m475_normal.jpg',
      time: 'May 15',
      content: 'Looks good 👍',
      likeCount: 1,
      replyCount: 0,
      retweetCount: 0,
    },
    // Add more replies here
  ];

  // Function to open the reply modal
  const handleOpenReplyModal = (tweetToReplyTo) => {
    setSelectedTweetForReply(tweetToReplyTo);
    setIsReplyModalOpen(true);
  };

  // Function to close the reply modal
  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false);
    setSelectedTweetForReply(null);
  };


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
        {/* Pass onCommentClick to the main tweet for direct replies */}
        {mainTweet && <TweetCard tweet={mainTweet} isDetailedTweet={true} onCommentClick={handleOpenReplyModal} />}
        <Divider />
      </Box>

      {/* Replies Section */}
      <Box mt={2}>
        {replies.map((reply) => (
          <Box key={reply.id} sx={{ pl: 2 }}>
            {/* Pass onCommentClick to each reply if you want to reply to replies */}
            <TweetCard tweet={reply} isComment={true} onCommentClick={handleOpenReplyModal} />
            <Divider />
          </Box>
        ))}
        {replies.length === 0 && (
          <Typography sx={{ p: 2, color: 'textSecondary' }}>No replies yet.</Typography>
        )}
      </Box>

      {/* Add a section for composing a reply if needed (or rely solely on the modal) */}
      <Box sx={{ p: 2, mt: 2, borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="h6" color="textSecondary">Reply</Typography>
        {/* You might add a text input here for a quick reply,
            or encourage opening the modal.
            You could also have a button here that calls handleOpenReplyModal(mainTweet)
            to reply directly to the main tweet.
        */}
      </Box>

      {/* Render ReplyModal here, controlled by TweetDetails's state */}
      {selectedTweetForReply && (
        <ReplyModal
          open={isReplyModalOpen}
          onClose={handleCloseReplyModal}
          tweet={selectedTweetForReply}
        />
      )}
    </React.Fragment>
  );
};

export default TweetDetails;