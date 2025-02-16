import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type ICompany, upsertCompanyClient } from "@/app/api";

import { CACHE_KEYS } from "@/react-query/cache-keys";

export const useUpsertCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertCompanyClient,
    onSuccess: (data) => {
      queryClient.setQueryData<ICompany[]>(CACHE_KEYS.companies, data);
    },
  });
};