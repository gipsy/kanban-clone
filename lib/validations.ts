import { z } from "zod"

export const BoardsOrIssuesSchema = z.union([
  z.object({
    title: z.string().min(5).max(130),
    description: z.string().min(5).max(130),
  }),
  z.object({
    title: z.string().min(5).max(130),
  }),
  z.object({
    status: z.string(),
    description: z.string().min(5).max(130),
  }),
])
