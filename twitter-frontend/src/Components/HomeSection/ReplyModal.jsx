// src/Components/HomeSection/ReplyModal.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton } from "@mui/material"; // Import IconButton
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 2, // Reduced padding to match the image's tighter layout
  outline: 'none',
  borderRadius: 4, // More rounded corners like Twitter
};

export default function ReplyModal({ open, onClose, tweet }) {
  if (!tweet) {
    return null;
  }

  const currentUserAvatar = 'https://i.pravatar.cc/150?u=current_user'; // Placeholder for current user's avatar

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
            {/* The "Drafts" text is optional and might be part of a larger drafting feature */}
            <Typography variant="body2" color="textSecondary" sx={{cursor:'pointer'}}>Drafts</Typography>
          </Box>

          {/* Original Tweet (reduced visual emphasis as it's the context for reply) */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', mb: 1 }}>
            <Avatar alt={tweet.user || 'User'} src={tweet.avatar} sx={{ width: 40, height: 40, mr: 1, mt: 0.5 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography fontWeight="bold" sx={{ mr: 0.5, fontSize: '0.9rem' }}>{tweet.user}</Typography>
                <Typography color="textSecondary" sx={{ mr: 0.5, fontSize: '0.85rem' }}>@{tweet.username}</Typography>
                <Typography color="textSecondary" fontSize="small">· {tweet.time}</Typography>
              </Box>
              <Typography variant="body2" sx={{ wordBreak: 'break-word', fontSize: '0.9rem', color: 'text.primary' }}>
                {tweet.content}
              </Typography>
            </Box>
          </Box>

          {/* "Replying to" text */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: '48px', mb: 2 }}> {/* Adjust margin-left to align with reply avatar */}
            <Typography variant="body2" color="textSecondary" fontSize="small">
              Replying to <Typography component="span" color="primary" fontSize="small">@{tweet.username}</Typography>
            </Typography>
          </Box>

          {/* Reply input section */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
            <Avatar alt="Current User" src={currentUserAvatar} sx={{ width: 40, height: 40, mr: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <textarea
                placeholder="Post your reply" // Updated placeholder text
                rows={3} // Adjust rows as needed
                style={{
                  width: '100%',
                  border: 'none', // Remove border for a cleaner look
                  outline: 'none', // Remove outline on focus
                  padding: '10px 0', // Adjust padding
                  fontSize: '1.2rem', // Larger font size for input
                  resize: 'none', // Prevent manual resizing
                  fontFamily: 'inherit',
                  minHeight: '80px', // Ensure a minimum height for the text area
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                {/* Icons for attachments */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {/* These are placeholder icons. You'd replace them with actual IconButton components. */}
                  <IconButton size="small"><span role="img" aria-label="image">🖼️</span></IconButton>
                  <IconButton size="small"><span role="img" aria-label="gif">GIF</span></IconButton>
                  <IconButton size="small"><span role="img" aria-label="poll">📊</span></IconButton>
                  <IconButton size="small"><span role="img" aria-label="emoji">😊</span></IconButton>
                  <IconButton size="small"><span role="img" aria-label="schedule">📅</span></IconButton>
                  <IconButton size="small"><span role="img" aria-label="location">📍</span></IconButton>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '9999px',
                    textTransform: 'none',
                    px: 3, // Horizontal padding
                    py: 1, // Vertical padding
                    backgroundColor: '#1d9bf0', // Twitter blue
                    '&:hover': { backgroundColor: '#1a8cd8' },
                  }}
                  onClick={() => console.log('Reply submitted!')}
                >
                  Reply
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}