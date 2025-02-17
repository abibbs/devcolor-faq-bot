# /dev/color FAQ Chatbot

An AI-powered chatbot that answers Frequently Asked Questions about [/dev/color](https://devcolor.org/) using OpenAI's advanced language models and RAG (Retrieval Augmented Generation) technology.

I opted for a Web Interface so reviewers can demo and interact with the chatbot directly (see [**Demo**](https://github.com/abibbs/devcolor-faq-bot/blob/main/README.md#demo) section below). The chat service contains an API layer which allows it to be extended and consumed via a Command Line Interface (CLI).

## Key Features
- AI-powered responses using OpenAI's language models
- RAG implementation for accurate, context-aware answers
- Vector similarity search with [Pinecone](https://www.pinecone.io/)
- Pre-indexed FAQ database
- Real-time chat interface

## Tech Stack
- Next.js 14 frontend
- OpenAI for natural language processing
- Pinecone for vector database
- Tailwind CSS for styling

## Demo
Try the chatbot online at https://devcolor-faq-bot.vercel.app.

## Example Outputs (Web GUI)
### "How can /dev/color help me develop my career?"
![How can /dev/color help me develop my career?](https://raw.githubusercontent.com/abibbs/devcolor-faq-bot/refs/heads/main/images/screen1.png)
### "How can I contribute to /dev/color?"
![How can I contribute to /dev/color?](https://raw.githubusercontent.com/abibbs/devcolor-faq-bot/refs/heads/main/images/screen2.png)
### "In which cities is /dev/color located?"
![In which cities is /dev/color located?](https://raw.githubusercontent.com/abibbs/devcolor-faq-bot/refs/heads/main/images/screen3.png)

## Getting Started

### Prerequisites
- Node.js v18+
- OpenAI API key
- Pinecone API key

### Installation
```bash
# Clone the repository
git clone git@github.com:abibbs/devcolor-faq-bot.git
cd devcolor-faq-bot

# Install dependencies
npm install
```

Create a `.env.local` file with your API keys:
```env
OPENAI_API_KEY='your_openai_api_key'
PINECONE_API_KEY='your_pinecone_api_key'
PINECONE_ENVIRONMENT='your_pinecone_environment'
PINECONE_INDEX='your_pinecone_index_name'
```

### Development
Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the chatbot.

### Indexing New FAQs
To update the FAQ database:

1. Add new FAQ content to `src/data/devcolorfaq.txt`
2. Run the indexing script:
```bash
npm run index-faq
```

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Pinecone Documentation](https://docs.pinecone.io/)
