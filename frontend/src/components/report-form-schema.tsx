import { z } from "zod";

export const createReportSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  authorName: z.string(),
  authorAge: z
    .number({ message: "Plese enter your age" })
    .int()
    .positive({ message: "Age must be a positive number" }),
  files: z.instanceof(FileList).transform((files) => Array.from(files)),
});

export type CreateReportSchema = z.infer<typeof createReportSchema>;
