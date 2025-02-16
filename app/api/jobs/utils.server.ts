import crypto from "crypto";

import { createServiceRoleClient } from "@/services/supabase/client"

import { type IUpsertJobRequest } from "./validation";

export const getJobsServer = async () => {
  const supabase = createServiceRoleClient();

  const { data: jobs } = await supabase.from("jobs").select(`
    *,
    job_types(*),
    companies(*)
  `).throwOnError();

  return jobs.map((job) => ({
    ...job,
    job_type: job.job_types,
    company: job.companies,
  }));
}

export type IJob = Awaited<ReturnType<typeof getJobsServer>>[0];

export const upsertJobServer = async ({ screenshot, ...payload }: IUpsertJobRequest) => {
  const supabase = createServiceRoleClient();

  const id = payload.id || crypto.randomUUID();
  const { data } = await supabase.storage.from("job-ads").upload(id, screenshot, { upsert: true });
  if (!data) {
    throw new Error("Failed to upload file");
  }

  const fullPath = data.fullPath;

  await supabase.from("jobs").upsert({
    ...payload,
    id,
    internal_url: fullPath,
  }).throwOnError();

  return getJobsServer();
};
