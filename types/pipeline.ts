export type PipelineStatus = 'running' | 'paused' | 'failed';

export interface PipelineRun {
  id: string;
  status: 'success' | 'failed';
  timestamp: string;
  duration: string;
  recordsProcessed: number;
}

export interface PipelineDataSource {
  name: string;
  icon: string;
  type?: string;
  entities: string[];
}

export interface PipelineDestination {
  name: string;
  type: string;
  icon?: string;
}

export interface PipelineTransformation {
  id?: string;
  description: string;
}

export interface PipelineNotification {
  type: string;
  recipients: string[];
}

export interface PipelineDependency {
  id: string;
  name: string;
}

export interface PipelineSchedule {
  description: string;
  typicalDuration: string;
  type?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  status: PipelineStatus;
  icon: string;
  iconBg: string;
  lastRun: string;
  lastRunDuration: string;
  successRate: number;
  schedule: PipelineSchedule;
  tags: string[];
  dataSources: PipelineDataSource[];
  destination: PipelineDestination;
  transformations: PipelineTransformation[];
  notifications: PipelineNotification[];
  history: PipelineRun[];
  dependencies: {
    upstream: PipelineDependency[];
    downstream: PipelineDependency[];
  };
}