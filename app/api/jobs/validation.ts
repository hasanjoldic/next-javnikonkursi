import z from "zod";

import { ERegion, regions, regionValues } from "@/data";
import { File } from "buffer";

export const upsertJobSchema = z.object({
  id: z.string().uuid().optional(),
  company_id: z.string().uuid(),
  job_type_id: z.string().uuid(),

  title: z.string(),
  region: z.enum(regionValues),
  start_date: z.string().date(),
  end_date: z.string().date(),
  number_of_openings: z.coerce.number().int().nonnegative(),

  // screenshot: z.instanceof(File),
  screenshot: z.any(),
  external_url: z.string().url().optional(),

  notes: z.string().optional(),
});

export type IUpsertJobRequest = z.infer<
  typeof upsertJobSchema
>;