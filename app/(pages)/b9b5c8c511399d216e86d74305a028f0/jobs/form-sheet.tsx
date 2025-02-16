import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { upsertJobSchema, type IJob } from "@/app/api"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpsertJob } from "@/react-query"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Combobox from "@/components/combobox"
import { useAppState } from "@/app/layout.provider"
import { useEffect, useMemo, useRef } from "react"
import { regions } from "@/data"
import DatePicker from "@/components/date-picker"

type FormValues = z.infer<typeof upsertJobSchema>;

const getDefaultValues = (job?: IJob) => {
  return {
    id: job?.id,
    company_id: job?.company_id || "",
    job_type_id: job?.job_type_id || "",

    title: job?.title || "",
    region: job?.region,

    number_of_openings: job?.number_of_openings || 0,

    start_date: job?.start_date || "",
    end_date: job?.end_date || "",

    external_url: job?.external_url || "",

    notes: job?.notes || "",
  }
};

type Props = {
  job?: IJob;
  onClose: () => void;
}

export function JobFormSheet({ job, onClose }: Props) {
  const { jobTypes, companies } = useAppState();

  const { mutateAsync: upsertJob } = useUpsertJob();

  const form = useForm<FormValues>({
    resolver: zodResolver(upsertJobSchema),
    defaultValues: getDefaultValues(job),
  });

  useEffect(() => {
    form.reset(getDefaultValues(job));
  }, [job]);

  const formRef = useRef<HTMLFormElement>(null);

  const submit = async ({ id, ...values }: FormValues) => {
    if (job) {
      toast.promise(upsertJob({ id, ...values }), {
        loading: "Updating job...",
        success: () => {
          onClose();
          return "Job updated";
        },
        error: (error) => {
          return `Failed to update job: ${error.message}`;
        },
      });
    } else {
      toast.promise(upsertJob(values), {
        loading: "Creating job...",
        success: () => {
          onClose();
          return "Job created";
        },
        error: (error) => {
          return `Failed to create job: ${error.message}`;
        },
      });
    }
  };

  const companyOptions = useMemo(() => {
    return companies.map((o) => ({
      label: o.title,
      value: o.id,
    }));
  }, [companies]);

  const jobTypeOptions = useMemo(() => {
    return jobTypes.map((o) => ({
      label: o.title,
      value: o.id,
    }));
  }, [jobTypes]);

  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Sheet open onOpenChange={handleClose}>
      <SheetContent className="w-[760px] !max-w-[960px] flex flex-col">
        <SheetHeader>
          <SheetTitle>
            {job ? "Edit job" : "Create job"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            ref={formRef}
            className="flex-1 flex flex-col gap-4"
            onSubmit={form.handleSubmit(submit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job_type_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Combobox
                      options={jobTypeOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Combobox
                      options={regions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Combobox
                      options={companyOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number_of_openings"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Number of Openings</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="external_url"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>External URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="screenshot"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Screenshot</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      value={undefined}
                      onChange={(event) =>
                        field.onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <textarea placeholder="Enter notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={form.handleSubmit(submit)}
              disabled={form.formState.isSubmitting}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet >
  )
}
