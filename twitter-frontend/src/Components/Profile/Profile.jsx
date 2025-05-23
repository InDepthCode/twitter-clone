import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import bannerimg from '../../assets/banner.jpg'; // Ensure this path is correct
import pfp from '../../assets/pfp3.jpg'; // Assuming you have a profile picture
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Tabs, Tab } from '@mui/material';
import TweetCard from '../HomeSection/TweetCard.jsx';
import ProfileModal from "./ProfileModal.jsx"; // Make sure this path is correct
import ReplyModal from '../HomeSection/ReplyModal.jsx'; // Import ReplyModal here

const sampleTweets = [
  {
    id: 101,
    user: '__Amrut_',
    username: 'CubesSolves',
    avatar: pfp,
    time: '1m',
    content: (
      <img
        src='https://images.unsplash.com/photo-1500463959177-e0869687df26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGlnZXJ8ZW58MHx8MHx8fDA%3D'
        alt="Tiger" style={{ maxWidth: '100%', borderRadius: '8px' }}/>
    ),
    // Add default counts for TweetCard to display them
    likeCount: 200, //
    replyCount: 13, //
    retweetCount: 25, //
    viewsCount: '1.2K', //
  },
  {
    id: 102,
    user: '__Amrut_',
    username: 'CubesSolves',
    avatar: 'http://localhost:5173/src/assets/pfp3.jpg',
    time: '5m',
    content:'This is a post by user 2.',
    // Add default counts
    likeCount: 200, //
    replyCount: 13, //
    retweetCount: 25, //
    viewsCount: '1.2K', //
  },
  // Add more sample tweets here
];

const Profile = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const isCurrentUserProfile = true; // Replace with your actual logic
  const displayName = "__Amrut_"; //
  const username = "@CubesSolves"; //
  const bio = "Hello, I'm code with Amrut, you will find full stack project tutorial on our website"; //
  const location = "Indian"; //
  const joinedDate = "Joined Jun 2022"; //
  const followingCount = 300; //
  const followersCount = "1M"; //

  // State to control the ProfileModal's visibility
  const [openProfileModal, setOpenProfileModal] = useState(false);

  // --- START: ReplyModal Specific States and Handlers ---
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedTweetForReply, setSelectedTweetForReply] = useState(null);

  const handleOpenReplyModal = (tweetToReplyTo) => {
    setSelectedTweetForReply(tweetToReplyTo);
    setIsReplyModalOpen(true);
  };

  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false);
    setSelectedTweetForReply(null);
  };
  // --- END: ReplyModal Specific States and Handlers ---

  const handleOpenProfileModel = () => {
    setOpenProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
  };

  const handleFollowUser = () => {
    console.log("Follow user");
    // Implement your follow logic here
  };

  const tabsData = [
    { id: 'posts', label: 'Posts' }, //
    { id: 'replies', label: 'Replies' }, //
    { id: 'highlights', label: 'Highlights' }, //
    { id: 'article', label: 'Articles' }, //
    { id: 'media', label: 'Media' }, //
    { id: 'likes', label: 'Likes' }, //
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component mount
  },[]);

  return (
    <Box>
      {/* Header */}
      <Box
        className="z-50 flex items-center sticky top-0 bg-white bg-opacity-95 border-b border-gray-200 p-2 w-full"
        sx={{ justifyContent: 'flex-start', alignItems: 'center', ml: 0.2, mt: 2 }}
      >
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon className="cursor-pointer text-gray-800" />
        </IconButton>
        <Typography variant="h6" className="font-bold text-gray-900 opacity-90">
          {displayName}
        </Typography>
      </Box>

      {/* Banner Image */}
      <Box sx={{ width: '100%' }}>
        <img src={bannerimg} className="w-full h-[15rem] object-cover" alt="Profile Banner" />
      </Box>

      {/* Profile Info Section */}
      <Box className="pl-6 relative">
        {/* Avatar */}
        <Box sx={{ position: 'absolute', top: '-9rem', left: '1rem', display: 'flex', alignItems: 'center', ml:1 }}>
          <Avatar
            alt={displayName}
            src={pfp}
            sx={{ width: "9rem", height: "9rem", border: "4px solid white", mr: 1 }}
            className="cursor-pointer shadow-md"
          />
        </Box>

        {/* Edit Profile Button */}
        <Box sx={{ position: 'absolute', top: '-5rem', right: '1rem' }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ borderRadius: '9999px', color: 'black', borderColor: 'rgba(0, 0, 0, 0.23)' , mr:3 }}
            onClick={isCurrentUserProfile ? handleOpenProfileModel : handleFollowUser}
          >
            {isCurrentUserProfile ? 'Edit profile' : 'Follow'}
          </Button>
        </Box>

        {/* User Details */}
        <Box mt={12} ml={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mr: 0.5 }}>
              {displayName}
            </Typography>
            <VerifiedIcon sx={{ color: '#1DA1F2', fontSize: '1.1rem' , ml:1}} />
          </Box>
          <Typography color="textSecondary" sx={{ ml:'-82%'}}>
            {username}
          </Typography>
          <Typography mt={1} ml={-9}>{bio}</Typography>
          <Box mt={1.5} ml={1} color="textSecondary" sx={{ display: 'flex', gap: 2, alignItems: 'center', fontSize: '0.9rem' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 0 }} className='text-gray-500'>
              <BusinessCenterOutlinedIcon sx={{ mr: 0.5, fontSize: 'inherit' }}  />
              Education
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 1 }} className='text-gray-500'>
              <LocationOnOutlinedIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />
              {location}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }} className='text-gray-500'>
              <CalendarMonthOutlinedIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />
              {joinedDate}
            </Typography>
          </Box>
          <Box mt={2} ml={1} sx={{ display: 'flex', gap: 3 }}>
            <Button size="medium" sx={{ fontWeight: 'bold', color: 'black', padding: 0, minWidth: 0 }}>
              {followingCount} <Typography component="span" fontWeight="normal" color="textSecondary" sx={{ ml: 0.5 , textTransform: 'none'  }}>Following</Typography>
            </Button>
            <Button size="medium" sx={{ fontWeight: 'bold', color: 'black', padding: 0, minWidth: 0 }}>
              {followersCount} <Typography component="span" fontWeight="normal" color="textSecondary" sx={{ ml: 0.5, textTransform: 'none'  }}>Followers</Typography>
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Header with Tabs */}
      <Box mt={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="profile tabs" variant="scrollable" scrollButtons="auto">
            {tabsData.map((tab) => (
              <Tab key={tab.id} label={tab.label} id={`tab-${tab.id}`} aria-controls={`tabpanel-${tab.id}`} />
            ))}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {tabsData.map((tab, index) => (
          <Box
            key={tab.id}
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            mt={2}
          >
            {value === index && tab.id === 'posts' && (
              <Box>
                {sampleTweets.map((tweet) => (
                  <TweetCard
                    key={tweet.id}
                    tweet={tweet}
                    onCommentClick={handleOpenReplyModal} // <--- THIS IS THE MISSING PIECE!
                  />
                ))}
              </Box>
            )}
            {value === index && tab.id !== 'posts' && (
              <Typography>{`Content for ${tab.label}`}</Typography>
            )}
          </Box>
        ))}

        {/* Profile Modal - Ensure it's rendered within the component and receives props */}
        <ProfileModal open={openProfileModal} handleClose={handleCloseProfileModal} />

        {/* Reply Modal - RENDERED HERE, controlled by Profile component's state */}
        {selectedTweetForReply && ( // Only render if a tweet has been selected for reply
          <ReplyModal
            open={isReplyModalOpen}
            onClose={handleCloseReplyModal}
            tweet={selectedTweetForReply}
          />
        )}
      </Box>
    </Box>
  );
};

export default Profile;