import { db } from "./db";
import { 
  profile, experience, education, skills, projects, contactMessages,
  type Profile, type Experience, type Education, type Skill, type Project, type ContactMessage, type PortfolioData,
  type InsertContactSchema 
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPortfolioData(): Promise<PortfolioData>;
  createContactMessage(message: any): Promise<void>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getPortfolioData(): Promise<PortfolioData> {
    const [profileData] = await db.select().from(profile);
    const experienceData = await db.select().from(experience);
    const educationData = await db.select().from(education);
    const skillsData = await db.select().from(skills);
    const projectsData = await db.select().from(projects);

    // Return default empty structure if profile is missing (though seed should fix this)
    return {
      profile: profileData || {
        id: 0,
        name: "",
        headline: "",
        summary: "",
        location: "",
        email: null,
        phone: null,
        githubUrl: null,
        linkedinUrl: null,
        heroImageUrl: null,
        aboutImageUrl: null
      },
      experience: experienceData,
      education: educationData,
      skills: skillsData,
      projects: projectsData,
    };
  }

  async createContactMessage(message: any): Promise<void> {
    await db.insert(contactMessages).values(message);
  }

  async seedData(): Promise<void> {
    const [existing] = await db.select().from(profile);
    if (existing) return;

    // Seed Profile
    await db.insert(profile).values({
      name: "Komal Maurya",
      headline: "Web Developer | React.js & Node.js | Building Scalable Web Solutions",
      summary: "Hi! I’m a Web Developer with a strong interest in building intuitive, user-friendly, and performance-focused web applications that deliver real value to users and businesses. With hands-on experience in HTML, CSS, JavaScript, React.js, WordPress, MySQL, and MongoDB, I combine clean UI design with reliable functionality. I focus on writing clean, maintainable code and creating interfaces that are responsive, accessible, and easy to use across devices.",
      location: "Mira Bhayandar, Maharashtra, India",
      email: "komal@example.com", // Placeholder
      linkedinUrl: "https://www.linkedin.com/in/komalmaurya",
      githubUrl: "https://github.com/komal-maurya789",
      heroImageUrl: "/images/hero-bg.jpg",
      aboutImageUrl: "/images/abstract-bg.jpg"
    });

    // Seed Experience
    await db.insert(experience).values([
      {
        title: "Web Development Intern",
        company: "Prodigy InfoTech",
        location: "Remote/Hybrid", 
        startDate: "March 2025",
        endDate: "March 2025",
        description: "Developing responsive and cross-browser-compatible web interfaces. Building reusable UI components and clean layouts. Optimizing performance for speed and scalability."
      }
    ]);

    // Seed Education
    await db.insert(education).values([
      {
        degree: "BSc IT (Bachelor of Science in Information Technology)",
        institution: "Shankar Narayan College of Arts & Commerce",
        year: "June 2022 - April 2025",
        location: "Mumbai, India"
      }
    ]);

    // Seed Skills
    await db.insert(skills).values([
      {
        category: "Frontend",
        items: ["React.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "WordPress"]
      },
      {
        category: "Backend",
        items: ["Node.js", "MySQL", "MongoDB"]
      },
      {
        category: "Tools & Concepts",
        items: ["Git", "Responsive Design", "Accessibility", "Performance Optimization"]
      }
    ]);

    // Seed Projects/Publications
    await db.insert(projects).values([
      {
        title: "Heart Attack Prediction",
        description: "A data-driven project or web application focusing on healthcare prediction logic. (Publication/Project mentioned in profile)",
        tags: ["Analysis", "Prediction"]
      }
    ]);
  }
}

export const storage = new DatabaseStorage();
