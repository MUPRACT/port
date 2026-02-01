import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  await storage.seedData();

  app.get(api.portfolio.get.path, async (_req, res) => {
    try {
      const data = await storage.getPortfolioData();
      res.json(data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = insertContactSchema.parse(req.body);
      await storage.createContactMessage(input);
      res.json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  return httpServer;
}
