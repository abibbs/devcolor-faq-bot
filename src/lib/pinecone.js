import { Pinecone } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_API_KEY) {
  throw new Error('PINECONE_API_KEY environment variable is not set');
}

const INDEX_NAME = 'devcolor-rag';

// Initialize Pinecone instance
let pineconeInstance;

try {

  pineconeInstance = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

} catch (error) {
  console.error('Failed to initialize Pinecone:', error);
  throw new Error('Failed to initialize Pinecone client');
}

let pineconeIndex;

try {
  pineconeIndex = pineconeInstance.Index(INDEX_NAME);
  
  // Simple operation to validate index exists
  await pineconeIndex.describeIndexStats();

} catch (error) {
  console.error(`Failed to initialize Pinecone index "${INDEX_NAME}":`, error);
  throw new Error(`Failed to initialize Pinecone index "${INDEX_NAME}"`);
}

export { pineconeIndex }; 