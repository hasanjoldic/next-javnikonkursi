"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { type ERegion } from "@/data";
import { LocalStorageUtils } from "@/utils/local-storage";
import { type ICompany, type IJob, type IJobType } from "@/app/api";
import { useCompanies, useJobs, useJobTypes } from "@/react-query";

import LinearProgress from "@/components/linear-progress";

type IFilters = {
  regions: Set<ERegion>;
  jobTypes: Set<string>;
  companies: Set<string>;
  jobs: Set<string>;
  includeExpired: false;
};

type IAppStateContext = {
  companies: ICompany[];
  jobTypes: IJobType[];
  jobs: IJob[];

  filters: IFilters;
  setFilters: (filters: IFilters) => void;
};

const INITIAL_FILTERS: IFilters = {
  regions: new Set<ERegion>(),
  jobTypes: new Set<string>(),
  companies: new Set<string>(),
  jobs: new Set<string>(),
  includeExpired: false,
};

const getFiltersFromLs = () => {
  const lsFilters = LocalStorageUtils.getItem("filters");

  if (!lsFilters) {
    return INITIAL_FILTERS;
  }

  try {
    const parsedFilters = JSON.parse(lsFilters);
    const filters: IFilters = {
      regions: new Set(parsedFilters.regions),
      jobTypes: new Set(parsedFilters.jobTypes),
      companies: new Set(parsedFilters.companies),
      jobs: new Set(parsedFilters.jobs),
      includeExpired: parsedFilters.includeExpired,
    };
    return filters;
  } catch {
    return INITIAL_FILTERS;
  }
}

const setFiltersToLs = (filters: IFilters) => {
  LocalStorageUtils.setItem("filters", JSON.stringify({
    regions: Array.from(filters.regions),
    jobTypes: Array.from(filters.jobTypes),
    companies: Array.from(filters.companies),
    jobs: Array.from(filters.jobs),
    includeExpired: filters.includeExpired,
  }));
}

// @ts-expect-error lazy init
const AppStateContext = createContext<IAppStateContext>();

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}

export default function AppStateProvider({
  children,
  companies: _companies,
  jobs: _jobs,
  jobTypes: _jobTypes,
}: {
  children: React.ReactNode;
  companies: ICompany[];
  jobs: IJob[];
  jobTypes: IJobType[];
}) {
  const { data: companies } = useCompanies({ initialData: _companies });
  const { data: jobs } = useJobs({ initialData: _jobs });
  const { data: jobTypes } = useJobTypes({ initialData: _jobTypes });

  const [filters, _setFilters] = useState<IFilters>(getFiltersFromLs);
  const setFilters = useCallback((filters: IFilters) => {
    _setFilters(filters);
    setFiltersToLs(filters);
  }, []);

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    let filteredJobs = jobs;

    if (filters.regions.size) {
      // @ts-expect-error placeholder
      filteredJobs = filteredJobs.filter((job) => filters.regions.has(job.region));
    }

    if (filters.jobTypes.size) {
      filteredJobs = filteredJobs.filter((job) => filters.jobTypes.has(job.job_type?.id || ""));
    }

    if (filters.companies.size) {
      filteredJobs = filteredJobs.filter((job) => filters.companies.has(job.company?.id || ""));
    }

    return filteredJobs;
  }, [jobs, filters]);

  if (!companies || !jobs || !jobTypes) {
    return <LinearProgress />;
  }

  return (
    <AppStateContext.Provider value={{
      companies,
      jobs: filteredJobs,
      jobTypes,
      filters,
      setFilters
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

