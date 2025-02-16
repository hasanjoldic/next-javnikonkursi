import { IUpsertJobTypeRequest } from "@/app/api/job-types/validation";
import { createServiceRoleClient } from "@/services/supabase/client"

export const getJobTypesServer = async () => {
  const supabase = createServiceRoleClient();

  const { data } = await supabase.from("job_types").select().throwOnError();
  return data;
}

export type IJobType = Awaited<ReturnType<typeof getJobTypesServer>>[0];

export const upsertJobTypeServer = async (payload: IUpsertJobTypeRequest) => {
  const supabase = createServiceRoleClient();

  await supabase.from("job_types").upsert(payload).throwOnError();

  return getJobTypesServer();
};
