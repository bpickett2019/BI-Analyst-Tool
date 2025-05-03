import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type ChartConfig } from '@/services/chartService';

declare global {
  interface Window {
    echarts: any;
  }
}

interface AIGeneratedChartProps {
  chartConfig: ChartConfig;
  insight: string;
  className?: string;
}

export function AIGeneratedChart({ chartConfig, insight, className = '' }: AIGeneratedChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current || !chartConfig) return;
    
    // Create chart instance
    const chartInstance = window.echarts.init(chartRef.current);
    
    // Prepare options
    const options = {
      title: {
        text: chartConfig.title,
        subtext: chartConfig.subtitle || '',
        left: 'center',
        top: 0,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: chartConfig.xAxis.type,
        name: chartConfig.xAxis.name,
        data: chartConfig.xAxis.data,
        nameLocation: 'middle',
        nameGap: 30,
      },
      yAxis: {
        type: chartConfig.yAxis.type,
        name: chartConfig.yAxis.name,
        nameLocation: 'middle',
        nameGap: 50,
      },
      series: chartConfig.series.map(series => ({
        name: series.name,
        type: series.type,
        data: series.data,
        color: series.color,
        radius: series.type === 'pie' ? ['40%', '70%'] : undefined,
        label: series.type === 'pie' ? { show: true, formatter: '{b}: {c} ({d}%)' } : undefined,
      })),
      legend: {
        orient: 'horizontal',
        bottom: 0,
      },
    };
    
    // Set options and render
    chartInstance.setOption(options);
    
    // Handle resize
    const resizeListener = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', resizeListener);
    
    // Clean up on unmount
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', resizeListener);
    };
  }, [chartConfig]);
  
  return (
    <Card className={`${className} overflow-hidden`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{chartConfig.title}</CardTitle>
            {chartConfig.subtitle && <CardDescription>{chartConfig.subtitle}</CardDescription>}
          </div>
          <Badge variant="outline" className="text-xs">AI Generated</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-sm italic text-muted-foreground">{insight}</div>
        <div ref={chartRef} className="w-full h-[350px]"></div>
      </CardContent>
    </Card>
  );
}