import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Fade,
} from '@mui/material';
import {
  Person as PersonIcon,
  SmartToy as BotIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageColor = () => {
    if (isError) return '#ff6b6b';
    if (isUser) return '#00d4aa';
    return '#4a9eff';
  };

  const getIcon = () => {
    if (isError) return <ErrorIcon />;
    if (isUser) return <PersonIcon />;
    return <BotIcon />;
  };

  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            gap: 1,
            maxWidth: '70%',
          }}
        >
          <Avatar
            sx={{
              bgcolor: getMessageColor(),
              width: 32,
              height: 32,
              fontSize: '1rem',
            }}
          >
            {getIcon()}
          </Avatar>
          
          <Box>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                background: isUser 
                  ? 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)'
                  : isError
                  ? 'linear-gradient(135deg, #ff6b6b 0%, #e55656 100%)'
                  : 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                color: 'white',
                maxWidth: '100%',
                wordBreak: 'break-word',
                position: 'relative',
                '&::before': isUser ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  right: -8,
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid #00b894',
                  borderTop: '8px solid transparent',
                } : {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: -8,
                  width: 0,
                  height: 0,
                  borderRight: isError ? '8px solid #e55656' : '8px solid #4a5568',
                  borderTop: '8px solid transparent',
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {message.message}
              </Typography>
            </Paper>
            
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                mt: 0.5,
                display: 'block',
                textAlign: isUser ? 'right' : 'left',
              }}
            >
              {formatTime(message.timestamp)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default MessageBubble;
