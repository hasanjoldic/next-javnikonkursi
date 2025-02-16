"use client";

import { useAppState } from "@/app/layout.provider";;

import Job from "@/components/job";

import Filters from "./components/filters";

export default function IndexPage() {
  const { jobs } = useAppState();

  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-4 p-4">
        <div className="w-full flex items-center gap-2">
          <Filters />
        </div>
        {jobs.length > 0 ?
          jobs.map((job) => (
            <Job key={job.id} job={job} />
          )) : (
            <div className="p-2 text-center">
              Nema konkursa za date filtere.
            </div>
          )}
      </div>
    </div>
  );
};
