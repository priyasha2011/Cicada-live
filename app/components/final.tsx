import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const FinalMessage: React.FC = () => {
  const [message, setMessage] = useState('');
  const finalMessage = `Hello Dr. Cesare Lombroso

The research has been done, I have collected my
samples the mind liquidation and data storage will
soon begin, the best samples have been elected and
rest have been eliminated. Oracle will transfer you
the control of Ai command center.

Good night Dr. Lombroso`;

  useEffect(() => {
    let index = 0;
    let currentMessage = '';
    const typeWriter = () => {
      if (index < finalMessage.length) {
        currentMessage += finalMessage.charAt(index);
        setMessage(currentMessage);
        index++;
        setTimeout(typeWriter, 50);
      }
    };
    typeWriter();
  }, []);

  return (
    <>
      <Head>
        <title>Oracle - Final Message</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-effect" 
           style={{
             backgroundImage: "url('../images/greenstar.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }}>
        <div className="absolute inset-0 bg-gradsient-radial"></div>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="max-w-3xl w-full bg-black bg-opacity-60 p-8 rounded-lg border border-green-400 shadow-lg shadow-green-400/50 relative z-10 backdrop-blur-sm">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-green-400 mb-2">Oracle Final Message</h1>
            <div className="w-full h-1 bg-green-400 rounded"></div>
          </div>
          <p className="text-green-400 text-xl whitespace-pre-wrap font-mono leading-relaxed glowing-text">
            {message}
          </p>
        </div>
      </div>
      <style jsx global>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff; }
          50% { text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        body {
          margin: 0;
          padding: 0;
          background: #000;
          color: #0ff;
          font-family: 'Courier New', Courier, monospace;
          text-align: center;
          overflow: hidden;
        }
        .glowing-text {
          animation: glow 2s ease-in-out infinite;
        }
        .float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-effect {
          position: relative;
        }
        .bg-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0.3) 100%),
            linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.2)),
            linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.2));
          background-size: 100% 100%, 60px 60px, 60px 60px;
          background-position: 0 0, 30px 30px, 30px 30px;
          animation: pulse 4s infinite alternate;
          z-index: 1;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
          z-index: 2;
        }
        .bg-grid {
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          z-index: 3;
        }
      `}</style>
    </>
  );
};

export default FinalMessage;