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
    { id: 1, category: 'Technology · Trending', hashtag: '#InnovationNow', posts: '2,500 posts' },
    { id: 2, category: 'Sports · Trending', hashtag: '#GameDayLive', posts: '15K posts' },
    { id: 3, category: 'Music · Trending', hashtag: '#NewMusicAlert', posts: '8,700 posts' },
    { id: 4, category: 'Trending', hashtag: '#WeekendVibes', posts: '' },
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

      {/* Get Verified Button */}
      <Button
        onClick={handleGetVerifiedClick}
        variant="contained"
        startIcon={<VerifiedIcon />}
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 'bold',
          padding: '8px 16px',
          width: '100%',
        }}
      >
        Get Verified
      </Button>

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
      <Divider sx={{ my: 3 }} />

      {/* What's happening */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2} sx={{ pl: 0, ml: 0 }}> {/* Added ml: 0 */}
          What's happening
        </Typography>
        {whatsHappening.map((item) => (
          <Box key={item.id} sx={{ py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pl: 0, ml: 0 }}> {/* Added ml: 0 */}
            <Box sx={{ flexGrow: 1 }}>
              {item.category && <Typography variant="caption" color="text.secondary" mb={0.5} sx={{ pl: 0, ml: 0 }}>{item.category}</Typography>} {/* Added ml: 0 */}
              <Typography fontWeight="bold" variant="subtitle1" sx={{ wordBreak: 'break-word', pl: 0, ml: 0 }}>{item.hashtag}</Typography> {/* Added ml: 0 */}
              {item.posts && <Typography variant="caption" color="text.secondary" sx={{ pl: 0, ml: 0 }}>{item.posts}</Typography>} {/* Added ml: 0 */}
            </Box>
            <IconButton size="small">
              <MoreHorizIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Explore;