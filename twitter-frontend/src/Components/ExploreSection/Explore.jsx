import React from 'react';
import { Box, Typography, InputBase, Paper, IconButton, Avatar, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Explore = () => {
  const trendingTopics = [
    { id: 1, topic: '#TechTuesday', tweets: '10K Tweets' },
    { id: 2, topic: 'SpaceX Launch', tweets: '5K Tweets' },
    { id: 3, topic: '#MovieNight', tweets: '2K Tweets' },
    { id: 4, topic: 'Gaming News', tweets: '8K Tweets' },
  ];

  const followSuggestions = [
    { id: 1, name: 'Interesting Person 1', handle: '@person1', avatar: 'https://i.pravatar.cc/150?u=person1' },
    { id: 2, name: 'Cool Dev', handle: '@cooldev', avatar: 'https://i.pravatar.cc/150?u=cooldev' },
    { id: 3, name: 'Art Lover', handle: '@artlover', avatar: 'https://i.pravatar.cc/150?u=artlover' },
  ];

  return (
    <Box sx={{
      flexGrow: 1,
      padding: 2,
      bgcolor: 'background.default',
      color: 'text.primary',
      position:'sticky'
    }}>
      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          mb: 2,
          borderRadius: '20px',
          bgcolor: 'grey.100',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Twitter"
          inputProps={{ 'aria-label': 'search twitter' }}
        />
      </Paper>

      {/* Trending Topics */}
      <Box mb={3}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Trends for you
        </Typography>
        {trendingTopics.map((trend) => (
          <Box key={trend.id} sx={{ padding: 1, '&:hover': { bgcolor: 'grey.100' }, borderRadius: '8px' }}>
            <Typography variant="subtitle2" fontWeight="bold">{trend.topic}</Typography>
            <Typography variant="caption" color="text.secondary">{trend.tweets}</Typography>
          </Box>
        ))}
      </Box>

      {/* Follow Suggestions */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Who to follow
        </Typography>
        {followSuggestions.map((suggestion) => (
          <Box key={suggestion.id} sx={{ display: 'flex', alignItems: 'center', padding: 1, '&:hover': { bgcolor: 'grey.100' }, borderRadius: '8px' }}>
            <Avatar src={suggestion.avatar} alt={suggestion.name} sx={{ width: 32, height: 32, mr: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">{suggestion.name}</Typography>
              <Typography variant="caption" color="text.secondary">{suggestion.handle}</Typography>
            </Box>
            <Button variant="outlined" size="small">Follow</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Explore;