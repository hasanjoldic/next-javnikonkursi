import { upsertJobTypeSchema } from "@/app/api/job-types/validation";
import { getJobTypesServer, upsertJobTypeServer } from "./utils.server";

export const GET = async () => {
  const data = await getJobTypesServer();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async (request: Request) => {
  const payload = upsertJobTypeSchema.parse(await request.json());
  const data = await upsertJobTypeServer(payload);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
