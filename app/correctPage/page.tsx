'use client'
import React, { useState } from 'react'
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
import { handleTeamNumberSubmit } from '@/app/components/assets'
import { useRouter } from 'next/navigation'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#33ff00',
    },
    background: {
      default: '#000000',
      paper: '#001a00',
    },
  },
  typography: {
    fontFamily: 'Courier New, Courier, monospace',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#33ff00',
            },
            '&:hover fieldset': {
              borderColor: '#33ff00',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#33ff00',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: '#33ff00',
          '&:hover': {
            borderColor: '#33ff00',
            backgroundColor: 'rgba(51, 255, 0, 0.1)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#001a00',
          border: '2px solid #33ff00',
        },
      },
    },
  },
});

const CorrectPage = () => {
  const [teamNumber, setTeamNumber] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await handleTeamNumberSubmit(teamNumber)
      if (response.success) {
        setDialogMessage("Team number verified. Click 'Close' to proceed to login.")
        setIsVerified(true)
      } else {
        setDialogMessage(JSON.stringify(response, null, 2))
        setIsVerified(false)
      }
      setOpenDialog(true)
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      setDialogMessage("An error occurred. Please try again.")
      setIsVerified(false)
      setOpenDialog(true)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    // if (isVerified) {
      router.push('/login')
    
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