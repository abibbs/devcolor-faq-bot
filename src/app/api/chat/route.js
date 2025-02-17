import { chatModel, embeddings } from '@/lib/openai';

import { NextResponse } from 'next/server';
import { PineconeStore } from '@langchain/pinecone';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { loadFAQ } from '@/lib/faqLoader';
import { pineconeIndex } from '@/lib/pinecone';

export async function POST(req) {
  try {
    if (!req.body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question must be a non-empty string' },
        { status: 400 }
      );
    }

    // Initialize vector store
    let faqDocs;
    try {
      faqDocs = await loadFAQ();
    } catch (error) {
      console.error('Error loading FAQ:', error);
      return NextResponse.json(
        { error: 'Failed to load FAQ data' },
        { status: 500 }
      );
    }

    let vectorStore;
    try {
      vectorStore = await PineconeStore.fromDocuments(
        faqDocs,
        embeddings,
        {
          pineconeIndex,
        }
      );
    } catch (error) {
      console.error('Error initializing vector store:', error);
      return NextResponse.json(
        { error: 'Failed to initialize search' },
        { status: 500 }
      );
    }

    // Perform similarity search
    let results;
    try {
      results = await vectorStore.similaritySearch(question, 2);
    } catch (error) {
      console.error('Error performing search:', error);
      return NextResponse.json(
        { error: 'Failed to search FAQ database' },
        { status: 500 }
      );
    }

    // Prompt template
    const prompt = PromptTemplate.fromTemplate(
      `Use the following information from the /dev/color FAQ to answer the user's question.
      If you don't know the answer, just say that you don't know.

      Context: {context}

      Question: {question}

      Answer:`
    );

    // Generate response
    let response;

    try {
      const parser = new StringOutputParser();
      const formattedPrompt = await prompt.format({
        context: results.map(r => r.pageContent).join('\n'),
        question,
      });

      response = await chatModel.pipe(parser).invoke(formattedPrompt);
    } catch (error) {
      console.error('Error generating response:', error);
      return NextResponse.json(
        { error: 'Failed to generate answer' },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer: response });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}