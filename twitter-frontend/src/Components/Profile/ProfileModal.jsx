import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  TextField,
  Stack,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useFormik } from 'formik';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

export default function ProfileModal({ open, handleClose, initialProfileData }) {
  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fullName: initialProfileData?.fullName || '',
      website: initialProfileData?.website || '',
      location: initialProfileData?.location || '',
      bio: initialProfileData?.bio || '',
      backgroundImage: initialProfileData?.backgroundImage || '',
      profileImage: initialProfileData?.profileImage || '',
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const handleImageChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      formik.setFieldValue(fieldName, tempUrl);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        {/* Modal Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid #e0e0e0',
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleClose} aria-label="close" size="small">
              <CloseIcon />
            </IconButton>
            <Typography id="profile-modal-title" variant="h6" component="h2" sx={{ ml: 2, fontWeight: 'bold' }}>
              Edit profile
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: '9999px',
              textTransform: 'none',
              bgcolor: 'black',
              '&:hover': { bgcolor: '#333' },
            }}
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Box>

        {/* Form Content Area (Scrollable) */}
        <form onSubmit={formik.handleSubmit} style={{ flexGrow: 1, overflowY: 'auto' }}>
          <Box sx={{ p: 2 }}>
            {/* We will adjust the spacing for the Stack or its children individually */}
            <Stack spacing={2}> {/* Reduced default spacing for a tighter layout */}

              {/* Background Image Upload */}
              <Box
                position="relative"
                width="100%"
                height="180px"
                bgcolor="grey.200"
                sx={{ borderRadius: 1 }}
                overflow="hidden"
              >
                {formik.values.backgroundImage ? (
                  <img
                    src={formik.values.backgroundImage}
                    alt="Banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Box display="flex" alignItems="center" justifyContent="center" height="100%" bgcolor="grey.100">
                    <Typography variant="body2" color="text.secondary">
                      No banner image
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.2)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <IconButton
                    component="label"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.7)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                    }}
                  >
                    <CameraAltOutlinedIcon />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'backgroundImage')}
                    />
                  </IconButton>
                </Box>
              </Box>

              {/* Profile Image Upload (Avatar) - positioned to overlap the banner */}
              {/* Removed redundant 'top' from Avatar itself. 'mt' on parent Box is enough. */}
              <Box sx={{ mt: -8, ml: 2 }}>
                <Avatar
                  src={formik.values.profileImage || '/default-pfp.jpg'}
                  alt={formik.values.fullName || 'Profile Picture'}
                  sx={{
                    width: '7rem',
                    height: '7rem',
                    border: '4px solid white',
                    bgcolor: 'grey.300',
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover .overlay': { opacity: 1 },
                    mt:-10
                  }}
                  className="cursor-pointer shadow-md"
                >
                  {!formik.values.profileImage && (
                    <Typography variant="caption" color="text.secondary">
                      No PFP
                    </Typography>
                  )}
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(0,0,0,0.4)',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <IconButton
                      component="label"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.7)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                        p: 0.5,
                      }}
                    >
                      <CameraAltOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'profileImage')}
                      />
                    </IconButton>
                  </Box>
                </Avatar>
              </Box>

              {/* Text Fields */}
              <TextField
                fullWidth
                label="Name"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                variant="filled"
                size="small"
                // Removed sx={{ mt: 12 }} here.
                // The Stack's spacing or individual negative margin will handle it.
                sx={{ mt: -6 }} // Apply a small negative margin to pull it closer to the Avatar
              />
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={3}
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
                variant="filled"
                size="small"
              />
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
                variant="filled"
                size="small"
              />
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
                variant="filled"
                size="small"
              />
            </Stack>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}