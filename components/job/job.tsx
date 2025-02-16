import Link from "next/link";
import {
  BriefcaseIcon,
  BuildingIcon,
  ExternalLinkIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";

import { regionsByValue } from "@/data";
import { type IJob } from "@/app/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


export default function Job({
  job,
}: {
  job: IJob;
}) {
  return (
    <Card className="rounded w-full px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">{job.title}</div>
        <Button className="px-4 py-2" asChild>
          <Link href={`/konkursi/${job.id}`}>
            Otvori <ExternalLinkIcon size={20} />
          </Link>
        </Button>
      </div>

      <hr className="my-4" />

      <div className="py-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex items-center space-x-2 mb-2 lg:mb-0">
            <MapPinIcon size={20} />
            <span>{regionsByValue.get(job.region)?.label}</span>
          </div>
          <div className="flex items-center space-x-2 mb-2 lg:mb-0">
            <BuildingIcon size={20} />
            <span>{job.company?.title || "Nepoznata firma"}</span>
          </div>

          <div className="flex items-center space-x-2 mb-2 lg:mb-0">
            <BriefcaseIcon size={20} />
            <span>{job.job_type?.title || "Nepoznata pozicija"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <UsersIcon size={20} />
            <span>{job.number_of_openings || "Nepoznato"}</span>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <div className="py-4">
        {/* <p className="text-sm">Objavljeno: {dateFormat(job.startDate, EDateFormat["DD.MM.YYYY"])}</p>
        <p className="text-sm">Ističe: {dateFormat(job.endDate, EDateFormat["DD.MM.YYYY"])}</p> */}
        <p className="text-sm">Objavljeno: {job.start_date || "Nepoznato"}</p>
        <p className="text-sm">Ističe: {job.end_date || "Nepoznato"}</p>
      </div>

      {job.notes && (
        <div className="py-4">
          <hr className="my-4" />
          <div className="py-4">
            <p>{job.notes}</p>
          </div>
          <hr className="my-4" />
        </div>
      )}

      <div className="pt-4">
        <div className="flex gap-2">
          {job.external_url && (
            <Button className="px-4 py-2" asChild>
              <Link href={job.external_url} target="_blank" rel="noreferrer">
                Izvorni oglas <ExternalLinkIcon size={20} />
              </Link>
            </Button>
          )}

          <Button className="px-4 py-2" asChild>
            <Link href={`https://zisknbeiauaqwlzdhtgo.supabase.co/storage/v1/object/public/job-ads/${job.id}`}>
              Arhivirani oglas <ExternalLinkIcon size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};