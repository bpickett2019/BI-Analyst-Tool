import { 
  users, dashboards, layouts, metrics, dashboardMetrics,
  type User, type InsertUser,
  type Dashboard, type InsertDashboard,
  type Layout, type InsertLayout,
  type Metric, type InsertMetric,
  type DashboardMetric, type InsertDashboardMetric
} from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dashboard operations
  getDashboards(userId: number): Promise<Dashboard[]>;
  getDashboard(id: number): Promise<Dashboard | undefined>;
  createDashboard(dashboard: InsertDashboard): Promise<Dashboard>;
  updateDashboard(id: number, dashboard: Partial<InsertDashboard>): Promise<Dashboard | undefined>;
  deleteDashboard(id: number): Promise<boolean>;
  
  // Layout operations
  getLayouts(dashboardId: number): Promise<Layout[]>;
  getActiveLayout(dashboardId: number): Promise<Layout | undefined>;
  createLayout(layout: InsertLayout): Promise<Layout>;
  updateLayout(id: number, layout: Partial<InsertLayout>): Promise<Layout | undefined>;
  setActiveLayout(id: number, dashboardId: number): Promise<boolean>;
  deleteLayout(id: number): Promise<boolean>;
  
  // Metric operations
  getMetrics(): Promise<Metric[]>;
  getMetric(id: number): Promise<Metric | undefined>;
  createMetric(metric: InsertMetric): Promise<Metric>;
  
  // Dashboard-Metric operations
  getDashboardMetrics(dashboardId: number): Promise<DashboardMetric[]>;
  addMetricToDashboard(dashboardMetric: InsertDashboardMetric): Promise<DashboardMetric>;
  updateDashboardMetric(dashboardId: number, metricId: number, data: Partial<InsertDashboardMetric>): Promise<DashboardMetric | undefined>;
  removeMetricFromDashboard(dashboardId: number, metricId: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Dashboard operations
  async getDashboards(userId: number): Promise<Dashboard[]> {
    return await db.select().from(dashboards).where(eq(dashboards.userId, userId));
  }

  async getDashboard(id: number): Promise<Dashboard | undefined> {
    const [dashboard] = await db.select().from(dashboards).where(eq(dashboards.id, id));
    return dashboard;
  }

  async createDashboard(dashboard: InsertDashboard): Promise<Dashboard> {
    const [newDashboard] = await db.insert(dashboards).values(dashboard).returning();
    return newDashboard;
  }

  async updateDashboard(id: number, dashboard: Partial<InsertDashboard>): Promise<Dashboard | undefined> {
    const [updatedDashboard] = await db
      .update(dashboards)
      .set({
        ...dashboard,
        updatedAt: new Date(),
      })
      .where(eq(dashboards.id, id))
      .returning();
    return updatedDashboard;
  }

  async deleteDashboard(id: number): Promise<boolean> {
    const [deletedDashboard] = await db
      .delete(dashboards)
      .where(eq(dashboards.id, id))
      .returning();
    return !!deletedDashboard;
  }

  // Layout operations
  async getLayouts(dashboardId: number): Promise<Layout[]> {
    return await db.select().from(layouts).where(eq(layouts.dashboardId, dashboardId));
  }

  async getActiveLayout(dashboardId: number): Promise<Layout | undefined> {
    const [layout] = await db
      .select()
      .from(layouts)
      .where(
        and(
          eq(layouts.dashboardId, dashboardId),
          eq(layouts.isActive, true)
        )
      );
    return layout;
  }

  async createLayout(layout: InsertLayout): Promise<Layout> {
    const [newLayout] = await db.insert(layouts).values(layout).returning();
    return newLayout;
  }

  async updateLayout(id: number, layout: Partial<InsertLayout>): Promise<Layout | undefined> {
    const [updatedLayout] = await db
      .update(layouts)
      .set({
        ...layout,
        updatedAt: new Date(),
      })
      .where(eq(layouts.id, id))
      .returning();
    return updatedLayout;
  }

  async setActiveLayout(id: number, dashboardId: number): Promise<boolean> {
    // First deactivate all layouts for this dashboard
    await db
      .update(layouts)
      .set({ isActive: false })
      .where(eq(layouts.dashboardId, dashboardId));

    // Then activate the specified layout
    const [activatedLayout] = await db
      .update(layouts)
      .set({ isActive: true })
      .where(eq(layouts.id, id))
      .returning();

    return !!activatedLayout;
  }

  async deleteLayout(id: number): Promise<boolean> {
    const [deletedLayout] = await db
      .delete(layouts)
      .where(eq(layouts.id, id))
      .returning();
    return !!deletedLayout;
  }

  // Metric operations
  async getMetrics(): Promise<Metric[]> {
    return await db.select().from(metrics);
  }

  async getMetric(id: number): Promise<Metric | undefined> {
    const [metric] = await db.select().from(metrics).where(eq(metrics.id, id));
    return metric;
  }

  async createMetric(metric: InsertMetric): Promise<Metric> {
    const [newMetric] = await db.insert(metrics).values(metric).returning();
    return newMetric;
  }

  // Dashboard-Metric operations
  async getDashboardMetrics(dashboardId: number): Promise<DashboardMetric[]> {
    return await db
      .select()
      .from(dashboardMetrics)
      .where(eq(dashboardMetrics.dashboardId, dashboardId));
  }

  async addMetricToDashboard(dashboardMetric: InsertDashboardMetric): Promise<DashboardMetric> {
    const [newDashboardMetric] = await db
      .insert(dashboardMetrics)
      .values(dashboardMetric)
      .returning();
    return newDashboardMetric;
  }

  async updateDashboardMetric(
    dashboardId: number,
    metricId: number,
    data: Partial<InsertDashboardMetric>
  ): Promise<DashboardMetric | undefined> {
    const [updatedDashboardMetric] = await db
      .update(dashboardMetrics)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(dashboardMetrics.dashboardId, dashboardId),
          eq(dashboardMetrics.metricId, metricId)
        )
      )
      .returning();
    return updatedDashboardMetric;
  }

  async removeMetricFromDashboard(dashboardId: number, metricId: number): Promise<boolean> {
    const [deletedDashboardMetric] = await db
      .delete(dashboardMetrics)
      .where(
        and(
          eq(dashboardMetrics.dashboardId, dashboardId),
          eq(dashboardMetrics.metricId, metricId)
        )
      )
      .returning();
    return !!deletedDashboardMetric;
  }
}

export const storage = new DatabaseStorage();
