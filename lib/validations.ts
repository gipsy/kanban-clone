import * as z from "zod";
import { Types } from "mongoose";

export const BoardsOrIssuesSchema = z.object({
  title: z.string().min(5).max(130),
}).and(z.object({
  status: z.string(),
  description: z.string()
  // boardId: z.string(),
  // boardId: z.string().refine((val) => {
  //   return Types.ObjectId.isValid(val)
  // }),
}))
