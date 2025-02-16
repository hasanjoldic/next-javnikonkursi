import { type IUpsertJobRequest } from "./validation";
import { type IJob } from "./utils.server";

export const getJobsClient = async () => {
  const res = await fetch("/api/jobs");
  return (await res.json()) as IJob[];
};

export const upsertJobClient = async (payload: IUpsertJobRequest) => {
  const formData = new FormData();

  for (const key in payload) {
    // @ts-expect-error
    formData.append(key, payload[key]);
  }

  const res = await fetch("/api/jobs", {
    method: "POST",
    body: formData,
  });
  return (await res.json()) as IJob[];
}
