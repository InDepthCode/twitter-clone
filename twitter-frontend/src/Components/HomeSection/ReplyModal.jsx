// src/Components/HomeSection/ReplyModal.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EditCalendarSharpIcon from "@mui/icons-material/EditCalendarSharp";
import TagFaceIcon from "@mui/icons-material/TagFaces";
import { useState } from "react"; // Correct import for useState

const style = {
  position: 'absolute',
  top: '50%',
  left: '47%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 2,
  outline: 'none',
  borderRadius: 4, // Corrected to 16 for more rounded corners
};

export default function ReplyModal({ open, onClose, tweet }) {
  // Ensure tweet data is available. If not, don't render the content.
  if (!tweet) {
    return null;
  }

  const currentUserAvatar = 'http://localhost:5173/src/assets/pfp3.jpg'; // Placeholder for current user's avatar
  const iconColor = '#1d9bf0'; // Define the desired icon color

  // State for the reply input
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [replyContent, setReplyContent] = useState("");
  // State for image upload (if you want to handle it within the modal)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedImage, setSelectedImage] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uploadingImage, setUploadingImage] = useState(false); // New state for image upload indicator


  const handleReplyChange = (event) => {
    setReplyContent(event.target.value);
  };

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingImage(true);
      setSelectedImage(URL.createObjectURL(file)); // Use URL.createObjectURL for preview
      // In a real app, you'd upload the file and get a URL
      setTimeout(() => {
        setUploadingImage(false);
      }, 500); // Simulate upload time
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    // Revoke the object URL to free up memory if it was created
    // if (selectedImage) {
    //   URL.revokeObjectURL(selectedImage);
    // }
  };

  const handleSubmitReply = () => {
    console.log("Reply submitted for tweet:", tweet.id);
    console.log("Reply content:", replyContent);
    console.log("Image attached:", selectedImage);
    // Here you would typically send the reply data to your backend
    // After submission, you might want to close the modal and clear the input
    setReplyContent("");
    setSelectedImage(null);
    onClose(); // Close the modal after submission
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="reply-modal-title"
        aria-describedby="reply-modal-description"
      >
        <Box sx={style}>
          {/* Header with Close button and Drafts */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary" sx={{ cursor: 'pointer' }}>Drafts</Typography>
          </Box>

          {/* Original Tweet (context for reply) */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', mb: 1 }}>
            {/* Displaying original tweet content (user, username, time, content) */}
            <Avatar alt={tweet.user || 'User'} src={tweet.avatar} sx={{ width: 40, height: 40, mr: 1, mt: 0.5 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography fontWeight="bold" sx={{ mr: 0.5, fontSize: '0.9rem' }}>{tweet.user}</Typography>
                <Typography color="textSecondary" sx={{ mr: 0.5, fontSize: '0.85rem' }}>@{tweet.username}</Typography>
                <Typography color="textSecondary" fontSize="small">· {tweet.time}</Typography>
              </Box>
              <Typography variant="body2" sx={{ wordBreak: 'break-word', fontSize: '0.9rem', color: 'text.primary' }}>
                {tweet.content}
                {tweet.image && ( // Display original tweet's image if exists
                  <Box mt={1}>
                    <img
                      src={tweet.image}
                      alt="Original Tweet Image"
                      style={{ borderRadius: 10, maxHeight: 200, width: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
              </Typography>
            </Box>
          </Box>

          {/* "Replying to" text */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: '48px', mb: 2 }}>
            <Typography variant="body2" color="textSecondary" fontSize="small">
              Replying to <Typography component="span" color="primary" fontSize="small">@{tweet.username}</Typography>
            </Typography>
          </Box>

          {/* Reply input section */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
            <Avatar alt="Current User" src={currentUserAvatar} sx={{ width: 40, height: 40, mr: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <textarea
                placeholder="Post your reply"
                rows={3}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  padding: '10px 0',
                  fontSize: '1.2rem',
                  resize: 'none',
                  fontFamily: 'inherit',
                  minHeight: '80px',
                }}
                value={replyContent}
                onChange={handleReplyChange}
              />
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
                    src={selectedImage}
                    alt="Reply preview"
                    style={{ borderRadius: 10, maxHeight: 200, width: '100%', objectFit: 'cover' }}
                  />
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                {/* Icons for attachments */}
                <Box className="flex space-x-2"> {/* Removed text-[#1d9bf0] as color is applied via sx */}
                  <IconButton component="label" sx={{ p: 0.5, marginRight: '10px' }}>
                    <ImageIcon sx={{ fontSize: 20, color: iconColor }} />
                    <input type="file" name="imageFile" hidden accept="image/*" onChange={handleSelectImage} />
                  </IconButton>
                  <IconButton type="button" sx={{ p: 0.5, marginRight: '10px' }}>
                    <FmdGoodIcon sx={{ fontSize: 20, color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" sx={{ p: 0.5, marginRight: '10px' }}>
                    <GifBoxIcon sx={{ fontSize: 20, color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" sx={{ p: 0.5, marginRight: '10px' }}>
                    <EditCalendarSharpIcon sx={{ fontSize: 20, color: iconColor }} />
                  </IconButton>
                  <IconButton type="button" sx={{ p: 0.5, marginRight: '10px' }}>
                    <TagFaceIcon sx={{ fontSize: 20, color: iconColor }} />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '9999px',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    backgroundColor: '#1d9bf0',
                    '&:hover': { backgroundColor: '#1a8cd8' },
                    '&:disabled': { backgroundColor: '#8ecdf7', color: 'white' }, // Disable button if no content
                  }}
                  onClick={handleSubmitReply}
                  disabled={replyContent.trim() === "" && !selectedImage || uploadingImage} // Disable if no text/image or uploading
                >
                  {uploadingImage ? 'Uploading...' : 'Reply'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}