import { ChatOpenAI } from "@langchain/openai";
import { MCPAgent, MCPClient } from "mcp-use";
import "dotenv/config";
import config from "./config.js";

const client = MCPClient.fromDict(config);
export const llm = new ChatOpenAI({ modelName: "gpt-4o" });
export const agent = new MCPAgent({ llm, client, maxSteps: 20 });
