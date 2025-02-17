import { PineconeStore } from '@langchain/pinecone';
import { embeddings } from '../lib/openai.js';
import { loadFAQ } from '../lib/faqLoader.js';
import { pineconeIndex } from '../lib/pinecone.js';

async function initializeFAQ() {
  try {
    console.log('Loading FAQ documents...');

    const documents = await loadFAQ();
    console.log(`Loaded ${documents.length} document chunks`);

    console.log('Creating vector store...');
    await PineconeStore.fromDocuments(documents, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    console.log('Successfully uploaded FAQ to Pinecone!');
  } catch (error) {
    console.error('Error initializing FAQ:', error);
  }
}

// Run the initialization
initializeFAQ(); 