import { z } from "zod";
import { 
  insertContactSchema, 
  profile, 
  experience, 
  education, 
  skills, 
  projects 
} from "./schema";

export const api = {
  portfolio: {
    get: {
      method: "GET" as const,
      path: "/api/portfolio",
      responses: {
        200: z.object({
          profile: z.custom<typeof profile.$inferSelect>(),
          experience: z.array(z.custom<typeof experience.$inferSelect>()),
          education: z.array(z.custom<typeof education.$inferSelect>()),
          skills: z.array(z.custom<typeof skills.$inferSelect>()),
          projects: z.array(z.custom<typeof projects.$inferSelect>()),
        }),
      },
    },
  },
  contact: {
    submit: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertContactSchema,
      responses: {
        200: z.object({ success: z.boolean() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
