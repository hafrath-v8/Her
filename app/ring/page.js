'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RingPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [yourName, setYourName] = useState('Hafrath');
  const [herName, setHerName] = useState('Azra👸🐣');

 const fullMessage = [
'You came into my life so unexpectedly… but it feels so right.',
'I’ll always be genuine and true for you.',
'One day, in shaa Allah, when the time is right…',
'When Allah writes it beautifully for us…',
'I’ll come to you the halal way.',
'With a ring, with my family, and with certainty.',
'Until then, take care of this heart of mine.🤍',
];


  useEffect(() => {
    if (isOpen && textIndex < fullMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + (prev ? '\n\n' : '') + fullMessage[textIndex]);
        setTextIndex(prev => prev + 1);
        
        if (textIndex === fullMessage.length - 1) {
          setTimeout(() => setShowAcceptButton(true), 500);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, textIndex]);

  const openBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
  };

  const acceptPromise = () => {
    setIsAccepted(true);
    localStorage.setItem('promiseAccepted', 'true');
    localStorage.setItem('promiseDate', new Date().toISOString());
    
    // Celebration vibration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100, 50, 500]);
    }
    
    // Generate sparkles
    const newSparkles = [];
    for (let i = 0; i < 30; i++) {
      newSparkles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 10 + Math.random() * 20,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 2,
      });
    }
    setSparkles(newSparkles);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Stars Background */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: 'white',
            borderRadius: '50%',
            opacity: 0.3 + Math.random() * 0.7,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          style={{
            position: 'absolute',
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            fontSize: `${sparkle.size}px`,
            animation: `sparkleBurst ${sparkle.duration}s ease-out ${sparkle.delay}s forwards`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          ✨
        </div>
      ))}

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '16px',
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        ←
      </button>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1,
        gap: '24px',
      }}>
        {/* Title */}
        <h2 style={{
          color: '#ffd700',
          fontSize: '1.8rem',
          textShadow: '0 0 20px rgba(255,215,0,0.5)',
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          A Promise For You 💍
        </h2>

        {/* Ring Box */}
        <div style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Box Body */}
          <div style={{
            width: '150px',
            height: '100px',
            background: 'linear-gradient(180deg, #8B0000 0%, #5c0000 100%)',
            borderRadius: '10px',
            position: 'relative',
            border: '3px solid #ffd700',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,215,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Ring Inside */}
            {isOpen && (
              <div style={{
                animation: 'ringRise 0.8s ease forwards',
                fontSize: '4rem',
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.8))',
              }}>
                💍
              </div>
            )}
          </div>
          
          {/* Box Lid */}
          <div style={{
            position: 'absolute',
            top: isOpen ? '-80px' : '0px',
            width: '160px',
            height: '40px',
            background: 'linear-gradient(180deg, #a00000 0%, #8B0000 100%)',
            borderRadius: '10px 10px 0 0',
            border: '3px solid #ffd700',
            borderBottom: 'none',
            transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
            boxShadow: '0 -5px 15px rgba(0,0,0,0.3)',
            zIndex: 5,
          }}>
            {/* Lid Bow */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '1.5rem',
              filter: 'drop-shadow(0 0 5px rgba(255,215,0,0.5))',
            }}>
              🎀
            </div>
          </div>

          {/* Glow effect when closed */}
          {!isOpen && (
            <div style={{
              position: 'absolute',
              width: '170px',
              height: '120px',
              borderRadius: '10px',
              background: 'transparent',
              boxShadow: '0 0 40px rgba(255,215,0,0.4), inset 0 0 20px rgba(255,215,0,0.2)',
              animation: 'pulseGlow 2s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
          )}
        </div>

        {/* Open Button */}
        {!isOpen && (
          <button
            onClick={openBox}
            style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)',
              border: 'none',
              borderRadius: '30px',
              padding: '16px 40px',
              color: '#1a1a2e',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 5px 20px rgba(255,215,0,0.4)',
              animation: 'pulseButton 2s ease-in-out infinite',
            }}
          >
            OPEN 💍
          </button>
        )}

        {/* Typewriter Text */}
        {isOpen && (
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid rgba(255,215,0,0.3)',
            maxWidth: '350px',
            width: '100%',
            minHeight: '200px',
          }}>
            <p style={{
              color: '#ffd700',
              fontSize: '1rem',
              lineHeight: '1.8',
              margin: 0,
              whiteSpace: 'pre-line',
              textShadow: '0 0 10px rgba(255,215,0,0.3)',
            }}>
              {displayedText}
              {textIndex < fullMessage.length && (
                <span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
              )}
            </p>
          </div>
        )}

        {/* Accept Button */}
        {showAcceptButton && !isAccepted && (
          <button
            onClick={acceptPromise}
            style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
              border: 'none',
              borderRadius: '30px',
              padding: '16px 40px',
              color: '#1a1a2e',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 5px 20px rgba(255,215,0,0.4)',
              animation: 'pulseButton 1.5s ease-in-out infinite',
            }}
          >
            I Accept This Promise 💕
          </button>
        )}

        {/* Certificate */}
        {isAccepted && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,215,0,0.1) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px 24px',
            border: '2px solid #ffd700',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(255,215,0,0.3)',
            animation: 'certificateAppear 0.6s ease',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>💍</div>
            <h3 style={{
              color: '#ffd700',
              fontSize: '1.3rem',
              marginBottom: '16px',
              textShadow: '0 0 10px rgba(255,215,0,0.5)',
            }}>
              PROMISED
            </h3>
            <div style={{
              borderTop: '1px solid rgba(255,215,0,0.4)',
              borderBottom: '1px solid rgba(255,215,0,0.4)',
              padding: '16px 0',
              marginBottom: '12px',
            }}>
              <p style={{ color: 'white', fontSize: '1.1rem', margin: '4px 0' }}>{herName}</p>
              <p style={{ color: '#ffd700', fontSize: '1.5rem', margin: '4px 0' }}>&</p>
              <p style={{ color: 'white', fontSize: '1.1rem', margin: '4px 0' }}>{yourName}</p>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '4px' }}>
              {formattedDate}
            </p>
            <p style={{
              color: '#ffd700',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              marginTop: '12px',
            }}>
              "Not yet. But one day. Always In sha Allah."
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.7rem',
              marginTop: '16px',
            }}>
              Screenshot this. One day we'll look back and smile.
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes ringRise {
          0% { transform: translateY(30px) scale(0.5); opacity: 0; }
          60% { transform: translateY(-10px) scale(1.1); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(255,215,0,0.4), inset 0 0 20px rgba(255,215,0,0.2); }
          50% { box-shadow: 0 0 60px rgba(255,215,0,0.7), inset 0 0 30px rgba(255,215,0,0.4); }
        }
        @keyframes pulseButton {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes sparkleBurst {
          0% { transform: scale(1) translate(0, 0); opacity: 1; }
          100% { transform: scale(0) translate(${Math.random() > 0.5 ? '' : '-'}50px, ${Math.random() > 0.5 ? '' : '-'}50px); opacity: 0; }
        }
        @keyframes certificateAppear {
          0% { transform: scale(0.5) rotate(-5deg); opacity: 0; }
          70% { transform: scale(1.02) rotate(1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}