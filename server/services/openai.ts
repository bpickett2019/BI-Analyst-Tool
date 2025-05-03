import OpenAI from "openai";
import { log } from "../vite";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Custom error type for proper typing
interface ErrorWithMessage {
  message: string;
}

// Define chart types
type ChartType = 'line' | 'bar' | 'pie' | 'scatter' | 'area';

// Chart configuration structure
export interface ChartConfig {
  type: ChartType;
  title: string;
  subtitle?: string;
  xAxis: {
    type: string;
    name: string;
    data: any[];
  };
  yAxis: {
    type: string;
    name: string;
  };
  series: Array<{
    name: string;
    type: ChartType;
    data: number[];
    color?: string;
  }>;
}

// Function to generate a chart configuration from a description
export async function generateChartConfig(
  description: string
): Promise<ChartConfig> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a chart generation assistant. Generate ECharts configuration based on the user's description.
          You should return a JSON object with the following structure:
          {
            "type": "line", // one of: line, bar, pie, scatter, area
            "title": "Chart Title",
            "subtitle": "Optional subtitle",
            "xAxis": {
              "type": "category",
              "name": "X-Axis Name",
              "data": ["Category1", "Category2", "Category3", ...] // actual data for the x-axis
            },
            "yAxis": {
              "type": "value",
              "name": "Y-Axis Name"
            },
            "series": [
              {
                "name": "Series Name",
                "type": "line", // can be same or different from the main chart type
                "data": [100, 200, 300, ...], // numerical data for this series
                "color": "#4f46e5" // optional color in hex format
              },
              // Additional series if needed
            ]
          }
          
          Generate realistic and representative data based on the description. Make the chart informative and insightful.
          The data should tell a story related to the user's description.
          Use between 5-10 data points per series for clarity.
          Choose appropriate colors that work well together.`,
        },
        {
          role: "user",
          content: description,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    // Parse and return the chart configuration
    const result = JSON.parse(response.choices[0].message.content || "{}");
    log(`Generated chart config for: ${description.substring(0, 50)}...`, "openai");
    return result;
  } catch (error: any) {
    log(`Error generating chart config: ${error.message}`, "openai");
    throw new Error(`Failed to generate chart: ${error.message}`);
  }
}

// Function to generate an AI insight about a chart or data
export async function generateInsight(
  chartConfig: ChartConfig
): Promise<string> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a data insight assistant. Generate a brief, insightful observation about the chart data provided.
          Keep it concise (max 100 characters) and focus on the most interesting pattern or insight from the data.
          Make it sound professional and data-driven.`,
        },
        {
          role: "user",
          content: `Generate an insight about this chart: ${JSON.stringify(chartConfig)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    return response.choices[0].message.content || "No insight available";
  } catch (error: any) {
    log(`Error generating insight: ${error.message}`, "openai");
    return "Unable to generate insight at this time";
  }
}