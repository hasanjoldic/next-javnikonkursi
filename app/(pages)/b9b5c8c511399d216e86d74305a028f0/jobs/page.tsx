"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useAppState } from "@/app/layout.provider"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { JobFormSheet } from "@/app/(pages)/b9b5c8c511399d216e86d74305a028f0/jobs/form-sheet";

export default function CompaniesPage() {
  const { jobs } = useAppState();

  const [isJobFormSheetOpen, setIsJobFormSheetOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>();

  const selectedJob = useMemo(() => {
    return jobs.find((job) => job.id === selectedJobId);
  }, [selectedJobId, jobs]);

  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-medium">Jobs</div>
          <Button onClick={() => setIsJobFormSheetOpen(true)}>
            <PlusIcon />
            New Job
          </Button>
        </div>

        <Card className="rounded">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Number of Openings</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.region}</TableCell>
                  <TableCell>{job.company?.title}</TableCell>
                  <TableCell>{job.job_type?.title}</TableCell>
                  <TableCell>{job.number_of_openings}</TableCell>
                  <TableCell>{job.start_date}</TableCell>
                  <TableCell>{job.end_date}</TableCell>
                  <TableCell>{job.created_at.slice(0, 10)}</TableCell>
                  <TableCell>{job.updated_at.slice(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {isJobFormSheetOpen && (
        <JobFormSheet
          job={selectedJob}
          onClose={() => setIsJobFormSheetOpen(false)}
        />
      )}
    </>
  )
}