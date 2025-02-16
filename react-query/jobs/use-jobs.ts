import { useQuery } from "@tanstack/react-query";

import { type IJob, getJobsClient } from "@/app/api";

import { CACHE_KEYS } from "../cache-keys";

export const useJobs = ({ initialData }: { initialData?: IJob[] }) => {
  return useQuery({
    queryKey: CACHE_KEYS.jobs,
    queryFn: getJobsClient,
    initialData,
  });
};
