import React, { useRef, useState } from 'react'; // Import useState
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
{/*checking if its updated */}
const TweetCard = ({ tweet }) => {
  const likeRef = useRef(null);
  const [liked, setLiked] = useState(false); // Use useState
  const [retweeted, setRetweeted] = useState(false);
  const retweetIconRef = useRef(null); // Ref for the retweet icon

  const handleCommentClick = () => {
    console.log('Comment clicked');
  };

  const handleRetweetClick = () => {
    setRetweeted(!retweeted);
    if (retweetIconRef.current) {
      retweetIconRef.current.classList.toggle('clicked');
    }
  };

  const handleLikeClick = () => {
    setLiked(!liked); // Update the state using the setter function
    // likeRef.current.classList.toggle('liked'); // No need for this with state
  };

  const handleAnalyticsClick = () => {
    console.log('Analytics clicked');
  };

  const handleBookmarkClick = () => {
    console.log('Bookmark clicked');
  };

  const handleShareClick = () => {
    console.log('Share clicked');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 2, borderBottom: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
        <Avatar alt={tweet.user} src={tweet.avatar} sx={{ width: 45, height: 45, mr: 1, mt: 0.5 }} /> {/* Added mt: 0.5 */}
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
          <IconButton size="small" onClick={handleCommentClick}>
            <ChatBubbleOutlineIcon fontSize="small" />
            {/* You might want to fetch and display the actual comment count */}
            {/* <Typography variant="caption" sx={{ ml: 0.5 }}>{tweet.commentCount}</Typography> */}
            <Typography variant="caption" sx={{ ml: 0.5 }}>13</Typography>
          </IconButton>

          <IconButton
            size="small"
            onClick={handleRetweetClick}
          >
            <RepeatIcon fontSize="small" className={`icon-retweet ${retweeted ? 'clicked' : ''}`} ref={retweetIconRef} />
            {/* You might want to fetch and display the actual retweet count */}
            <Typography variant="caption" sx={{ ml: 0.5 }}>25</Typography>
          </IconButton>

          <IconButton size="small" onClick={handleLikeClick}>
            {liked ? (
              <FavoriteIcon fontSize="small" sx={{ color: 'pink' }} className="icon-like liked" />
            ) : (
              <FavoriteBorderIcon fontSize="small" className="icon-like" />
            )}
            {/* You might want to fetch and display the actual like count */}
            {/* <Typography variant="caption" sx={{ ml: 0.5 }}>{tweet.likeCount}</Typography> */}
            <Typography variant="caption" sx={{ ml: 0.5 }}>200</Typography>
          </IconButton>

          <IconButton size="small" onClick={handleAnalyticsClick}>
            <BarChartOutlinedIcon fontSize="small" />
            {/* You might want to fetch and display some analytics count */}
            {/* <Typography variant="caption" sx={{ ml: 0.5 }}>{tweet.analyticsCount}</Typography> */}
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
    </Box>
  );
};

export default TweetCard;