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
import { CompanyFormSheet } from "@/app/(pages)/b9b5c8c511399d216e86d74305a028f0/companies/form-sheet";

export default function CompaniesPage() {
  const { companies } = useAppState();

  const [isCompanyFormSheetOpen, setIsCompanyFormSheetOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>();

  const selectedCompany = useMemo(() => {
    return companies.find((company) => company.id === selectedCompanyId);
  }, [selectedCompanyId, companies]);

  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-medium">Companies</div>
          <Button onClick={() => setIsCompanyFormSheetOpen(true)}>
            <PlusIcon />
            New Company
          </Button>
        </div>

        <Card className="rounded">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.title}</TableCell>
                  <TableCell>{company.region}</TableCell>
                  <TableCell>{company.url}</TableCell>
                  <TableCell>{company.created_at.slice(0, 10)}</TableCell>
                  <TableCell>{company.updated_at.slice(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {isCompanyFormSheetOpen && (
        <CompanyFormSheet
          company={selectedCompany}
          onClose={() => setIsCompanyFormSheetOpen(false)}
        />
      )}
    </>
  )
}