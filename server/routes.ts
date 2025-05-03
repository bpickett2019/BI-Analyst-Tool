import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertDashboardSchema,
  insertLayoutSchema,
  insertMetricSchema,
  insertDashboardMetricSchema
} from "@shared/schema";
import { z } from "zod";
import { generateChartConfig, generateInsight } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // In a real application, you would use JWT or sessions here
      // For simplicity, we're just returning the user object
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ error: "Login failed" });
    }
  });

  // Dashboard routes
  app.get("/api/dashboards", async (req: Request, res: Response) => {
    try {
      // In a real app, you would get the user ID from the session/JWT
      // For now, we'll use a query parameter
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Valid user ID is required" });
      }
      
      const dashboards = await storage.getDashboards(userId);
      return res.status(200).json(dashboards);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch dashboards" });
    }
  });

  app.get("/api/dashboards/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: "Valid dashboard ID is required" });
      }
      
      const dashboard = await storage.getDashboard(id);
      
      if (!dashboard) {
        return res.status(404).json({ error: "Dashboard not found" });
      }
      
      return res.status(200).json(dashboard);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch dashboard" });
    }
  });

  app.post("/api/dashboards", async (req: Request, res: Response) => {
    try {
      const dashboardData = insertDashboardSchema.parse(req.body);
      const dashboard = await storage.createDashboard(dashboardData);
      
      return res.status(201).json(dashboard);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: "Failed to create dashboard" });
    }
  });

  app.put("/api/dashboards/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: "Valid dashboard ID is required" });
      }
      
      const dashboardData = req.body;
      const dashboard = await storage.updateDashboard(id, dashboardData);
      
      if (!dashboard) {
        return res.status(404).json({ error: "Dashboard not found" });
      }
      
      return res.status(200).json(dashboard);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update dashboard" });
    }
  });

  app.delete("/api/dashboards/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: "Valid dashboard ID is required" });
      }
      
      const success = await storage.deleteDashboard(id);
      
      if (!success) {
        return res.status(404).json({ error: "Dashboard not found" });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete dashboard" });
    }
  });

  // Layout routes
  app.get("/api/dashboards/:dashboardId/layouts", async (req: Request, res: Response) => {
    try {
      const dashboardId = parseInt(req.params.dashboardId);
      
      if (isNaN(dashboardId)) {
        return res.status(400).json({ error: "Valid dashboard ID is required" });
      }
      
      const layouts = await storage.getLayouts(dashboardId);
      return res.status(200).json(layouts);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch layouts" });
    }
  });

  app.get("/api/dashboards/:dashboardId/layout/active", async (req: Request, res: Response) => {
    try {
      const dashboardId = parseInt(req.params.dashboardId);
      
      if (isNaN(dashboardId)) {
        return res.status(400).json({ error: "Valid dashboard ID is required" });
      }
      
      const layout = await storage.getActiveLayout(dashboardId);
      
      if (!layout) {
        return res.status(404).json({ error: "No active layout found" });
      }
      
      return res.status(200).json(layout);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch active layout" });
    }
  });

  app.post("/api/layouts", async (req: Request, res: Response) => {
    try {
      const layoutData = insertLayoutSchema.parse(req.body);
      const layout = await storage.createLayout(layoutData);
      
      return res.status(201).json(layout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: "Failed to create layout" });
    }
  });

  app.put("/api/layouts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: "Valid layout ID is required" });
      }
      
      const layoutData = req.body;
      const layout = await storage.updateLayout(id, layoutData);
      
      if (!layout) {
        return res.status(404).json({ error: "Layout not found" });
      }
      
      return res.status(200).json(layout);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update layout" });
    }
  });

  app.post("/api/layouts/:id/activate", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { dashboardId } = req.body;
      
      if (isNaN(id) || isNaN(dashboardId)) {
        return res.status(400).json({ error: "Valid IDs are required" });
      }
      
      const success = await storage.setActiveLayout(id, dashboardId);
      
      if (!success) {
        return res.status(404).json({ error: "Layout not found" });
      }
      
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to activate layout" });
    }
  });

  app.delete("/api/layouts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: "Valid layout ID is required" });
      }
      
      const success = await storage.deleteLayout(id);
      
      if (!success) {
        return res.status(404).json({ error: "Layout not found" });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete layout" });
    }
  });

  // Metrics routes
  app.get("/api/metrics", async (_req: Request, res: Response) => {
    try {
      const metrics = await storage.getMetrics();
      return res.status(200).json(metrics);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  app.get("/api/metrics/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: "Valid metric ID is required" });
      }
      
      const metric = await storage.getMetric(id);
      
      if (!metric) {
        return res.status(404).json({ error: "Metric not found" });
      }
      
      return res.status(200).json(metric);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch metric" });
    }
  });

  app.post("/api/metrics", async (req: Request, res: Response) => {
    try {
      const metricData = insertMetricSchema.parse(req.body);
      const metric = await storage.createMetric(metricData);
      
      return res.status(201).json(metric);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: "Failed to create metric" });
    }
  });

  // Dashboard-Metrics routes
  app.get("/api/dashboards/:dashboardId/metrics", async (req: Request, res: Response) => {
    try {
      const dashboardId = parseInt(req.params.dashboardId);
      
      if (isNaN(dashboardId)) {
        return res.status(400).json({ error: "Valid dashboard ID is required" });
      }
      
      const dashboardMetrics = await storage.getDashboardMetrics(dashboardId);
      return res.status(200).json(dashboardMetrics);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch dashboard metrics" });
    }
  });

  app.post("/api/dashboard-metrics", async (req: Request, res: Response) => {
    try {
      const dashboardMetricData = insertDashboardMetricSchema.parse(req.body);
      const dashboardMetric = await storage.addMetricToDashboard(dashboardMetricData);
      
      return res.status(201).json(dashboardMetric);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: "Failed to add metric to dashboard" });
    }
  });

  app.put("/api/dashboards/:dashboardId/metrics/:metricId", async (req: Request, res: Response) => {
    try {
      const dashboardId = parseInt(req.params.dashboardId);
      const metricId = parseInt(req.params.metricId);
      
      if (isNaN(dashboardId) || isNaN(metricId)) {
        return res.status(400).json({ error: "Valid IDs are required" });
      }
      
      const dashboardMetricData = req.body;
      const dashboardMetric = await storage.updateDashboardMetric(
        dashboardId,
        metricId,
        dashboardMetricData
      );
      
      if (!dashboardMetric) {
        return res.status(404).json({ error: "Dashboard metric not found" });
      }
      
      return res.status(200).json(dashboardMetric);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update dashboard metric" });
    }
  });

  app.delete("/api/dashboards/:dashboardId/metrics/:metricId", async (req: Request, res: Response) => {
    try {
      const dashboardId = parseInt(req.params.dashboardId);
      const metricId = parseInt(req.params.metricId);
      
      if (isNaN(dashboardId) || isNaN(metricId)) {
        return res.status(400).json({ error: "Valid IDs are required" });
      }
      
      const success = await storage.removeMetricFromDashboard(dashboardId, metricId);
      
      if (!success) {
        return res.status(404).json({ error: "Dashboard metric not found" });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Failed to remove metric from dashboard" });
    }
  });
  
  // AI Chart Generation routes
  app.post("/api/charts/generate", async (req: Request, res: Response) => {
    try {
      const { description } = req.body;
      
      if (!description || typeof description !== 'string') {
        return res.status(400).json({ error: "Valid chart description is required" });
      }
      
      const chartConfig = await generateChartConfig(description);
      const insight = await generateInsight(chartConfig);
      
      return res.status(200).json({
        chartConfig,
        insight
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to generate chart configuration" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
