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
} from "@/components/ui/sheet"

import { ICompany, IJobType, upsertJobTypeSchema, upsertJobSchema, type IJob } from "@/app/api"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpsertJob, useUpsertJobType } from "@/react-query"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Combobox from "@/components/combobox"
import { useAppState } from "@/app/layout.provider"
import { useEffect, useMemo, useRef } from "react"
import { regions } from "@/data"
import DatePicker from "@/components/date-picker"

type FormValues = z.infer<typeof upsertJobTypeSchema>;

const getDefaultValues = (jobType?: IJobType) => {
  if (!jobType) {
    return undefined;
  }

  return {
    id: jobType.id,
    title: jobType.title,
    notes: jobType.notes || undefined,
  };
};

type Props = {
  jobType?: IJobType;
  onClose: () => void;
}

export function JobTypeFormSheet({ jobType, onClose }: Props) {
  const { mutateAsync: upsertJobType } = useUpsertJobType();

  const form = useForm<FormValues>({
    resolver: zodResolver(upsertJobTypeSchema),
    defaultValues: getDefaultValues(jobType),
  });

  useEffect(() => {
    form.reset(getDefaultValues(jobType));
  }, [jobType]);

  const formRef = useRef<HTMLFormElement>(null);

  const submit = async ({ id, ...values }: FormValues) => {
    if (jobType) {
      toast.promise(upsertJobType({ id, ...values }), {
        loading: "Updating job type...",
        success: () => {
          onClose();
          return "Job type updated";
        },
        error: (error) => {
          return `Failed to update job type: ${error.message}`;
        },
      });
    } else {
      toast.promise(upsertJobType(values), {
        loading: "Creating job type...",
        success: () => {
          onClose();
          return "Job type created";
        },
        error: (error) => {
          return `Failed to create job type: ${error.message}`;
        },
      });
    }
  };

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
            {jobType ? "Edit job type" : "Create job type"}
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
              name="notes"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter notes" {...field} />
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
