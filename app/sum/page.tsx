'use client';

import * as React from 'react';
import { styled, keyframes } from '@mui/material/styles';
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

const glitch = keyframes`
  0% {
    clip-path: inset(71% 0 10% 0);
    transform: translate(-2px, 2px);
  }
  10% {
    clip-path: inset(13% 0 55% 0);
    transform: translate(1px, -3px);
  }
  20% {
    clip-path: inset(76% 0 23% 0);
    transform: translate(-1px, 2px);
  }
  30% {
    clip-path: inset(46% 0 3% 0);
    transform: translate(3px, 1px);
  }
  40% {
    clip-path: inset(3% 0 46% 0);
    transform: translate(1px, -1px);
  }
  50% {
    clip-path: inset(82% 0 13% 0);
    transform: translate(-1px, 2px);
  }
  60% {
    clip-path: inset(46% 0 28% 0);
    transform: translate(-2px, -2px);
  }
  70% {
    clip-path: inset(67% 0 11% 0);
    transform: translate(2px, 1px);
  }
  80% {
    clip-path: inset(92% 0 3% 0);
    transform: translate(-1px, 3px);
  }
  90% {
    clip-path: inset(100% 0 1% 0);
    transform: translate(1px, -2px);
  }
  100% {
    clip-path: inset(23% 0 62% 0);
    transform: translate(2px, 2px);
  }
`;

const StyledTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textAlign: 'center',
  fontSize: '6rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  marginBottom: theme.spacing(4),
  fontFamily: '"Courier New", Courier, monospace',
  letterSpacing: '0.5rem',
  '&::before, &::after': {
    content: '"3310"',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  '&::before': {
    left: '2px',
    textShadow: '-2px 0 #ff00c1',
    animation: `${glitch} 2s infinite linear alternate-reverse`,
  },
  '&::after': {
    left: '-2px',
    textShadow: '2px 0 #00fff9',
    animation: `${glitch} 3s infinite linear alternate-reverse`,
  },
}));

const images = [
  { img: './images/pic1.jpg', title: 'Image 1' },
  { img: './images/pic2.jpg', title: 'Image 2' },
  { img: './images/pic3.jpg', title: 'Image 3' },
  { img: './images/pic4.jpg', title: 'Image 4' },
  { img: './images/pic5.jpg', title: 'Image 5' },
  { img: './images/pic6.jpg', title: 'Image 6' },
  { img: './images/pic7.jpg', title: 'Image 7' },
  { img: './images/pic8.jpg', title: 'Image 8' },
  { img: './images/pic9.jpg', title: 'Image 9' },
  { img: './images/pic10.jpg', title: 'Image 10' },
  { img: './images/pic11.jpg', title: 'Image 11' },
  { img: './images/pic12.jpg', title: 'Image 12' },
  { img: './images/pic13.jpg', title: 'Image 13' },
  { img: './images/pic14.jpg', title: 'Image 14' },
  { img: './images/pic15.jpg', title: 'Image 15' },
  { img: './images/pic16.jpg', title: 'Image 16' },
  { img: './images/pic17.jpg', title: 'Image 17' },
  { img: './images/pic18.jpg', title: 'Image 18' },
  { img: './images/pic19.jpg', title: 'Image 19' },
  { img: './images/pic20.jpg', title: 'Image 20' },
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
    <Box sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StyledTitle variant="h1">
        3310
      </StyledTitle>
      <Box sx={{ position: 'relative', my: 2, width: '100%' }}>
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