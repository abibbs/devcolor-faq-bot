import { ChatOpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from '@langchain/openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

// Include retry logic
const COMMON_CONFIG = {
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000,
};

export const embeddings = new OpenAIEmbeddings({
  ...COMMON_CONFIG,
  modelName: 'text-embedding-ada-002',
  stripNewLines: true, // Clean text for better embeddings
});

export const chatModel = new ChatOpenAI({
  ...COMMON_CONFIG,
  modelName: 'gpt-3.5-turbo',
  maxTokens: 1024,
  temperature: 0.7,
  streaming: false,
}); 