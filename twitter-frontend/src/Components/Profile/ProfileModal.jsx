import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  TextField, // Import TextField for input fields
  Stack,    // Import Stack for easy spacing of elements
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600, md: 700 }, // Responsive width
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2, // Slightly rounded corners
  boxShadow: 24,
  p: 4,
  outline: 'none',
  maxHeight: '90vh', // Prevent modal from overflowing screen
  overflowY: 'auto', // Enable scrolling if content is too long
};

export default function ProfileModal({ open, handleClose }) { // Accept open and handleClose props
  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
    // Here you would typically send these values to your backend to update the profile
    handleClose(); // Close the modal after submission
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      website: '',
      location: '',
      bio: '',
      backgroundImage: '', // For banner image upload
      profileImage: '',    // For profile picture upload (renamed from 'image' for clarity)
    },
    onSubmit: handleSubmit,
  });

  // Helper function to handle image changes for background and profile
  const handleImageChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue(fieldName, URL.createObjectURL(file));
      // In a real application, you'd upload the file and store its URL
    }
  };

  return (
    <Modal
      open={open} // Use the 'open' prop to control visibility
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}> {/* Use Stack for vertical spacing */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <IconButton onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography id="profile-modal-title" variant="h6" component="h2" ml={2}>
                  Edit Profile
                </Typography>
              </Box>
              <Button type="submit" variant="contained" sx={{ borderRadius: '9999px' }}>
                Save
              </Button>
            </Box>

            {/* Background Image Upload */}
            <Box position="relative" width="100%" height="150px" bgcolor="grey.200" borderRadius={1} overflow="hidden">
              {formik.values.backgroundImage ? (
                <img
                  src={formik.values.backgroundImage}
                  alt="Banner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" justifyContent="center" height="100%">
                  No banner image
                </Typography>
              )}
              <Button
                component="label"
                sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
              >
                Upload Banner
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'backgroundImage')}
                />
              </Button>
            </Box>

            {/* Profile Image Upload */}
            <Box position="relative" width="100px" height="100px" borderRadius="50%" bgcolor="grey.300" overflow="hidden" mt={-6} ml={2}>
              {formik.values.profileImage ? (
                <img
                  src={formik.values.profileImage}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" justifyContent="center" height="100%" textAlign="center">
                  No PFP
                </Typography>
              )}
              <Button
                component="label"
                sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: '50%', minWidth: 0, width: 30, height: 30, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'profileImage')}
                />
              </Button>
            </Box>


            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
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
            />
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}