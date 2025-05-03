import { Pipeline, PipelineRun } from "../types/pipeline";

// Mock data for pipeline demonstrations
const mockPipelines: Pipeline[] = [
  {
    id: "1",
    name: "Salesforce Daily Sync",
    description: "This pipeline syncs Salesforce CRM data to your data warehouse on a daily schedule, including contacts, opportunities, and accounts.",
    icon: "ri-database-2-line",
    iconBg: "bg-blue-100 text-blue-600",
    status: "running",
    lastRun: "Today at 09:15 AM",
    lastRunDuration: "4m 12s",
    successRate: 98.2,
    schedule: {
      type: "daily",
      description: "Every day at 9:00 AM",
      typicalDuration: "3-5 minutes"
    },
    tags: ["Salesforce", "CRM", "Daily"],
    dataSources: [
      {
        name: "Salesforce API",
        type: "CRM",
        icon: "ri-database-2-line",
        entities: ["Contacts (all fields)", "Opportunities (all fields)", "Accounts (all fields)"]
      }
    ],
    destination: {
      name: "Snowflake - Analytics Schema",
      type: "Data Warehouse",
      icon: "ri-database-2-line"
    },
    transformations: [
      { id: "t1", description: "Date formatting standardization" },
      { id: "t2", description: "Currency conversion to USD" },
      { id: "t3", description: "Contact data anonymization" }
    ],
    notifications: [
      {
        type: "Email on failure",
        recipients: ["data-team@company.com"]
      }
    ],
    history: [
      {
        id: "run-1",
        timestamp: "Today at 09:15 AM",
        status: "success",
        duration: "4m 12s",
        recordsProcessed: 1248
      },
      {
        id: "run-2",
        timestamp: "Yesterday at 09:00 AM",
        status: "success",
        duration: "3m 58s",
        recordsProcessed: 1235
      },
      {
        id: "run-3",
        timestamp: "Apr 8, 2025 at 09:00 AM",
        status: "success",
        duration: "4m 05s",
        recordsProcessed: 1242
      }
    ],
    dependencies: {
      upstream: [],
      downstream: [
        { id: "dep-1", name: "Sales Dashboard Refresh" },
        { id: "dep-2", name: "Customer 360 Data Update" }
      ]
    }
  },
  {
    id: "2",
    name: "E-commerce Orders ETL",
    description: "Transforms order data for analytics and reporting purposes.",
    icon: "ri-shopping-cart-line",
    iconBg: "bg-purple-100 text-purple-600",
    status: "paused",
    lastRun: "Yesterday at 11:42 PM",
    lastRunDuration: "12m 38s",
    successRate: 94.7,
    schedule: {
      type: "hourly",
      description: "Hourly",
      typicalDuration: "10-15 minutes"
    },
    tags: ["E-commerce", "Orders", "ETL"],
    dataSources: [
      {
        name: "Shopify API",
        type: "E-commerce",
        icon: "ri-shopping-cart-line",
        entities: ["Orders", "Customers", "Products"]
      }
    ],
    destination: {
      name: "BigQuery - Analytics",
      type: "Data Warehouse",
      icon: "ri-database-2-line"
    },
    transformations: [
      { id: "t4", description: "Order status normalization" },
      { id: "t5", description: "Customer data enrichment" },
      { id: "t6", description: "Revenue attribution" }
    ],
    notifications: [
      {
        type: "Email on failure",
        recipients: ["ecommerce-team@company.com"]
      }
    ],
    history: [
      {
        id: "run-1",
        timestamp: "Yesterday at 11:42 PM",
        status: "success",
        duration: "12m 38s",
        recordsProcessed: 2467
      },
      {
        id: "run-2",
        timestamp: "Yesterday at 10:00 PM",
        status: "success",
        duration: "11m 52s",
        recordsProcessed: 2390
      }
    ],
    dependencies: {
      upstream: [
        { id: "dep-1", name: "Product Catalog Update" }
      ],
      downstream: [
        { id: "dep-2", name: "Sales Dashboard Refresh" }
      ]
    }
  },
  {
    id: "3",
    name: "Google Analytics Import",
    description: "Imports website analytics data for reporting and analysis.",
    icon: "ri-google-line",
    iconBg: "bg-red-100 text-red-600",
    status: "failed",
    lastRun: "Today at 03:22 AM",
    lastRunDuration: "2m 15s",
    successRate: 76.3,
    schedule: {
      type: "daily",
      description: "Daily at 3:00 AM",
      typicalDuration: "2-4 minutes"
    },
    tags: ["Analytics", "Google", "Daily"],
    dataSources: [
      {
        name: "Google Analytics API",
        type: "Analytics",
        icon: "ri-google-line",
        entities: ["Website Traffic", "User Behavior", "Conversion Data"]
      }
    ],
    destination: {
      name: "Snowflake - Marketing Schema",
      type: "Data Warehouse",
      icon: "ri-database-2-line"
    },
    transformations: [
      { id: "t7", description: "UTM parameter normalization" },
      { id: "t8", description: "Traffic source categorization" }
    ],
    notifications: [
      {
        type: "Email on failure",
        recipients: ["marketing-team@company.com"]
      }
    ],
    history: [
      {
        id: "run-1",
        timestamp: "Today at 03:22 AM",
        status: "failed",
        duration: "2m 15s",
        recordsProcessed: 0
      },
      {
        id: "run-2",
        timestamp: "Yesterday at 03:00 AM",
        status: "success",
        duration: "3m 10s",
        recordsProcessed: 18452
      }
    ],
    dependencies: {
      upstream: [],
      downstream: [
        { id: "dep-1", name: "Marketing Dashboard Update" }
      ]
    }
  },
  {
    id: "4",
    name: "Customer Support Data",
    description: "Processes Zendesk ticket data for customer support analytics.",
    icon: "ri-customer-service-2-line",
    iconBg: "bg-green-100 text-green-600",
    status: "running",
    lastRun: "Today at 10:45 AM",
    lastRunDuration: "3m 52s",
    successRate: 99.1,
    schedule: {
      type: "custom",
      description: "Every 6 hours",
      typicalDuration: "3-5 minutes"
    },
    tags: ["Zendesk", "Support", "Tickets"],
    dataSources: [
      {
        name: "Zendesk API",
        type: "Customer Support",
        icon: "ri-customer-service-2-line",
        entities: ["Tickets", "Agents", "Customers", "Satisfaction Scores"]
      }
    ],
    destination: {
      name: "PostgreSQL - Support Database",
      type: "Database",
      icon: "ri-database-2-line"
    },
    transformations: [
      { id: "t9", description: "Ticket categorization" },
      { id: "t10", description: "Response time calculation" },
      { id: "t11", description: "SLA compliance monitoring" }
    ],
    notifications: [
      {
        type: "Email on failure",
        recipients: ["support-team@company.com"]
      }
    ],
    history: [
      {
        id: "run-1",
        timestamp: "Today at 10:45 AM",
        status: "success",
        duration: "3m 52s",
        recordsProcessed: 847
      },
      {
        id: "run-2",
        timestamp: "Today at 04:45 AM",
        status: "success",
        duration: "3m 41s",
        recordsProcessed: 723
      }
    ],
    dependencies: {
      upstream: [],
      downstream: [
        { id: "dep-1", name: "Support Team Dashboard" },
        { id: "dep-2", name: "Customer Health Score Update" }
      ]
    }
  },
  {
    id: "5",
    name: "Email Campaign Analytics",
    description: "Processes Mailchimp campaign data for marketing analytics.",
    icon: "ri-mail-line",
    iconBg: "bg-yellow-100 text-yellow-600",
    status: "running",
    lastRun: "Today at 08:30 AM",
    lastRunDuration: "2m 18s",
    successRate: 97.5,
    schedule: {
      type: "weekly",
      description: "Weekly on Monday",
      typicalDuration: "2-3 minutes"
    },
    tags: ["Email", "Marketing", "Campaigns"],
    dataSources: [
      {
        name: "Mailchimp API",
        type: "Email Marketing",
        icon: "ri-mail-line",
        entities: ["Campaigns", "Subscribers", "Click Data", "Open Rates"]
      }
    ],
    destination: {
      name: "Snowflake - Marketing Schema",
      type: "Data Warehouse",
      icon: "ri-database-2-line"
    },
    transformations: [
      { id: "t12", description: "Email engagement scoring" },
      { id: "t13", description: "Campaign performance metrics" }
    ],
    notifications: [
      {
        type: "Email on failure",
        recipients: ["marketing-team@company.com"]
      }
    ],
    history: [
      {
        id: "run-1",
        timestamp: "Today at 08:30 AM",
        status: "success",
        duration: "2m 18s",
        recordsProcessed: 4215
      },
      {
        id: "run-2",
        timestamp: "Apr 1, 2025 at 08:30 AM",
        status: "success",
        duration: "2m 24s",
        recordsProcessed: 4108
      }
    ],
    dependencies: {
      upstream: [],
      downstream: [
        { id: "dep-1", name: "Marketing Dashboard Update" },
        { id: "dep-2", name: "Campaign ROI Analysis" }
      ]
    }
  },
  {
    id: "6",
    name: "Financial Data Import",
    description: "Imports and transforms financial data for accounting and reporting.",
    icon: "ri-file-excel-2-line",
    iconBg: "bg-indigo-100 text-indigo-600",
    status: "paused",
    lastRun: "Apr 5, 2025 at 05:15 PM",
    lastRunDuration: "8m 42s",
    successRate: 92.8,
    schedule: {
      type: "monthly",
      description: "Monthly on 1st",
      typicalDuration: "8-10 minutes"
    },
    tags: ["Finance", "Accounting", "Monthly"],
    dataSources: [
      {
        name: "QuickBooks API",
        type: "Accounting",
        icon: "ri-file-excel-2-line",
        entities: ["General Ledger", "Expenses", "Revenue", "Balance Sheet"]
      }
    ],
    destination: {
      name: "Snowflake - Finance Schema",
      type: "Data Warehouse",
      icon: "ri-database-2-line"
    },
    transformations: [
      { id: "t14", description: "Account normalization" },
      { id: "t15", description: "Currency conversion" },
      { id: "t16", description: "Financial metrics calculation" }
    ],
    notifications: [
      {
        type: "Email on failure",
        recipients: ["finance-team@company.com"]
      }
    ],
    history: [
      {
        id: "run-1",
        timestamp: "Apr 5, 2025 at 05:15 PM",
        status: "success",
        duration: "8m 42s",
        recordsProcessed: 12486
      },
      {
        id: "run-2",
        timestamp: "Mar 1, 2025 at 05:00 PM",
        status: "success",
        duration: "9m 13s",
        recordsProcessed: 12104
      }
    ],
    dependencies: {
      upstream: [
        { id: "dep-1", name: "Expense Report Processing" }
      ],
      downstream: [
        { id: "dep-2", name: "Financial Dashboard Update" },
        { id: "dep-3", name: "Monthly Finance Report" }
      ]
    }
  }
];

// Templates for creating new pipelines
export const pipelineTemplates = [
  {
    id: "template-1",
    name: "Salesforce Sync",
    description: "Sync Salesforce data to your data warehouse on a schedule",
    icon: "ri-database-2-line",
    iconBg: "bg-blue-100 text-blue-600",
    setupTime: "5-10 min"
  },
  {
    id: "template-2",
    name: "CSV Clean-Up",
    description: "Standardize and clean CSV data before loading to warehouse",
    icon: "ri-file-excel-2-line",
    iconBg: "bg-green-100 text-green-600",
    setupTime: "2-5 min"
  },
  {
    id: "template-3",
    name: "Scheduled Import",
    description: "Automatically import data from APIs on a recurring schedule",
    icon: "ri-calendar-check-line",
    iconBg: "bg-purple-100 text-purple-600",
    setupTime: "3-7 min"
  },
  {
    id: "template-4",
    name: "Google Analytics",
    description: "Import and transform Google Analytics data automatically",
    icon: "ri-google-line",
    iconBg: "bg-orange-100 text-orange-600",
    setupTime: "5-8 min"
  },
  {
    id: "template-5",
    name: "Zendesk Tickets",
    description: "Sync Zendesk support tickets to your data warehouse",
    icon: "ri-customer-service-2-line",
    iconBg: "bg-red-100 text-red-600",
    setupTime: "4-6 min"
  }
];

// Pipeline service to handle data interactions
export const pipelineService = {
  // Get all pipelines
  getPipelines: async (): Promise<Pipeline[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPipelines);
      }, 500);
    });
  },

  // Get a single pipeline by ID
  getPipeline: async (id: string): Promise<Pipeline | undefined> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const pipeline = mockPipelines.find(p => p.id === id);
        resolve(pipeline);
      }, 300);
    });
  },

  // Get pipeline templates
  getTemplates: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pipelineTemplates);
      }, 300);
    });
  }
};