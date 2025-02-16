import { IUpsertCompanyRequest } from "@/app/api/companies/validation";
import { createServiceRoleClient } from "@/services/supabase/client"

export const getCompaniesServer = async () => {
  const supabase = createServiceRoleClient();

  const { data } = await supabase.from("companies").select().throwOnError();
  return data;
}

export type ICompany = Awaited<ReturnType<typeof getCompaniesServer>>[0];

export const upsertCompanyServer = async (payload: IUpsertCompanyRequest) => {
  const supabase = createServiceRoleClient();

  await supabase.from("companies").upsert(payload).throwOnError();

  return getCompaniesServer();
};
