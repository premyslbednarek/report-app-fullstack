import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./form/form-input";
import FormTextarea from "./form/form-textarea";
import { createReportSchema, CreateReportSchema } from "./report-form-schema";

type FormProps = {
  onFormSubmit: (formData: CreateReportSchema) => Promise<void>;
  defaultValues?: Omit<CreateReportSchema, "files">;
} & React.FormHTMLAttributes<HTMLFormElement>;

const ReportForm = ({ onFormSubmit, defaultValues, ...props }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(defaultValues);

  const form = useForm<CreateReportSchema>({
    resolver: zodResolver(createReportSchema),
    defaultValues,
  });

  const onSubmit = async (formData: CreateReportSchema) => {
    setIsSubmitting(true);
    await onFormSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className="max-w-lg mx-auto p-5 shadow-md rounded-md space-y-2 border border-gray-300"
      >
        <FormInput
          label="Title"
          name="title"
          placeholder="Enter report title"
        />
        <FormTextarea
          label="Description"
          name="description"
          placeholder="Enter report description"
          className="h-[300px]"
        />
        <FormInput
          label="Author Name"
          name="authorName"
          placeholder="Enter your name"
        />
        <FormInput
          label="Author Age"
          name="authorAge"
          type="number"
          placeholder="Enter your age"
        />
        <FormInput label="Upload Files" name="files" type="file" multiple />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 /> : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ReportForm;
