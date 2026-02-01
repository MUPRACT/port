import { pgTable, text, serial, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base Profile Information
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  headline: text("headline").notNull(),
  summary: text("summary").notNull(),
  location: text("location").notNull(),
  email: text("email"),
  phone: text("phone"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  heroImageUrl: text("hero_image_url"),
  aboutImageUrl: text("about_image_url"),
});

// Experience
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location"),
  startDate: text("start_date").notNull(), // Using text for flexible display (e.g. "March 2025")
  endDate: text("end_date"),
  description: text("description").notNull(),
});

// Education
export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  location: text("location"),
  year: text("year").notNull(),
});

// Skills
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // e.g., "Frontend", "Backend", "Tools"
  items: text("items").array().notNull(),
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link"),
  tags: text("tags").array(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").default("NOW()"),
});

// Schemas
export const insertProfileSchema = createInsertSchema(profile);
export const insertExperienceSchema = createInsertSchema(experience);
export const insertEducationSchema = createInsertSchema(education);
export const insertSkillSchema = createInsertSchema(skills);
export const insertProjectSchema = createInsertSchema(projects);
export const insertContactSchema = createInsertSchema(contactMessages);

// Types
export type Profile = typeof profile.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type PortfolioData = {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
};
