// Metric card types
export type MetricTrend = 'up' | 'down';
export type MetricColor = 'primary' | 'success' | 'warning' | 'secondary' | 'error';

export interface Metric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: MetricTrend;
  color: MetricColor;
}

// Layout persistence types
export interface LayoutData {
  metrics: string[];
  timestamp: string;
}

// Service interfaces
export interface IPersistenceService {
  save(key: string, data: any): Promise<boolean>;
  load(key: string): Promise<any>;
}
