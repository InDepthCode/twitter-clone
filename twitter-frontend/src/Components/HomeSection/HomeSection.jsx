import React, { useState } from 'react';
import { Avatar, Button, CircularProgress, IconButton, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFaceIcon from '@mui/icons-material/TagFaces';
import CloseIcon from '@mui/icons-material/Close';
import GifBoxIcon from '@mui/icons-material/GifBox';
import BallotIcon from '@mui/icons-material/Ballot';
import EditCalendarSharpIcon from '@mui/icons-material/EditCalendarSharp';
import TweetCard from './TweetCard';
{/*checking if its updated */}
// Sample image URLs
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
    image:'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D', // Ensure the first tweet has an image
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
  const iconColor = '#1d9bf0'; // Define the desired icon color

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

  return (
    <Box
      sx={{
        paddingRight: -1,
        paddingLeft: -1,
        paddingTop: 0, // Changed from -1
        borderRight: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Header with Tabs */}
      <Box>
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
              className={`flex-1 text-center py-2 font-medium cursor-pointer transition-all duration-200 ${
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
      <Box sx={{ mt: 1, ml: 1, pb: 1, borderBottom: (theme) => `1px solid ${theme.palette.divider}` , pl:1,pt:0}}>
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
              <Box  display="flex" justifyContent="space-between" alignItems="center">
                <Box className="flex space-x-2 text-[#1d9bf0]">
                  <IconButton component="label" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5 , marginRight: '10px'  }}>
                    <ImageIcon sx={{ fontSize: 20,color: iconColor }}/>
                    <input type="file" name="imageFile" hidden accept="image/*" onChange={handleSelectImage} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5 , marginRight: '10px'  }}>
                    <FmdGoodIcon sx={{ fontSize: 20,color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5 , marginRight: '10px'  }}>
                    <GifBoxIcon sx={{ fontSize: 20,color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5 , marginRight: '10px'  }}>
                    <EditCalendarSharpIcon sx={{ fontSize: 20,color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" className="hover:bg-blue-50 transition-colors" sx={{ p: 0.5 , marginRight: '10px'  }}>
                    <TagFaceIcon sx={{ fontSize: 20,color: iconColor }}/>
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