# MCP Client Test Application

## Features
- 🎨 **Chat Interface**: Modern, responsive UI with Material-UI components
- 🔄 **Real-time Communication**: WebSocket-based chat using Socket.IO
- 🤖 **MCP Integration**: Server connects to MCP servers using the mcp-use-ts library
- 🌙 **Dark Theme**: Beautiful dark theme with gradient backgrounds
- ⚡ **Real-time Typing Indicators**: Shows when the AI is processing responses
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend (Client)
- React 18
- Material-UI (MUI) for components
- Socket.IO Client for real-time communication
- Custom animations and transitions

### Backend (Server)
- Node.js with Express
- Socket.IO for WebSocket connections
- MCP-Use library for MCP server integration
- Environment-based configuration

## Project Structure

```
mern-mcp-chat/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.js
│   │   │   ├── MessageBubble.js
│   │   │   └── TypingIndicator.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── server/                 # Express backend
│   ├── index.js           # Main server file
│   ├── .env               # Environment variables
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Installation & Setup

### 1. **Install Dependencies**

**Install root dependencies:**
```bash
npm install
```

**Install server dependencies:**
```bash
cd server
npm install
cd ..
```

**Install client dependencies:**
```bash
cd client
npm install
cd ..
```

### 2. **Environment Configuration**

Configure your environment variables in `server/.env`:

```env
PORT=5010
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here

# MCP Server Configuration
FILESYSTEM_PATH=/Path/for/mcp/server/to/access/
MAILGUN_SERVER_PATH=/path/mailgun-mcp-server/src
MAILGUN_API_KEY=your_mailgun_api_key_here
```

**Required Environment Variables:**
- `OPENAI_API_KEY`: Your OpenAI API key for GPT-4 integration
- `FILESYSTEM_PATH`: Path for filesystem MCP server access
- `MAILGUN_SERVER_PATH`: Path to your Mailgun MCP server
- `MAILGUN_API_KEY`: Your Mailgun API key

### 3. **MCP Server Configuration**

The application uses three MCP servers configured in `server/config.js`:
- **Playwright**: Web automation and scraping
- **Filesystem**: File system operations
- **Mailgun**: Email sending capabilities

Ensure the paths in your environment variables are correct for your system.

## Running the Application

### Method 1: Run Both Services Concurrently (Recommended)
```bash
npm run dev
```
This will start both the React client (port 3010) and Express server (port 5010) simultaneously.

### Method 2: Run Services Individually

**Terminal 1 - Start the Server:**
```bash
cd server
npm run dev
```
Server will start on: `http://localhost:5010`

**Terminal 2 - Start the Client:**
```bash
cd client
npm start
```
Client will start on: `http://localhost:3010`

### Accessing the Application
- **Web Interface**: Open `http://localhost:3010` in your browser
- **Server API**: Available at `http://localhost:5010`
- **WebSocket Connection**: Automatically established between client and server

## Usage

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Open your browser to:** `http://localhost:3010`

3. **Start chatting!** The AI assistant will:
   - Use GPT-4 for intelligent responses
   - Access MCP tools for advanced functionality:
     - **File operations** (read, write, search files)
     - **Web automation** (browse websites, extract data)
     - **Email sending** (via Mailgun integration)
   - Show real-time connection status
   - Display typing indicators during processing

4. **Example prompts to try:**
   - "List the files in my project directory"
   - "Send an email to [email] with subject 'Hello'"
   - "Browse to google.com and tell me what you see"
   - "Create a new file called test.txt with some content"

## MCP Server Configuration

The application uses an intelligent agent (`server/agent.js`) that orchestrates multiple MCP servers:

### Current MCP Servers:
1. **Playwright MCP** - Web automation and scraping
2. **Filesystem MCP** - File system operations
3. **Mailgun MCP** - Email sending capabilities

### Adding New MCP Servers:
1. Update `server/config.js` with your new server configuration
2. Add any required environment variables to `server/.env`
3. The agent will automatically discover and use new tools

### Example Configuration:
```javascript
// In server/config.js
mcpServers: {
  myNewServer: {
    command: "npx",
    args: ["my-mcp-server@latest"],
    env: {
      "API_KEY": process.env.MY_API_KEY
    }
  }
}
```

## API Architecture

### WebSocket Events:
- **`chat_message`** - Send a message to the server
  ```javascript
  socket.emit('chat_message', {
    message: 'Your message here',
    userId: 'unique_user_id'
  });
  ```

- **`chat_response`** - Receive responses from the server
  ```javascript
  socket.on('chat_response', (data) => {
    // data.type: 'user' | 'assistant' | 'error'
    // data.message: string
    // data.timestamp: ISO string
    // data.userId: string
  });
  ```

### MCP Agent Flow:
1. User sends message via WebSocket
2. Server processes message with MCP Agent
3. Agent determines which MCP tools to use
4. Agent executes tools and generates response
5. Response sent back to client via WebSocket

## Customization

### Theme
The app uses a custom dark theme. You can modify colors in `client/src/App.js`:

```javascript
const darkTheme = createTheme({
  palette: {
    primary: { main: '#00d4aa' }, // Customize primary color
    // ... other theme options
  }
});
```

### Chat Interface
Customize the chat interface by modifying components in `client/src/components/`:
- `ChatInterface.js` - Main chat container and logic
- `MessageBubble.js` - Individual message styling
- `TypingIndicator.js` - Animated typing indicator

### Server Configuration
Modify server behavior in:
- `server/agent.js` - MCP agent and LLM configuration
- `server/config.js` - MCP server configurations
- `server/index.js` - Express server and WebSocket handling

## Troubleshooting

### Common Issues:

1. **Port Already in Use**:
   ```bash
   # Kill processes using the ports
   lsof -ti :3010 | xargs kill -9
   lsof -ti :5010 | xargs kill -9
   ```

2. **Connection Issues**:
   - Ensure server is running on port 5010
   - Check that client is connecting to the correct server URL
   - Verify WebSocket connection in browser dev tools

3. **MCP Server Errors**:
   - Check server console for MCP initialization errors
   - Verify all environment variables are set correctly
   - Ensure MCP server paths exist and are accessible

4. **OpenAI API Issues**:
   - Verify your `OPENAI_API_KEY` is valid and has sufficient credits
   - Check API rate limits if requests are failing

5. **Dependency Issues**:
   - If you encounter peer dependency conflicts, use:
     ```bash
     npm install --legacy-peer-deps
     ```

6. **UI Issues**:
   - Clear browser cache and restart development server
   - Check browser console for JavaScript errors
   - Ensure all client dependencies are installed

### Debug Mode:
To see detailed logs, set `NODE_ENV=development` in your `.env` file.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.
