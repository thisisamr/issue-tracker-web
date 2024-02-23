import { z } from "zod";

export const create_issue_schema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string({required_error:"PLease provide a description"}).min(1),
});
