// Interface for the API response
'use client'
interface TeamNumberResponse {
  ans: string;
  success: boolean;
  message: string;
  data?: {
    teamInfo?: string;
    // ... other properties
  };
}

// handleTeamNumberSubmit function
export async function handleTeamNumberSubmit(teamNumber: string): Promise<TeamNumberResponse> {
  try {
    const cleanedNumber = teamNumber.trim().replace(/\D/g, '');

    if (cleanedNumber === '') {
      throw new Error('Please enter a valid team number');
    }

    const response = await fetch('https://cicada-backend.vercel.app/dajfi/n', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ num: cleanedNumber }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as TeamNumberResponse;
  } catch (error) {
    console.error('Error submitting team number:', error);
    throw error;
  }
}

// CorrectPage component
'use client'
import React, { useEffect, useState } from 'react'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  ThemeProvider, 
  createTheme,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

import { useRouter } from 'next/navigation'

// Create darkTheme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#33ff00',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
});

const CorrectPage = () => {
  useEffect(() => {
    // ... (existing useEffect code remains the same)
  }, []);

  const [teamNumber, setTeamNumber] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await handleTeamNumberSubmit(teamNumber)
      if (response.success) {
        setDialogMessage(response.ans)
      } else {
        setDialogMessage(response.message || "An error occurred. Please try again.")
      }
      setOpenDialog(true)
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      setDialogMessage("An error occurred. Please try again.")
      setOpenDialog(true)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    router.push('/sum')
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: 'background.default',
          padding: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            borderRadius: 2,
            border: '2px solid #33ff00',
            backgroundColor: 'background.paper',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
            3310
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            id="teamNumber"
            label="Team Number"
            name="teamNumber"
            autoFocus
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
            sx={{ 
              input: { color: 'primary.main' },
              label: { color: 'primary.main' }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: 'primary.main' }}>Response</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'primary.main', whiteSpace: 'pre-wrap' }}>
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: 'primary.main' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default CorrectPage