import React from 'react';
import {
  Box,
  Paper,
  Avatar,
  keyframes,
} from '@mui/material';
import {
  SmartToy as BotIcon,
} from '@mui/icons-material';

const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

const TypingIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#4a9eff',
            width: 32,
            height: 32,
            fontSize: '1rem',
          }}
        >
          <BotIcon />
        </Avatar>
        
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: '20px 20px 20px 4px',
            background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: -8,
              width: 0,
              height: 0,
              borderRight: '8px solid #4a5568',
              borderTop: '8px solid transparent',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#00d4aa',
                  animation: `${bounce} 1.4s infinite ease-in-out`,
                  animationDelay: `${index * 0.16}s`,
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TypingIndicator;
