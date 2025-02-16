import { upsertCompanySchema } from "@/app/api/companies/validation";
import { getCompaniesServer, upsertCompanyServer } from "./utils.server";

export const GET = async () => {
  const data = await getCompaniesServer();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async (request: Request) => {
  const payload = upsertCompanySchema.parse(await request.json());
  const data = await upsertCompanyServer(payload);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
