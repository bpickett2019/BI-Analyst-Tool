import { pgTable, text, serial, integer, timestamp, json, boolean, foreignKey, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  dashboards: many(dashboards),
}));

// Dashboards table
export const dashboards = pgTable("dashboards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Dashboard relations
export const dashboardsRelations = relations(dashboards, ({ one, many }) => ({
  user: one(users, {
    fields: [dashboards.userId],
    references: [users.id],
  }),
  layouts: many(layouts),
  metrics: many(dashboardMetrics),
}));

// Layouts table
export const layouts = pgTable("layouts", {
  id: serial("id").primaryKey(),
  dashboardId: integer("dashboard_id").notNull().references(() => dashboards.id),
  name: text("name").notNull(),
  layout: json("layout").notNull(),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Layout relations
export const layoutsRelations = relations(layouts, ({ one }) => ({
  dashboard: one(dashboards, {
    fields: [layouts.dashboardId],
    references: [dashboards.id],
  }),
}));

// Metrics table
export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // e.g., 'number', 'percentage', 'currency'
  color: text("color"), // e.g., 'primary', 'success', 'warning'
  createdAt: timestamp("created_at").defaultNow(),
});

// Dashboard-Metrics join table
export const dashboardMetrics = pgTable("dashboard_metrics", {
  dashboardId: integer("dashboard_id").notNull().references(() => dashboards.id),
  metricId: integer("metric_id").notNull().references(() => metrics.id),
  value: text("value"),
  change: text("change"),
  trend: text("trend"), // 'up' or 'down'
  position: json("position"), // Grid position information
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (t) => ({
  pk: primaryKey(t.dashboardId, t.metricId),
}));

// Dashboard-Metrics relations
export const dashboardMetricsRelations = relations(dashboardMetrics, ({ one }) => ({
  dashboard: one(dashboards, {
    fields: [dashboardMetrics.dashboardId],
    references: [dashboards.id],
  }),
  metric: one(metrics, {
    fields: [dashboardMetrics.metricId],
    references: [metrics.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDashboardSchema = createInsertSchema(dashboards).pick({
  name: true,
  description: true,
  userId: true,
});

export const insertLayoutSchema = createInsertSchema(layouts).pick({
  dashboardId: true,
  name: true,
  layout: true,
  isActive: true,
});

export const insertMetricSchema = createInsertSchema(metrics).pick({
  title: true,
  description: true,
  type: true,
  color: true,
});

export const insertDashboardMetricSchema = createInsertSchema(dashboardMetrics).pick({
  dashboardId: true,
  metricId: true,
  value: true,
  change: true,
  trend: true,
  position: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDashboard = z.infer<typeof insertDashboardSchema>;
export type Dashboard = typeof dashboards.$inferSelect;

export type InsertLayout = z.infer<typeof insertLayoutSchema>;
export type Layout = typeof layouts.$inferSelect;

export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type Metric = typeof metrics.$inferSelect;

export type InsertDashboardMetric = z.infer<typeof insertDashboardMetricSchema>;
export type DashboardMetric = typeof dashboardMetrics.$inferSelect;
