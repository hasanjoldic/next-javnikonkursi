import { useQuery } from "@tanstack/react-query";

import { type IJobType, getJobTypesClient } from "@/app/api";

import { CACHE_KEYS } from "../cache-keys";


export const useJobTypes = ({ initialData }: { initialData?: IJobType[] }) => {
  return useQuery({
    queryKey: CACHE_KEYS.jobTypes,
    queryFn: getJobTypesClient,
    initialData,
  });
};
