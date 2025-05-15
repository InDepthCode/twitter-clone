import React, { useState } from 'react';
import { Avatar, Button, CircularProgress, IconButton, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFaceIcon from '@mui/icons-material/TagFaces';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import TweetCard from './TweetCard';


const tweets = [
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
  },
];

const validationSchema = Yup.object({
  content: Yup.string().required("Tweet text is required").max(280, "Tweet cannot exceed 280 characters"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('for-you');

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted:", values);
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

  const SingleTweet = ({ tweet }) => {
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '75%' }}> {/* Added width: '100%' */}
            <IconButton size="small" aria-label="comment">
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="retweet">
              <RepeatIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="like">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="analytics">
              <BarChartOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" aria-label="bookmark">
              <BookmarkBorderIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="share">
              <ShareOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        paddingRight: 2,
        paddingLeft: 1,
        paddingTop: -1,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >

      {/* Header with Tabs */}
      <Box sx={{
        position: 'sticky',
        top: '1px',
        bgcolor: 'white',
        zIndex: 10,
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 0
      }}>
        {/* Tabs */}
        <Box className="flex border-b border-gray-200" sx={{ py: 1.5, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          {[
            { id: 'for-you', label: 'For You' },
            { id: 'following', label: 'Following' },
            { id: 'grok', label: 'Grok' },
            { id: 'buildinpublic', label: 'Build In Public' },
            { id: 'webdev', label: 'Web' }
          ].map((tab) => (
            <div
              key={tab.id}
              className={`flex-1 text-center py-2.5 font-medium cursor-pointer transition-all duration-200 ${
                activeTab === tab.id
                  ? 'font-bold text-black border-b-4 border-blue-500'
                  : 'text-gray-600 hover:text-black'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </Box>
      </Box>

      {/* Tweet Box */}
      <Box sx={{ mt: 2, ml: 1, pb: 1, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Box className="flex items-start space-x-3">
          <Avatar
            alt="user"
            src="https://i.pravatar.cc/150?u=consistentmaleid"
            sx={{ width: 40, height: 40, mr: 1 }}
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
                style={{ resize: "none", fontSize: 16 }}
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
              <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Box className="flex space-x-2 text-[#1d9bf0]">
                  <IconButton component="label" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5 , marginRight: '10px'  }}>
                    <ImageIcon sx={{ fontSize: 20 }} />
                    <input type="file" name="imageFile" hidden accept="image/*" onChange={handleSelectImage} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5 , marginRight: '10px'  }}>
                    <FmdGoodIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5 , marginRight: '10px'  }}>
                    <TagFaceIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
                <Box sx={{ p: 0.5 , marginRight: '10px'  }}>
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
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}

      </Box>

    </Box>
  );
};

export default HomeSection;