import React, { useState } from 'react';
import { Avatar, Button, CircularProgress, Divider } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFaceIcon from '@mui/icons-material/TagFaces';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

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

  return (
    <Box
      className="space-y-5 divide-y divide-gray-200"
      sx={{
        paddingRight: 2,
        paddingLeft:1,
        paddingTop:1,
      }}
    >

      {/* Header with Tabs */}

      <Box sx={{
        position: 'sticky',
        top: '2px', // Tailwind `top-1` = 0.25rem = 4px
        bgcolor: 'white',
        zIndex: 10,
        backdropFilter: 'blur(8px)', // approximate blur
        backgroundColor: 'rgba(255, 255, 255, 1)', // to mimic bg-opacity-100
        marginBottom:2
      }}>
        {/* Tabs */}
        <div className="flex">
          <div
            className={`flex-1 text-center py-4 font-medium cursor-pointer transition-colors ${activeTab === 'for-you' ? 'font-bold border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('for-you')}
          >
            For you
          </div>
          <div
            className={`flex-1 text-center py-4 font-medium cursor-pointer transition-colors ${activeTab === 'following' ? 'font-bold border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </div>
          <div
            className={`flex-1 text-center py-4 font-medium cursor-pointer transition-colors ${activeTab === 'grok' ? 'font-bold border-b-4 border-blue-1000' : 'text-gray-600'}`}
            onClick={() => setActiveTab('grok')}
          >
            Grok
          </div>
          <div
            className={`flex-1 text-center py-4 font-medium cursor-pointer transition-colors ${activeTab === 'buildinpublic' ? 'font-bold border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('buildinpublic')}
          >
            Build In Public
          </div>
        </div>
      </Box>

      {/* Divider with margin-bottom */}
      <Box sx={{ height: '1px', backgroundColor: 'grey.200', mt: 1 }}></Box>

      {/* Tweet Box  */}
      <Box sx={{ mt: 2, ml:1 }}> {/* Increased margin-top to 8 */}
        <Box className="flex items-start space-x-3">
          <Avatar
            alt="user"
            src="https://i.pravatar.cc/150?u=consistentmaleid"
            sx={{ width: 40, height: 40 , mr:1  }}
          />

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1005px' }}>
            <form onSubmit={formik.handleSubmit} className="w-full">
                            <textarea
                              name="content"
                              placeholder="What's happening?"
                              className={`
               w-full text-lg bg-transparent
              placeholder-gray-500 focus:outline-none min-h-[70px]
              border-none resize-none  
             `}

                              style={{ resize: "none" , marginTop:5 , fontSize:20 }}
                              {...formik.getFieldProps("content")}
                            />


              {formik.touched.content && formik.errors.content && (
                <div className="text-red-500 text-sm mb-2">{formik.errors.content}</div>
              )}

              {/* Image Preview */}
              {selectedImage && (
                <div className="mt-2 relative">
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 rounded-full p-1 cursor-pointer"
                       onClick={handleRemoveImage}>
                    <CloseIcon fontSize="small" sx={{ color: 'white' }} />
                  </div>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected preview"
                    className="rounded-2xl max-h-80 object-cover border border-gray-100"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-1 text-[#1d9bf0]">
                  <label className="p-2 rounded-full cursor-pointer hover:bg-blue-50 transition-colors">
                    <ImageIcon sx={{ fontSize: "20px" }} />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                      accept="image/*"
                    />
                  </label>
                  <button type="button" className="p-2 rounded-full hover:bg-blue-50 transition-colors">
                    <FmdGoodIcon sx={{ fontSize: "20px" }} />
                  </button>
                  <button type="button" className="p-2 rounded-full hover:bg-blue-50 transition-colors">
                    <TagFaceIcon sx={{ fontSize: "20px" , ml:23}} />
                  </button>
                </div>

                <Button
                  type="submit"
                  sx={{
                    borderRadius: '9999px',
                    padding: '6px 16px',
                    minWidth: '80px',
                    backgroundColor: '#1d9bf0',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1a8cd8',
                    },
                    '&:disabled': {
                      backgroundColor: '#8ecdf7',
                      color: 'white',
                    }
                  }}
                  disabled={uploadingImage || !formik.values.content.trim() || formik.values.content.length > 280}
                >
                  {uploadingImage ? (
                    <CircularProgress size={16} sx={{ color: 'white' }} />
                  ) : (
                    'Post'
                  )}
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Box>

      {/* Feed Divider */}
      <div className="h-px bg-gray-200 mt-3"></div>

      {/* Sample Tweet - for demonstration */}
      <div className="space-x-5 hover:bg-gray-50  border-b border-gray-200">
        <div className="flex space-x-3">
          <Avatar
            alt="sample user"
            src="https://i.pravatar.cc/150?u=anotheruser"
            sx={{ width: 40, height: 40 }}
            className="cursor-pointer"
          />
          <div>
            <div className="flex items-center text-sm">
              <span className="font-bold cursor-pointer">Sample User</span>
              <span className="text-gray-500 ml-1 cursor-pointer">@sampleuser·12m</span>
            </div>
            <div className="mt-1">
              Just posted a tweet using our new Twitter clone interface!
              <span className="text-blue-500">#ReactJS</span>
              <span className="text-blue-500">#MaterialUI</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default HomeSection;
