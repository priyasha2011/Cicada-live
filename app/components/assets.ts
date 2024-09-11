export async function handleTeamNumberSubmit(teamNumber: string): Promise<any> {
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

    return await response.json();
  } catch (error) {
    console.error('Error submitting team number:', error);
    throw error;
  }
}