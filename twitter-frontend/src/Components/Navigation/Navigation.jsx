import React, { useState, useRef } from 'react';
import { Box, Button, Avatar, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { navigationMenu } from './NavigationMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
    // Implement your logout logic here
    console.log('Logout clicked');
    handleClose();
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingX: -8,
        paddingY: 2,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        width:300
      }}
    >
      {/* Top: Logo */}
      <Box sx={{ marginBottom: 2, paddingLeft: 2 }}>
        <svg
          height="40"
          width="40"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="text-black"
        >
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </g>
        </svg>
      </Box>

      {/* Middle: Navigation Menu */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 2 }}>
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
                  borderRadius: '50px',
                },
                transition: 'background-color 0.15s ease-in-out',
              }}
            >
              <Icon fontSize="medium" className="text-gray-800" />
              <span className="text-lg font-medium text-gray-900">
                {item.title}
              </span>
            </Box>
          );
        })}
      </Box>

      {/* Bottom: Post Button */}
            <Box sx={{ padding: 2 }}>
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
                    }}
                >
                    Post
                </Button>
            </Box>

      {/* Bottom: Avatar and Username with Three Dots and Menu */}
      <Box sx={{ display: 'flex', alignItems: 'center', paddingY: 2, paddingX:7,  justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src= "https://i.pravatar.cc/150?u=consistentmaleid"
            alt="Amrut"
            sx={{ width: 30, height: 30 }}
          />
          <Typography variant="subtitle2" fontWeight="bold">
              Amrut
          </Typography>
        </Box>
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