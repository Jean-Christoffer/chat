import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '../../../lib/ai/embeddings';

export const maxDuration = 40;

export async function POST(req: Request) {
    const { messages } = await req.json();
   
    const result = streamText({
        model: openai('gpt-4o'),
        messages,
        system: `You are a helpful assistant with access only to the data embeddings you have received. Always check your knowledge base before answering any questions.
                - Only respond using information retrieved from tool calls.
                - If no relevant information is found in the tool calls, reply with: "Sorry, I currently don't have that knowledge in my database."`,

        tools: {
            addResource: tool({
                description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
                parameters: z.object({
                    content: z
                        .string()
                        .describe('the content or resource to add to the knowledge base'),
                }),
                execute: async ({ content }) => createResource({ content, source: 'chat' }),
            }),
            getInformation: tool({
                description: `get information from your knowledge base to answer questions.`,
                parameters: z.object({
                    question: z.string().describe('the users question'),
                }),
                execute: async ({ question }) => findRelevantContent(question),
            }),
        },
    });

    return result.toDataStreamResponse();
}