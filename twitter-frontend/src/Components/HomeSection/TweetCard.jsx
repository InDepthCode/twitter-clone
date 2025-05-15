import React from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const TweetCard = ({ tweet }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 2, borderBottom: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
        <Avatar alt={tweet.user} src={tweet.avatar} sx={{ width: 48, height: 48, mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography fontWeight="bold" sx={{ mr: 0.5 }}>{tweet.user}</Typography>
            <Typography color="textSecondary" sx={{ mr: 0.5 }}>@{tweet.username}</Typography>
            <Typography color="textSecondary" fontSize="small">· {tweet.time}</Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 0.5, wordBreak: 'break-word' }}>
            {tweet.content}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, ml: '56px', width: 'calc(100% - 56px)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '75%' }}>
          <IconButton size="small"><ChatBubbleOutlineIcon fontSize="small" /></IconButton>
          <IconButton size="small"><RepeatIcon fontSize="small" /></IconButton>
          <IconButton size="small"><FavoriteBorderIcon fontSize="small" /></IconButton>
          <IconButton size="small"><BarChartOutlinedIcon fontSize="small" /></IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small"><BookmarkBorderIcon fontSize="small" /></IconButton>
          <IconButton size="small"><ShareOutlinedIcon fontSize="small" /></IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TweetCard;
