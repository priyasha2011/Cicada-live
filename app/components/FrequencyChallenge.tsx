'use client'
import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import styles from './FrequencyChallenge.module.css';
import { useRouter } from 'next/navigation';


const FrequencyChallenge: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (frequency === '17') {
      setAlertMessage('Correct frequency code! Proceeding to the next challenge...');
      // Here you would typically redirect to the next challenge
      // For demo purposes, we'll just show an alert
      router.push('/outoftheworld');
    } else {
      setAlertMessage('Incorrect frequency code. Try again.');
    }
    setShowAlert(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.challengeBox}>
        <h1 className={styles.title}>FREQUENCY</h1>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>Press the play button</h2>
        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <button onClick={handlePlay} className={styles.playButton}>
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        <audio ref={audioRef} src="/cicada.mp3" /> {/* Replace with actual audio file path */}

        {/* <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>Base Number</h2> */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <img src="./images/image.png" alt="Base number" className={styles.baseImage} />
        </div>

        <p className={styles.formulaText}>
          b is α to the ratio in base power
        </p>
        <p className={styles.formulaText}>
          Formula: (base - frequency) * 100
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter frequency code"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>

        {showAlert && (
          <div className={`${styles.alert} ${alertMessage.includes('Correct') ? styles.alertSuccess : styles.alertError}`}>
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FrequencyChallenge;