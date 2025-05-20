// src/Components/HomeSection/TweetCard.jsx
import React, { useRef, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

// TweetCard now expects an onCommentClick prop
const TweetCard = ({ tweet, onCommentClick }) => { // Removed 'navigate' from props if it's not directly used here
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const retweetIconRef = useRef(null);
  const navigate = useNavigate(); // Keep if you use it for navigating to tweet details

  const handleCommentClick = (event) => {
    event.stopPropagation(); // Prevent the main tweet click from firing
    if (onCommentClick) {
      onCommentClick(tweet); // Pass the current tweet object back to the parent
    }
  };

  const handleRetweetClick = (event) => {
    event.stopPropagation();
    setRetweeted(!retweeted);
    if (retweetIconRef.current) {
      retweetIconRef.current.classList.toggle('clicked');
    }
  };

  const handleLikeClick = (event) => {
    event.stopPropagation();
    setLiked(!liked);
  };

  const handleAnalyticsClick = (event) => {
    event.stopPropagation();
    console.log('Analytics clicked');
  };

  const handleBookmarkClick = (event) => {
    event.stopPropagation();
    console.log('Bookmark clicked');
  };

  const handleShareClick = (event) => {
    event.stopPropagation();
    console.log('Share clicked');
  };

  const handleTweetClick = () => {
    // Navigate to tweet details page
    navigate(`/twit/${tweet.id}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 2, borderBottom: '1px solid #e0e0e0', pr: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', cursor: 'pointer' }} onClick={handleTweetClick}>
        <Avatar alt={tweet.user} src={tweet.avatar} sx={{ width: 45, height: 45, mr: 1, mt: 0.5 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography fontWeight="bold" sx={{ mr: 0.5 }}>{tweet.user}</Typography>
            <Typography color="textSecondary" sx={{ mr: 0.5 }}>@{tweet.username}</Typography>
            <Typography color="textSecondary" fontSize="small">· {tweet.time}</Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 0.5, wordBreak: 'break-word' }}>
            {tweet.content}
            {tweet.image && (
              <Box mt={1}>
                <img
                  src={tweet.image}
                  alt="Tweet Image"
                  style={{ borderRadius: 10, maxHeight: 300, width: '100%', objectFit: 'cover' }}
                />
              </Box>
            )}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, ml: '56px', width: 'calc(100% - 56px)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '75%' }}>
          <IconButton size="small" onClick={handleCommentClick}> {/* This will now trigger the parent's modal open function */}
            <ChatBubbleOutlineIcon fontSize="small" />
            <Typography variant="caption" sx={{ ml: 0.5 }}>13</Typography>
          </IconButton>

          <IconButton size="small" onClick={handleRetweetClick}>
            <RepeatIcon fontSize="small" className={`icon-retweet ${retweeted ? 'clicked' : ''}`} ref={retweetIconRef} />
            <Typography variant="caption" sx={{ ml: 0.5 }}>25</Typography>
          </IconButton>

          <IconButton size="small" onClick={handleLikeClick}>
            {liked ? (
              <FavoriteIcon fontSize="small" sx={{ color: 'pink' }} className="icon-like liked" />
            ) : (
              <FavoriteBorderIcon fontSize="small" className="icon-like" />
            )}
            <Typography variant="caption" sx={{ ml: 0.5 }}>200</Typography>
          </IconButton>

          <IconButton size="small" onClick={handleAnalyticsClick}>
            <BarChartOutlinedIcon fontSize="small" />
            <Typography variant="caption" sx={{ ml: 0.5 }}>1.2k</Typography>
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" onClick={handleBookmarkClick}>
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleShareClick}>
            <ShareOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      {/* ReplyModal is NOT rendered here directly */}
    </Box>
  );
};

export default TweetCard;