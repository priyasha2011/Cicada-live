'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ImageClickHandler from '../components/ImageClickHandler';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

const images = [
  { img: '/image1.jpg', title: 'Image 1' },
  { img: '/image2.jpg', title: 'Image 2' },
  { img: '/image3.jpg', title: 'Image 3' },
  { img: '/image4.jpg', title: 'Image 4' },
  { img: '/image5.jpg', title: 'Image 5' },
  { img: '/image6.jpg', title: 'Image 6' },
  { img: '/image7.jpg', title: 'Image 7' },
  { img: '/image8.jpg', title: 'Image 8' },
  { img: '/image9.jpg', title: 'Image 9' },
  { img: '/image10.jpg', title: 'Image 10' },
  { img: '/image11.jpg', title: 'Image 11' },
  { img: '/image12.jpg', title: 'Image 12' },
  { img: '/image13.jpg', title: 'Image 13' },
  { img: '/image14.jpg', title: 'Image 14' },
  { img: '/image15.jpg', title: 'Image 15' },
  { img: '/image16.jpg', title: 'Image 16' },
  { img: '/image17.jpg', title: 'Image 17' },
  { img: '/image18.jpg', title: 'Image 18' },
  { img: '/image19.jpg', title: 'Image 19' },
  { img: '/image20.jpg', title: 'Image 20' },
];

export default function Sum() {
  const [startIndex, setStartIndex] = React.useState(0);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 5));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 5, images.length - 20));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        3310
      </Typography>
      <Box sx={{ position: 'relative', my: 2 }}>
        <IconButton
          onClick={handlePrev}
          disabled={startIndex === 0}
          sx={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)' }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Grid container spacing={2}>
          {images.slice(startIndex, startIndex + 20).map((item, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <ImageClickHandler index={startIndex + index}>
                <Item>
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '3/2' }}
                  />
                  <Typography variant="caption">{item.title}</Typography>
                </Item>
              </ImageClickHandler>
            </Grid>
          ))}
        </Grid>
        <IconButton
          onClick={handleNext}
          disabled={startIndex >= images.length - 20}
          sx={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)' }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}