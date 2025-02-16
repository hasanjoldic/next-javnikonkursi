"use client";

import { useMemo } from "react";

import { useAppState } from "@/app/layout.provider";

import Job from "@/components/job";;

export default function JobPage({ params }: { params: { jobId: string } }) {
  const { jobs } = useAppState();
  const job = useMemo(() => {
    return jobs.find((job) => job.id === params.jobId);
  }, [jobs, params.jobId]);

  return (
    <div className="flex-1 h-full w-full flex">
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-4 p-4">
          {job ? (
            <Job job={job} />
          ) : (
            <div className="text-destructive">
              Konkurs nije pronađen. Proverite da li je link ispravan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
