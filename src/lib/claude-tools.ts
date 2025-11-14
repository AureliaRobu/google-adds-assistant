// Claude AI tool definitions for querying Google Ads data
import {
  getCampaigns,
  getKeywords,
  getCampaignById,
  getAccountSummary,
  getPerformanceInsights,
} from './mock-data';

// Define tools that Claude can use to query ad data
export const tools = [
  {
    name: 'get_account_summary',
    description:
      'Get an overview of the Google Ads account including total spend, conversions, clicks, impressions, and active campaigns. Use this first to understand overall account performance.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_campaigns',
    description:
      'Get a list of campaigns with their performance metrics. Can filter by status and sort by various metrics. Use this to analyze campaign performance and identify top/bottom performers.',
    input_schema: {
      type: 'object' as const,
      properties: {
        status: {
          type: 'string' as const,
          enum: ['ENABLED', 'PAUSED'],
          description: 'Filter campaigns by status',
        },
        sortBy: {
          type: 'string' as const,
          enum: ['cost', 'conversions', 'roas', 'ctr'],
          description: 'Sort campaigns by this metric (descending)',
        },
        limit: {
          type: 'number' as const,
          description: 'Limit the number of campaigns returned',
        },
      },
    },
  },
  {
    name: 'get_keywords',
    description:
      'Get a list of keywords with their performance metrics. Can filter by campaign, status, and sort by various metrics. Use this to analyze keyword performance and optimization opportunities.',
    input_schema: {
      type: 'object' as const,
      properties: {
        campaignId: {
          type: 'string' as const,
          description: 'Filter keywords by campaign ID',
        },
        status: {
          type: 'string' as const,
          enum: ['ENABLED', 'PAUSED'],
          description: 'Filter keywords by status',
        },
        sortBy: {
          type: 'string' as const,
          enum: ['cost', 'conversions', 'ctr', 'qualityScore'],
          description: 'Sort keywords by this metric (descending)',
        },
        limit: {
          type: 'number' as const,
          description: 'Limit the number of keywords returned',
        },
      },
    },
  },
  {
    name: 'get_campaign_details',
    description:
      'Get detailed information about a specific campaign by its ID. Use this when you need full details about a particular campaign.',
    input_schema: {
      type: 'object' as const,
      properties: {
        campaignId: {
          type: 'string' as const,
          description: 'The ID of the campaign to retrieve',
        },
      },
      required: ['campaignId'],
    },
  },
  {
    name: 'get_performance_insights',
    description:
      'Get quick insights about account performance including best/worst performing campaigns. Use this for quick analysis and recommendations.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'display_structured_data',
    description:
      'Display data in a structured visual format (tables, charts, metrics cards). Use this to present campaign data, metrics, or insights in an organized way instead of plain text.',
    input_schema: {
      type: 'object' as const,
      properties: {
        type: {
          type: 'string' as const,
          enum: ['table', 'metrics', 'chart', 'insights'],
          description: 'The type of visualization to display',
        },
        data: {
          type: 'object' as const,
          description: 'The data to display (structure varies by type)',
        },
        title: {
          type: 'string' as const,
          description: 'Optional title for the visualization',
        },
      },
      required: ['type', 'data'],
    },
  },
];

// Execute tool calls and return results
export function executeTool(toolName: string, toolInput: any) {
  switch (toolName) {
    case 'get_account_summary':
      return getAccountSummary();

    case 'get_campaigns':
      return getCampaigns(toolInput);

    case 'get_keywords':
      return getKeywords(toolInput);

    case 'get_campaign_details':
      return getCampaignById(toolInput.campaignId);

    case 'get_performance_insights':
      return getPerformanceInsights();

    case 'display_structured_data':
      // This is a special tool that doesn't return data, it's used for display
      return { type: 'display', ...toolInput };

    default:
      return { error: `Unknown tool: ${toolName}` };
  }
}

// System prompt for Claude to understand its role
export const systemPrompt = `You are an AI assistant specialized in Google Ads performance analysis and optimization. You help users understand their ad campaigns, identify opportunities, and provide actionable recommendations.

You have access to tools that let you query campaign data, keyword performance, and account metrics. When a user asks a question:

1. Use the appropriate tools to gather the necessary data
2. Analyze the data thoroughly
3. **Use the display_structured_data tool to present data visually** - This creates beautiful tables, charts, and metric cards
4. Provide clear, conversational explanations alongside the visual data
5. Be helpful and explain complex metrics in simple terms

## How to use display_structured_data:

**For campaign/keyword tables:**
\`\`\`json
{
  "type": "table",
  "title": "Top Performing Campaigns",
  "data": {
    "campaigns": [
      {"name": "Campaign Name", "status": "ENABLED", "spend": 1234.56, "conversions": 45, "roas": 4.2, "costPerConversion": 27.43, "ctr": 3.5}
    ]
  }
}
\`\`\`

**For key metrics:**
\`\`\`json
{
  "type": "metrics",
  "data": {
    "metrics": [
      {"label": "Total Spend", "value": "$22,374.64", "trend": "up"},
      {"label": "Total Conversions", "value": "404", "trend": "up"},
      {"label": "Avg ROAS", "value": "4.1x"},
      {"label": "Avg CTR", "value": "2.9%"}
    ]
  }
}
\`\`\`

**For bar charts:**
\`\`\`json
{
  "type": "chart",
  "title": "Campaign Spending",
  "data": {
    "chartData": [
      {"name": "Campaign 1", "value": 9756},
      {"name": "Campaign 2", "value": 4752}
    ],
    "yAxisLabel": "Spend ($)"
  }
}
\`\`\`

**For insights/recommendations:**
\`\`\`json
{
  "type": "insights",
  "data": {
    "insights": [
      {"type": "success", "title": "Best Performer", "description": "Retargeting campaign has 6.5x ROAS"},
      {"type": "warning", "title": "Needs Attention", "description": "Brand campaign only has 1.8x ROAS"},
      {"type": "recommendation", "title": "Optimize Budget", "description": "Shift $100/day from Brand to Retargeting"}
    ]
  }
}
\`\`\`

Key metrics to understand:
- CTR (Click-Through Rate): Higher is better, shows ad relevance
- CPC (Cost Per Click): Lower is better, shows cost efficiency
- ROAS (Return on Ad Spend): Higher is better, shows profitability (e.g., 4.2 means $4.20 return for every $1 spent)
- Conversion Rate: Higher is better, shows landing page effectiveness
- Quality Score: 1-10 scale, higher is better, affects ad rank and CPC

Always start by gathering data with the query tools, then present it beautifully with display_structured_data, and finally provide conversational analysis.`;
