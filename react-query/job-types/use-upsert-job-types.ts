import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type IJobType, upsertJobTypeClient } from "@/app/api";

import { CACHE_KEYS } from "@/react-query/cache-keys";

export const useUpsertJobType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertJobTypeClient,
    onSuccess: (data) => {
      queryClient.setQueryData<IJobType[]>(CACHE_KEYS.jobTypes, data);
    },
  });
};