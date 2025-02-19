"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAppState } from "@/app/layout.provider";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { JobTypeFormSheet } from "@/app/(pages)/b9b5c8c511399d216e86d74305a028f0/job-types/form-sheet";

export default function JobTypesPage() {
  const { jobTypes } = useAppState();

  const [isJobTypeFormSheetOpen, setIsJobTypeFormSheetOpen] = useState(false);
  const [selectedJobTypeId, setSelectedJobTypeId] = useState<string | null>(null);

  const selectedJobType = useMemo(() => {
    return jobTypes.find((jobType) => jobType.id === selectedJobTypeId);
  }, [selectedJobTypeId, jobTypes]);

  const handleEditJobType = (jobTypeId: string) => {
    setSelectedJobTypeId(jobTypeId);
    setIsJobTypeFormSheetOpen(true);
  };

  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-medium">Job Types</div>
          <Button
            onClick={() => {
              setSelectedJobTypeId(null);
              setIsJobTypeFormSheetOpen(true);
            }}
          >
            <PlusIcon />
            New Job Type
          </Button>
        </div>

        <Card className="rounded">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobTypes.map((jobType) => (
                <TableRow
                  key={jobType.id}
                  onClick={() => handleEditJobType(jobType.id)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{jobType.title}</TableCell>
                  <TableCell>{jobType.notes}</TableCell>
                  <TableCell>{jobType.created_at.slice(0, 10)}</TableCell>
                  <TableCell>{jobType.updated_at.slice(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {isJobTypeFormSheetOpen && (
        <JobTypeFormSheet
          jobType={selectedJobType}
          onClose={() => setIsJobTypeFormSheetOpen(false)}
        />
      )}
    </>
  );
}