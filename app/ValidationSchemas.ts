import { z } from "zod";

export const create_issue_schema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string({ required_error: "PLease provide a description" }).min(1).max(65535),
});


export const create_issue_schema_with_assignedissues = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z.string({ required_error: "PLease provide a description" }).min(1).optional(),
  assigned_to: z.string().min(1, "Assigned to userid is required").max(255).optional().nullable()
});
