// Define an interface for the expected response structure
interface TeamNumberResponse {
  ans: string;  // Changed from a function to a string
  success: boolean;
  message: string;
  data?: {
    teamInfo?: string;
    // ... other properties
  };
}

export async function handleTeamNumberSubmit(teamNumber: string): Promise<TeamNumberResponse> {
  try {
    // Trim whitespace and remove any non-digit characters
    const cleanedNumber = teamNumber.trim().replace(/\D/g, '');

    // If the cleaned input is empty, use a default value or throw an error
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