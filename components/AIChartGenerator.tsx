import React, { useState } from 'react';
import { generateChart, type ChartConfig } from '@/services/chartService';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';

interface AIChartGeneratorProps {
  onChartGenerated?: (chartConfig: ChartConfig, insight: string) => void;
}

export function AIChartGenerator({ onChartGenerated }: AIChartGeneratorProps) {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide a description for the chart',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateChart(description);
      if (onChartGenerated) {
        onChartGenerated(result.chartConfig, result.insight);
      }
      toast({
        title: 'Success',
        description: 'Chart generated successfully!',
      });
    } catch (error) {
      console.error('Failed to generate chart:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate chart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Chart Generator</CardTitle>
        <CardDescription>
          Describe the chart you want to create and our AI will generate it for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="E.g., 'Show me a line chart of monthly sales performance for 2024' or 'Create a bar chart comparing website traffic across different sources'"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[120px]"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !description.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Chart'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}