import { useQuery } from "@tanstack/react-query";

import { type ICompany, getCompaniesClient } from "@/app/api";

import { CACHE_KEYS } from "../cache-keys";


export const useCompanies = ({ initialData }: { initialData?: ICompany[] }) => {
  return useQuery({
    queryKey: CACHE_KEYS.companies,
    queryFn: getCompaniesClient,
    initialData,
  });
};
