import { IUpsertJobRequest, upsertJobSchema } from "@/app/api/jobs/validation";
import { getJobsServer, upsertJobServer } from "./utils.server";

export const GET = async () => {
  const data = await getJobsServer();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const payload: IUpsertJobRequest = {
    ...upsertJobSchema.parse(Object.fromEntries(formData)),
  };
  const data = await upsertJobServer(payload);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
