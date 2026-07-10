import { z } from "zod";
import { DEPARTMENTS, STATUSES } from "@/lib/types";

export const employeeCreateSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  department: z.enum(DEPARTMENTS),
  title: z.string().trim().min(2, "Title is required").max(80),
  status: z.enum(STATUSES),
});

export type EmployeeCreateInput = z.infer<typeof employeeCreateSchema>;
