const config = {
    mcpServers: {
      playWright: {
        command: "npx",
        args: ["@playwright/mcp@latest"],
      },
      filesystem: {
        command: "npx",
        args: [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          process.env.FILESYSTEM_PATH || "/Users/suryaalapati/mcp_examples/",
        ],
      },
      mailgun: {
        "command": "node",
        "args": [`${process.env.MAILGUN_SERVER_PATH}/mailgun-mcp.js`],
        "env": {
          "MAILGUN_API_KEY": process.env.MAILGUN_API_KEY
        }
      },
    },
  };
  
  export default config;
  