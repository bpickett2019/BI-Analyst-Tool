import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartConfig } from '@/services/chartService';
import { AIChartGenerator } from './AIChartGenerator';
import { AIGeneratedChart } from './AIGeneratedChart';
import { PlusIcon } from '@radix-ui/react-icons';

interface RecommendedInsightsProps {
  className?: string;
}

export function RecommendedInsights({ className = '' }: RecommendedInsightsProps) {
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatedCharts, setGeneratedCharts] = useState<Array<{ config: ChartConfig; insight: string }>>([]);
  
  const handleChartGenerated = (config: ChartConfig, insight: string) => {
    setGeneratedCharts(prev => [...prev, { config, insight }]);
    setShowGenerator(false);
  };
  
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recommended Insights</CardTitle>
        <CardDescription>
          AI-powered chart recommendations based on your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {generatedCharts.length === 0 && !showGenerator ? (
          <div className="text-center p-8">
            <p className="text-muted-foreground mb-4">
              No recommended insights yet. Generate your first insight with AI.
            </p>
            <Button onClick={() => setShowGenerator(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Generate Insight
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {generatedCharts.map((chart, i) => (
              <AIGeneratedChart 
                key={i}
                chartConfig={chart.config}
                insight={chart.insight}
              />
            ))}
            
            {showGenerator ? (
              <div className="mt-6">
                <AIChartGenerator onChartGenerated={handleChartGenerated} />
              </div>
            ) : (
              <div className="mt-6 flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowGenerator(true)}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Generate Another Insight
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}