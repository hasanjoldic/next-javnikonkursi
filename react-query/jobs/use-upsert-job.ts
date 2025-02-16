import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type IJob, upsertJobClient } from "@/app/api";

import { CACHE_KEYS } from "@/react-query/cache-keys";

export const useUpsertJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertJobClient,
    onSuccess: (data) => {
      queryClient.setQueryData<IJob[]>(CACHE_KEYS.jobs, data);
    },
  });
};