import * as z from "zod";

export const BoardsOrIssuesSchema = z.object({
  title: z.string().min(5).max(130),
  description: z.string().min(5).max(130)
})
.or(z.object({
  status: z.string(),
  description: z.string().min(5).max(130)
}))
