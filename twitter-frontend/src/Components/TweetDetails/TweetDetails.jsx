// src/Components/TweetDetails.jsx
import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard.jsx";
import ReplyModal from "../HomeSection/ReplyModal.jsx";
import pfp3 from '../../assets/pfp3.jpg'; // Import avatar properly

const TweetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate('/');
  };

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedTweetForReply, setSelectedTweetForReply] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mainTweet = {
    id: id,
    user: '__Amrut_',
    username: 'CubesSolves',
    avatar: pfp3,
    time: '8:11 PM May 15, 2025',
    content: 'Almost finished the middle part now btw i am using React.js and Tailwind now onto the Explore part.',
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D',
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
  ];

  const handleOpenReplyModal = (tweetToReplyTo) => {
    setSelectedTweetForReply(tweetToReplyTo);
    setIsReplyModalOpen(true);
  };

  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false);
    setSelectedTweetForReply(null);
  };

  return (
    <>
      <Box
        className="z-50 flex items-center sticky top-0 bg-white bg-opacity-95 border-b border-gray-200 p-2 w-full"
        sx={{ justifyContent: 'flex-start', alignItems: 'center', ml: 0.2, mt: 2 }}
      >
        <IconButton onClick={handleBack} aria-label="Go back" sx={{ mr: 1 }}>
          <ArrowBackIcon className="cursor-pointer text-gray-800" />
        </IconButton>
        <Typography variant="h6" className="font-bold text-gray-900 opacity-90">
          Post
        </Typography>
      </Box>

      <Box>
        {mainTweet && (
          <TweetCard
            tweet={mainTweet}
            isDetailedTweet={true}
            onCommentClick={handleOpenReplyModal}
          />
        )}
        <Divider />
      </Box>

      <Box mt={2}>
        {replies.length > 0 ? (
          replies.map((reply) => (
            <Box key={reply.id} sx={{ pl: 2 }}>
              <TweetCard
                tweet={reply}
                isComment={true}
                onCommentClick={handleOpenReplyModal}
              />
              <Divider />
            </Box>
          ))
        ) : (
          <Typography sx={{ p: 2, color: 'textSecondary' }}>No replies yet.</Typography>
        )}
      </Box>

      {selectedTweetForReply && (
        <ReplyModal
          open={isReplyModalOpen}
          onClose={handleCloseReplyModal}
          tweet={selectedTweetForReply}
        />
      )}
    </>
  );
};

export default TweetDetails;
