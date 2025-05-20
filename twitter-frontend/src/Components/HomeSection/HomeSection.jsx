// src/Components/HomeSection/HomeSection.jsx
import React, { useState } from 'react';
import { Avatar, Button, CircularProgress, IconButton, Box, Typography, Tabs, Tab } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFaceIcon from '@mui/icons-material/TagFaces';
import CloseIcon from '@mui/icons-material/Close';
import GifBoxIcon from '@mui/icons-material/GifBox';
import EditCalendarSharpIcon from '@mui/icons-material/EditCalendarSharp';
import TweetCard from './TweetCard';
import ReplyModal from './ReplyModal.jsx'; // Import ReplyModal here

// Sample image URLs and allTweets data (your existing data)
const allTweets = [
  {
    id: 1,
    user: 'Sample User',
    username: 'sampleuser',
    avatar: 'https://i.pravatar.cc/150?u=sampleuser',
    time: '12m',
    content: (
      <>
        Just posted a tweet using our new Twitter clone interface!{' '}
        <Typography component="span" color="primary">#ReactJS</Typography>{' '}
        <Typography component="span" color="primary">#MaterialUI</Typography>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    tab: 'for-you',
  },
  {
    id: 2,
    user: 'John Doe',
    username: 'johndoe',
    avatar: 'https://i.pravatar.cc/150?u=johndoe',
    time: '45m',
    content: (
      <>
        Loving the new UI updates! So clean and fast.Loving the new UI updates! So clean and fast. <Typography component="span" color="primary">#UX</Typography>{' '}
        <Typography component="span" color="primary">#Design</Typography>
      </>
    ),
    tab: 'following',
  },
  {
    id: 3,
    user: 'Jane Smith',
    username: 'janesmith',
    avatar: 'https://i.pravatar.cc/150?u=janesmith',
    time: '1h',
    content: (
      <>
        Anyone else excited for React 18? Can’t wait to try out the new features!{' '}
        <Typography component="span" color="primary">#React18</Typography>
      </>
    ),
    tab: 'for-you',
  },
  {
    id: 4,
    user: 'Dev Guru',
    username: 'devguru',
    avatar: 'https://i.pravatar.cc/150?u=devguru',
    time: '2h',
    content: (
      <>
        Pro tip: Always write clean, readable code. It saves time later!{' '}
        <Typography component="span" color="primary">#CodeQuality</Typography>{' '}
        <Typography component="span" color="primary">#BestPractices</Typography>
      </>
    ),
    tab: 'webdev',
  },
  {
    id: 5,
    user: 'Grok Master',
    username: 'grok_master',
    avatar: 'https://i.pravatar.cc/150?u=grok_master',
    time: '5h',
    content: 'Just grokking some new concepts!',
    tab: 'grok',
  },
  {
    id: 6,
    user: 'Builder',
    username: 'build_in_public',
    avatar: 'https://i.pravatar.cc/150?u=build_in_public',
    time: '8h',
    content: 'Sharing my progress on my latest build!',
    tab: 'buildinpublic',
  },
];

const validationSchema = Yup.object({
  content: Yup.string().required("Tweet text is required").max(280, "Tweet cannot exceed 280 characters"),
});

const tabsData = [
  { id: 'for-you', label: 'For You' },
  { id: 'following', label: 'Following' },
  { id: 'grok', label: 'Grok' },
  { id: 'buildinpublic', label: 'Build In Public' },
  { id: 'webdev', label: 'Web' },
];

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('for-you');
  const [tabValue, setTabValue] = useState(0);
  const [filteredTweets, setFilteredTweets] = useState(allTweets.filter(tweet => tweet.tab === 'for-you'));
  const iconColor = '#1d9bf0';

  // State for the ReplyModal
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedTweetForReply, setSelectedTweetForReply] = useState(null); // This will hold the tweet data for the modal

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted:", values);
    const newTweet = {
      id: Date.now(),
      user: 'Current User', // Replace with actual user info
      username: 'current_user', // Replace with actual username
      avatar: 'https://i.pravatar.cc/150?u=current_user', // Replace with actual avatar
      time: '0m',
      content: values.content,
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
      tab: activeTab,
    };
    setFilteredTweets([newTweet, ...filteredTweets]);
    resetForm();
    setSelectedImage(null);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingImage(true);
      formik.setFieldValue("image", file);
      setSelectedImage(file);
      setTimeout(() => {
        setUploadingImage(false);
      }, 500);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    formik.setFieldValue("image", "");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const selectedTabId = tabsData[newValue].id;
    setActiveTab(selectedTabId);
    console.log(`Active Tab: ${selectedTabId}`);
    const filtered = allTweets.filter(tweet => tweet.tab === selectedTabId);
    setFilteredTweets(filtered);
  };

  // Function to open the reply modal, passed to TweetCard
  const handleOpenReplyModal = (tweet) => {
    setSelectedTweetForReply(tweet); // Set the tweet to be displayed in the modal
    setIsReplyModalOpen(true);
  };

  // Function to close the reply modal
  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false);
    setSelectedTweetForReply(null); // Clear the selected tweet when closed
  };


  return (
    <Box
      sx={{
        paddingRight: -1,
        paddingLeft: -1,
        paddingTop: 0,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Header with Tabs */}
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="home tabs"
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="inherit"
          >
            {tabsData.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                id={`tab-${tab.id}`}
                aria-controls={`tabpanel-${tab.id}`}
                sx={{
                  fontWeight: 'medium',
                  '&.Mui-selected': {
                    fontWeight: 'bold',
                    color: 'black',


                  },
                  '&:hover': {
                    color: 'black',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Tweet Box */}
      <Box sx={{ mt: 1, ml: 1, pb: 1, borderBottom: (theme) => `1px solid ${theme.palette.divider}`, pl: 1, pt: 0 }}>
        <Box className="flex items-start mr-11">
          <Avatar
            alt="user"
            src="https://i.pravatar.cc/150?u=consistentmaleid"
            sx={{ width: 45, height: 45, mr: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <form onSubmit={formik.handleSubmit} className="w-full">
              <textarea
                name="content"
                placeholder="What's happening?"
                className={`
                      w-full text-lg bg-transparent
                      placeholder-gray-500 focus:outline-none min-h-[50px]
                      border-none resize-none
                    `}
                style={{ resize: "none", fontSize: 22 }}
                {...formik.getFieldProps("content")}
              />
              {formik.touched.content && formik.errors.content && (
                <Typography color="error" variant="caption" display="block">{formik.errors.content}</Typography>
              )}
              {selectedImage && (
                <Box mt={2} position="relative">
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      zIndex: 1,
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.9)' },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected preview"
                    className="rounded-xl max-h-80 object-cover border border-gray-100"
                  />
                </Box>
              )}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="flex space-x-2 text-[#1d9bf0]">
                  <IconButton component="label" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5, marginRight: '10px' }}>
                    <ImageIcon sx={{ fontSize: 20, color: iconColor }} />
                    <input type="file" name="imageFile" hidden accept="image/*" onChange={handleSelectImage} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5, marginRight: '10px' }}>
                    <FmdGoodIcon sx={{ fontSize: 20, color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5, marginRight: '10px' }}>
                    <GifBoxIcon sx={{ fontSize: 20, color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5, marginRight: '10px' }}>
                    <EditCalendarSharpIcon sx={{ fontSize: 20, color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5, marginRight: '10px' }}>
                    <TagFaceIcon sx={{ fontSize: 20, color: iconColor }} />
                  </IconButton>
                </Box>
                <Box sx={{ p: 0.5, marginRight: '10px' }}>
                  <Button
                    type="submit"
                    sx={{
                      borderRadius: '9999px',
                      padding: '6px 16px',
                      minWidth: 80,
                      backgroundColor: '#1d9bf0',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 15,
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#1a8cd8' },
                      '&:disabled': { backgroundColor: '#8ecdf7', color: 'white' },
                    }}
                    disabled={uploadingImage || !formik.values.content.trim() || formik.values.content.length > 280}
                  >
                    {uploadingImage ? <CircularProgress size={16} sx={{ color: 'white' }} /> : 'Post'}
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>

      {/* Feed */}
      <Box mt={0} px={0} maxWidth={650} margin="0 auto">
        {filteredTweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onCommentClick={handleOpenReplyModal} // Pass the handler down
          />
        ))}
      </Box>

      {/* Render ReplyModal here, controlled by HomeSection's state */}
      {selectedTweetForReply && ( // Only render if a tweet is selected
        <ReplyModal
          open={isReplyModalOpen}
          onClose={handleCloseReplyModal}
          tweet={selectedTweetForReply} // Pass the selected tweet data
        />
      )}
    </Box>
  );
};

export default HomeSection;