import z from "zod";

import { regionValues } from "@/data";

export const upsertCompanySchema = z.object({
  id: z.string().uuid().optional(),

  title: z.string(),
  region: z.enum(regionValues).optional(),
  url: z.string().url(),
});

export type IUpsertCompanyRequest = z.infer<
  typeof upsertCompanySchema
>;