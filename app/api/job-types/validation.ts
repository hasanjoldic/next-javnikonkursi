import z from "zod";

export const upsertJobTypeSchema = z.object({
  id: z.string().uuid().optional(),

  title: z.string(),
  notes: z.string().optional(),
});

export type IUpsertJobTypeRequest = z.infer<
  typeof upsertJobTypeSchema
>;