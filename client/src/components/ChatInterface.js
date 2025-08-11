import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Fade,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Circle as OnlineIcon,
} from '@mui/icons-material';
import io from 'socket.io-client';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatInterface = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userId] = useState(`user_${Date.now()}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5010');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    newSocket.on('chat_response', (data) => {
      setMessages(prev => [...prev, data]);
      if (data.type === 'assistant') {
        setIsTyping(false);
      }
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socket || !isConnected) return;

    const messageData = {
      message: inputMessage,
      userId: userId,
    };

    socket.emit('chat_message', messageData);
    setInputMessage('');
    setIsTyping(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      }}
    >
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 0,
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 212, 170, 0.2)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: '#00d4aa' }}>
              <BotIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                MCP Chat Assistant
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Powered by Model Context Protocol
              </Typography>
            </Box>
          </Box>
          <Tooltip title={isConnected ? 'Connected' : 'Disconnected'}>
            <Chip
              icon={<OnlineIcon sx={{ fontSize: '12px !important' }} />}
              label={isConnected ? 'Online' : 'Offline'}
              color={isConnected ? 'success' : 'error'}
              size="small"
              variant="outlined"
            />
          </Tooltip>
        </Box>
      </Paper>

      {/* Messages Container */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.length === 0 && (
          <Fade in timeout={1000}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                opacity: 0.7,
              }}
            >
              <BotIcon sx={{ fontSize: 64, mb: 2, color: '#00d4aa' }} />
              <Typography variant="h5" gutterBottom>
                Welcome to MCP Chat
              </Typography>
            </Box>
          </Fade>
        )}

        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 0,
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(0, 212, 170, 0.2)',
        }}
      >
        <Box display="flex" gap={1} alignItems="flex-end">
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            disabled={!isConnected}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover fieldset': {
                  borderColor: '#00d4aa',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00d4aa',
                },
              },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || !isConnected}
            sx={{
              bgcolor: '#00d4aa',
              color: 'white',
              '&:hover': {
                bgcolor: '#00b894',
              },
              '&:disabled': {
                bgcolor: 'rgba(0, 212, 170, 0.3)',
              },
            }}
          >
            {isTyping ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatInterface;
