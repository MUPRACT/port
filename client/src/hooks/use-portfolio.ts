import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type InsertContactSchema } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Define a fallback data object since we might not have DB data yet
const FALLBACK_DATA = {
  profile: {
    name: "Komal Maurya",
    headline: "Web Developer | React.js & Node.js",
    summary: "Hi! I’m a Web Developer with a strong interest in building intuitive, user-friendly, and performance-focused web applications. With hands-on experience in HTML, CSS, JavaScript, React.js, WordPress, MySQL, and MongoDB, I combine clean UI design with reliable functionality.",
    location: "Mira Bhayandar, Maharashtra, India",
    email: "komal.maurya@example.com",
    githubUrl: "https://github.com/komal-maurya789",
    linkedinUrl: "https://linkedin.com/in/komalmaurya",
    heroImageUrl: "/images/hero-bg.jpg",
  },
  experience: [
    {
      id: 1,
      title: "Web Development Intern",
      company: "Prodigy InfoTech",
      location: "Remote",
      startDate: "March 2025",
      endDate: "Present",
      description: "Developing scalable web applications and enhancing user interfaces using modern frontend technologies.",
    }
  ],
  education: [
    {
      id: 1,
      degree: "BSc IT",
      institution: "Shankar Narayan College of Arts & Commerce",
      location: "Maharashtra, India",
      year: "2022 - 2025"
    }
  ],
  skills: [
    { id: 1, category: "Frontend", items: ["React.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"] },
    { id: 2, category: "Backend", items: ["Node.js", "Express", "REST APIs"] },
    { id: 3, category: "Database", items: ["MongoDB", "MySQL"] },
    { id: 4, category: "Tools", items: ["Git", "WordPress", "VS Code"] },
  ],
  projects: [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A modern, responsive personal portfolio built with React and Framer Motion.",
      link: "#",
      tags: ["React", "Framer Motion", "Tailwind"]
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "Admin dashboard for managing products, orders, and customers.",
      link: "#",
      tags: ["React", "Node.js", "MongoDB"]
    }
  ]
};

export function usePortfolio() {
  return useQuery({
    queryKey: [api.portfolio.get.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.portfolio.get.path);
        if (!res.ok) {
          console.warn("API unavailable, using fallback data");
          return FALLBACK_DATA;
        }
        const data = await res.json();
        // If DB is empty, use fallback (api might return empty arrays)
        if (!data.profile) return FALLBACK_DATA;
        return api.portfolio.get.responses[200].parse(data);
      } catch (err) {
        console.warn("Failed to fetch portfolio data, using fallback", err);
        return FALLBACK_DATA;
      }
    },
  });
}

type ContactFormValues = z.infer<typeof api.contact.submit.input>;

export function useContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      
      return api.contact.submit.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
