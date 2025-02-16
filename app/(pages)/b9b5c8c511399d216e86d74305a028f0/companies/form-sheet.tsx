import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { ICompany, upsertCompanySchema } from "@/app/api"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpsertCompany } from "@/react-query"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Combobox from "@/components/combobox"
import { useEffect, useRef } from "react"
import { regions } from "@/data"

type FormValues = z.infer<typeof upsertCompanySchema>;

const getDefaultValues = (company?: ICompany) => {
  if (!company) {
    return undefined;
  }

  return {
    id: company.id,
    title: company.title,
    region: company.region || undefined,
    url: company.url,
  };
};

type Props = {
  company?: ICompany;
  onClose: () => void;
}

export function CompanyFormSheet({ company, onClose }: Props) {
  const { mutateAsync: upsertCompany } = useUpsertCompany();

  const form = useForm<FormValues>({
    resolver: zodResolver(upsertCompanySchema),
    defaultValues: getDefaultValues(company),
  });

  useEffect(() => {
    form.reset(getDefaultValues(company));
  }, [company, form]);

  const formRef = useRef<HTMLFormElement>(null);

  const submit = async ({ id, ...values }: FormValues) => {
    if (company) {
      toast.promise(upsertCompany({ id, ...values }), {
        loading: "Updating company...",
        success: () => {
          onClose();
          return "Company updated";
        },
        error: (error) => {
          return `Failed to update company: ${error.message}`;
        },
      });
    } else {
      toast.promise(upsertCompany(values), {
        loading: "Creating company...",
        success: () => {
          onClose();
          return "Company created";
        },
        error: (error) => {
          return `Failed to create company: ${error.message}`;
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
            {company ? "Edit company" : "Create company"}
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
              name="region"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Combobox
                      options={regions}
                      value={field.value || undefined}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL" {...field} />
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
