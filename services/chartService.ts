export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'scatter' | 'area';
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
    type: 'line' | 'bar' | 'pie' | 'scatter' | 'area';
    data: number[];
    color?: string;
  }>;
}

export interface ChartGenerationResponse {
  chartConfig: ChartConfig;
  insight: string;
}

/**
 * Generates a chart configuration from a natural language description using AI
 */
export async function generateChart(description: string): Promise<ChartGenerationResponse> {
  const response = await fetch('/api/charts/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to generate chart: ${response.statusText}`);
  }
  
  return await response.json();
}