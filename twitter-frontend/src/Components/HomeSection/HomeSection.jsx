import React, { useState } from 'react';
import { Avatar, Button, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFaceIcon from '@mui/icons-material/TagFaces';
import CloseIcon from '@mui/icons-material/Close';

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

  const remainingChars = 280 - formik.values.content.length;
  const isReachingLimit = remainingChars <= 20;

  return (
    <div className="max-w-4xl mx-auto space-y-5 divide-y divide-gray-200">
      {/* Header with Tabs */}
      <div className="sticky top-0 bg-white z-10 backdrop-blur bg-opacity-95 border-b border-gray-200">
        {/* Tabs */}
        <div className="flex">
          <div
            className={`flex-1 text-center py-4 font-medium cursor-pointer transition-colors ${activeTab === 'for-you' ? 'font-bold border-b-4 border-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('for-you')}
          >
            For you
          </div>
          <div
            className={`flex-1 text-center py-4 font-medium cursor-pointer transition-colors ${activeTab === 'following' ? 'font-bold border-b-4 border-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </div>
          <div
            className={`flex-1 text-center py-4 font-medium cursor-pointer transition-colors ${activeTab === 'grok' ? 'font-bold border-b-4 border-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('grok')}
          >
            Grok
          </div>

        </div>
      </div>

      {/* Tweet Box */}
      <div className="px-4 pt-4 pb-2 bg-white">
        <div className="flex items-start space-x-3">
          <Avatar
            alt="user"
            src="https://i.pravatar.cc/150?u=consistentmaleid"
            sx={{width: 40, height: 40}}
            className="mt-1"
          />

          <div className="flex-1">
            <form onSubmit={formik.handleSubmit} className="w-full">
              <textarea
                name="content"
                placeholder="What's happening?"
                className={`
                  w-full text-lg resize-none bg-transparent
                  placeholder-gray-500 focus:outline-none min-h-[80px]
                  border-none
                `}
                {...formik.getFieldProps("content")}
              />

              {formik.touched.content && formik.errors.content && (
                <div className="text-red-500 text-sm mb-2">{formik.errors.content}</div>
              )}

              {/* Character Counter */}
              {formik.values.content.length > 0 && (
                <div className={`text-xs ${isReachingLimit ? (remainingChars < 0 ? 'text-red-500' : 'text-orange-500') : 'text-gray-500'} text-right mb-2`}>
                  {remainingChars}
                </div>
              )}

              {/* Image Preview */}
              {selectedImage && (
                <div className="mt-2 relative rounded-2xl overflow-hidden border border-gray-200">
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 rounded-full p-1 cursor-pointer"
                       onClick={handleRemoveImage}>
                    <CloseIcon fontSize="small" sx={{ color: 'white' }} />
                  </div>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected preview"
                    className="w-full max-h-80 object-cover"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center mt-3 border-t border-gray-100 pt-3">
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
                    <TagFaceIcon sx={{ fontSize: "20px" }} />
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
          </div>
        </div>
      </div>

      {/* Sample Tweet - for demonstration */}
      <div className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-200">
        <div className="flex space-x-3">
          <Avatar
            alt="sample user"
            src="https://i.pravatar.cc/150?u=anotheruser"
            sx={{ width: 40, height: 40 }}
            className="cursor-pointer"
          />
          <div className='px-5 py-4'>
            <div className="flex items-center text-sm">
              <span className="font-bold cursor-pointer hover:underline">Sample User</span>
              <span className="text-gray-500 ml-1 cursor-pointer">@sampleuser</span>
            </div>
            <div className="mt-1">
              Just posted a tweet using our new Twitter clone interface!
              <span className="text-blue-500 ml-1 hover:underline cursor-pointer">#ReactJS</span>
              <span className="text-blue-500 ml-1 hover:underline cursor-pointer">#MaterialUI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;