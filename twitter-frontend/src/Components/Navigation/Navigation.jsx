import React, { useState, useRef } from 'react';
import { Box, Button, Avatar, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { navigationMenu } from './NavigationMenu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const threeDotsButtonRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    handleClose();
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingX: 1,
        paddingY: 1,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        width: 300,
      }}
    >
      {/* Top: Logo */}
      <Box sx={{ marginBottom: 2, paddingLeft: 2 }}>

        <svg
          height="35"
          width="35"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="text-black"
        >
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </g>
        </svg>
      </Box>

      {/* Middle: Navigation Menu (Takes up remaining space) */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        marginBottom: 0,
        flexGrow: 1, // Allows it to grow and take available vertical space
        overflowY: 'auto', // Enables scrolling if the content overflows
      }}>
        {navigationMenu.map((item, index) => {
          const Icon = item.icon;
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                paddingX: 2,
                paddingY: 1,
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                  cursor: 'pointer',
                },
                transition: 'background-color 0.15s ease-in-out',
              }}
            >
              <Icon fontSize="medium" className="text-gray-800" />
              <span className="text-lg font-medium text-gray-900">{item.title}</span>
            </Box>
          );
        })}
      </Box>

      {/* Bottom: Post Button (Pushed to the bottom) */}
      <Box sx={{ padding: 2, mt: 'auto' }}> {/* mt: 'auto' pushes it to the bottom */}
        <Button
          fullWidth
          sx={{
            borderRadius: '29px',
            paddingY: '12px',
            backgroundColor: '#1d9bf0',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'none',
            gap: 0
          }}
        >
          Post
        </Button>
      </Box>

      {/* Bottom: User Info and Menu (Sticks to the very bottom) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingY: 10,
          paddingX: 2,
          justifyContent: 'space-between',
        }}
      >
        <div className="flex space-x-3 gap-2 py-10">
          <Avatar
            alt="sample user"
            src="https://i.pravatar.cc/150?u=consistentmaleid"
            sx={{ width: 40, height: 40 }}
            className="cursor-pointer"
          />
          <div className='px-5 py-4'>
            <div className="flex flex-col items-center text-sm">
              <span className="font-bold cursor-pointer hover:underline">Sample User</span>
              <span className="text-gray-500 ml-1 cursor-pointer">@sampleuser</span>
            </div>
          </div>
        </div>

        <IconButton
          aria-label="more"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size="small"
          ref={threeDotsButtonRef}
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navigation;