import React, { useState } from 'react';
import { Box, Typography, InputBase, Paper, IconButton, Avatar, Button, Divider } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Explore = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    console.log('Dark Mode:', !isDarkMode);
    // Implement your theme switching logic here
  };

  const handleGetVerifiedClick = () => {
    console.log('Get Verified button clicked!');
    // Implement your "Get Verified" functionality here
  };

  const whoToFollow = [
    { id: 1, name: 'Alice Smith', handle: '@alicesmith', avatar: 'https://via.placeholder.com/40/007bff/ffffff?Text=AS', isVerified: false },
    { id: 2, name: 'Bob Johnson', handle: '@bobjohnson', avatar: 'https://via.placeholder.com/40/28a745/ffffff?Text=BJ', isVerified: true },
    { id: 3, name: 'Charlie Brown', handle: '@charlie', avatar: 'https://via.placeholder.com/40/dc3545/ffffff?Text=CB', isVerified: false },
  ];

  const whatsHappening = [
    { id: 1, category: 'FIFA Women\'s World Cup · LIVE', hashtag: 'Philippines vs Switzerland', posts: '' },
    { id: 2, category: 'Entertainment · Trending', hashtag: '#TheMarvels', posts: '34.3K Tweets' },
    { id: 3, category: 'Entertainment · Trending', hashtag: '#TheMarvels', posts: '34.3K Tweets' },
    { id: 4, category: 'Entertainment · Trending', hashtag: '#TheMarvels', posts: '34.3K Tweets' },
  ];

  return (
    <Box sx={{
      flexGrow: 1,
      padding: 2,
      bgcolor: 'background.default',
      color: 'text.primary',
      position: 'sticky',
    }}>
      {/* Search Bar with Theme Toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Paper
          component="form"
          sx={{
            p: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            borderRadius: '20px',
            bgcolor: 'grey.100',
            mr: 1,
          }}
        >
          <IconButton sx={{ p: '5px' }} aria-label="search">
            <SearchOutlinedIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search "
            inputProps={{ 'aria-label': 'search twitter' }}
          />
        </Paper>
        <IconButton onClick={handleThemeChange} size="small" sx={{ ml: 1 }}>
          {isDarkMode ? <Brightness2Icon /> : <Brightness7Icon />}
        </IconButton>
      </Box>

      {/* Get Verified Section */}
      <Box sx={{ mb: 3, borderRadius: '8px', bgcolor: 'lightblue', p: 2 }}>
        <Typography fontWeight="bold">Get Verified</Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Subscribe to unlock new features
        </Typography>
        <Button
          onClick={handleGetVerifiedClick}
          variant="contained"
          sx={{ borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
          fullWidth
        >
          GET VERIFIED
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* What's happening */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2} sx={{ pl: 0, ml: 0 }}>
          What's happening
        </Typography>
        {whatsHappening.map((item) => (
          <Box key={item.id} sx={{ py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pl: 0, ml: 0 }}>
            <Box sx={{ flexGrow: 1 }}>
              {item.category && <Typography variant="caption" color="text.secondary" mb={0.5} sx={{ pl: 0, ml: 0 }}>{item.category}</Typography>}
              <Typography fontWeight="bold" variant="subtitle1" sx={{ wordBreak: 'break-word', pl: 0, ml: 0 }}>{item.hashtag}</Typography>
              {item.posts && <Typography variant="caption" color="text.secondary" sx={{ pl: 0, ml: 0 }}>{item.posts}</Typography>}
            </Box>
            <IconButton size="small">
              <MoreHorizIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* You might like */}
      <Box mb={3}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          You might like
        </Typography>
        {whoToFollow.map((user) => (
          <Box key={user.id} sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
            <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40, mr: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                {user.name}
                {user.isVerified && <VerifiedIcon color="primary" sx={{ fontSize: 'small', ml: 0.5 }} />}
              </Typography>
              <Typography variant="caption" color="text.secondary">{user.handle}</Typography>
            </Box>
            <Button variant="contained" size="small">Follow</Button>
          </Box>
        ))}
        <Typography color="primary" sx={{ mt: 1, cursor: 'pointer' }}>Show more</Typography>
      </Box>
    </Box>
  );
};

export default Explore;