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

const images = Array.from({ length: 20 }, (_, i) => ({
  img: `https://source.unsplash.com/random/300x200?sig=${i}`,
  title: `Image ${i + 1}`,
}));

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
        3301
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
              <ImageClickHandler>
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