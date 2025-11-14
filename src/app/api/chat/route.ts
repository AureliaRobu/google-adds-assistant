import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { tools, executeTool, systemPrompt } from '@/lib/claude-tools';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({
          error: 'ANTHROPIC_API_KEY is not set. Please add it to your .env file.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Track structured display data
    const structuredData: any[] = [];

    // Start the conversation with Claude
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      system: systemPrompt,
      tools: tools,
      messages: messages,
    });

    // Handle tool calls in a loop until we get a final response
    while (response.stop_reason === 'tool_use') {
      // Find ALL tool uses in this response
      const toolUses = response.content.filter((block) => block.type === 'tool_use');

      if (toolUses.length === 0) break;

      // Continue the conversation with the tool result
      messages.push({
        role: 'assistant',
        content: response.content,
      });

      // Execute all tools and create tool results
      const toolResults = toolUses.map((toolUse: any) => {
        const toolResult = executeTool(toolUse.name, toolUse.input);

        // If it's a display tool, save the structured data
        if (toolUse.name === 'display_structured_data') {
          structuredData.push(toolUse.input);
        }

        return {
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: JSON.stringify(toolResult),
        };
      });

      messages.push({
        role: 'user',
        content: toolResults,
      });

      // Get the next response
      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4096,
        system: systemPrompt,
        tools: tools,
        messages: messages,
      });
    }

    // Extract text response
    const textContent = response.content.find((block) => block.type === 'text');
    const text = textContent && textContent.type === 'text' ? textContent.text : '';

    return new Response(
      JSON.stringify({
        message: text,
        structuredData: structuredData.length > 0 ? structuredData : undefined,
        usage: response.usage,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred while processing your request',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
