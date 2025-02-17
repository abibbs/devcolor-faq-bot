import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import path from 'path';
import { readFileSync } from 'fs';

export async function loadFAQ() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/devcolorfaq.txt');
    const fileContent = readFileSync(filePath, 'utf-8');
    
    if (!fileContent) {
      throw new Error('FAQ file is empty');
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 20,
    });

    return await splitter.createDocuments([fileContent]);

  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FAQ file not found');
    }
    console.error('Error loading FAQ:', error);
    throw new Error('Failed to load FAQ content');
  }
} 