import { IJobType } from "@/app/api/job-types/utils.server";
import { IUpsertJobTypeRequest } from "@/app/api/job-types/validation";

export const getJobTypesClient = async () => {
  const res = await fetch("/api/job-types");
  const data = await res.json();
  return data;
};

export const upsertJobTypeClient = async (payload: IUpsertJobTypeRequest) => {
  const res = await fetch("/api/job-types", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return (await res.json()) as IJobType[];
}
