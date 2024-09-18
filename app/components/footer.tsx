'use client'
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#001a00',
                color: '#33ff00',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                bottom: 0,
                zIndex: 10,
            }}
        >
            <img 
                src="./images/techno.jpg" 
                alt="Technogreen Solutions Limited" 
                style={{ width: '50px', height: '50px', marginRight: '10px' }} 
            />
            <Typography variant="body1">
                Sponsored by Techknowgreen Solutions Limited
            </Typography>
        </Box>
    );
};

export default Footer;