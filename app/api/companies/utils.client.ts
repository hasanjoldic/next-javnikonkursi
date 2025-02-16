import { IUpsertCompanyRequest } from "@/app/api/companies/validation";
import { type ICompany } from "./utils.server";

export const getCompaniesClient = async () => {
  const res = await fetch("/api/companies");
  const data = await res.json() as ICompany[];
  return data;
};

export const upsertCompanyClient = async (payload: IUpsertCompanyRequest) => {
  const res = await fetch("/api/companies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return (await res.json()) as ICompany[];
}
