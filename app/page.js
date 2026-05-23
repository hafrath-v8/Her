'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [petals, setPetals] = useState([]);
  const [herName, setHerName] = useState('');
  const [yourName, setYourName] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // REPLACE THESE with actual names
    setHerName('Pondaatti👸🐣');
    setYourName('Purusan');
    
    setTimeout(() => setShowContent(true), 500);
    
    // Generate falling petals
    const newPetals = [];
    for (let i = 0; i < 30; i++) {
      newPetals.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: 10 + Math.random() * 15,
        emoji: Math.random() > 0.5 ? '🌸' : '💕',
      });
    }
    setPetals(newPetals);
  }, []);

  const cards = [
    {
      emoji: '🤗',
      title: 'Hug Me',
      description: 'Press and hold for a warm embrace',
      subtext: 'The longer you hold, the tighter the hug',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      route: '/hug',
      buttonColor: '#e74c3c',
    },
    {
      emoji: '😘',
      title: 'Kiss Me',
      description: 'Press and hold for a sweet kiss',
      subtext: 'The longer you hold, the deeper the kiss',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      route: '/kiss',
      buttonColor: '#c0392b',
    },
    {
      emoji: '💍',
      title: 'A Promise...',
      description: 'Open something special',
      subtext: 'No pressure. Just my heart.',
      gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
      route: '/ring',
      buttonColor: '#d4a017',
    },
  ];

  if (!showContent) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #a18cd1 100%)',
        color: 'white',
        fontSize: '2rem',
      }}>
        💕
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ff9a9e 0%, #fad0c4 30%, #a18cd1 70%, #fbc2eb 100%)',
      padding: '20px 16px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Falling Petals */}
      {petals.map(petal => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            left: `${petal.left}%`,
            top: '-30px',
            fontSize: `${petal.size}px`,
            animation: `fall ${petal.duration}s linear ${petal.delay}s infinite`,
            opacity: 0.7,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {petal.emoji}
        </div>
      ))}

      {/* Header */}
      <div style={{
        textAlign: 'center',
        paddingTop: '40px',
        paddingBottom: '30px',
        position: 'relative',
        zIndex: 1,
      }}>
        <h1 style={{
          fontSize: '2.2rem',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          marginBottom: '8px',
          animation: 'fadeIn 1s ease',
        }}>
          For You, {herName} 💕
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.9)',
          animation: 'fadeIn 1.5s ease',
        }}>
          I made you something special... choose where to start
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {cards.map((card, index) => (
          <div
            key={card.title}
            onClick={() => router.push(card.route)}
            style={{
              background: card.gradient,
              borderRadius: '20px',
              padding: '28px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              animation: `slideUp 0.6s ease ${0.2 * index}s both`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '12px' }}>{card.emoji}</div>
            <h2 style={{
              color: 'white',
              fontSize: '1.6rem',
              marginBottom: '8px',
              textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
            }}>
              {card.title}
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '0.95rem',
              marginBottom: '4px',
            }}>
              {card.description}
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.8rem',
              marginBottom: '16px',
              fontStyle: 'italic',
            }}>
              {card.subtext}
            </p>
            <button
              style={{
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.5)',
                borderRadius: '25px',
                padding: '12px 32px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              Open {card.emoji}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.7)',
        marginTop: '30px',
        fontSize: '0.85rem',
        position: 'relative',
        zIndex: 1,
      }}>
        Made with love by {yourName} ❤️
      </p>

      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-30px) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}