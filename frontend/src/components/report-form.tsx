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
  // when isEditing is false, the form will be read-only
  // the user won't be able to submit the form and upload files
  isEditing?: boolean;
} & React.FormHTMLAttributes<HTMLFormElement>;

const ReportForm = ({
  onFormSubmit,
  defaultValues,
  isEditing = true,
  ...props
}: FormProps) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <FormInput
          label="Title"
          name="title"
          placeholder="Enter report title"
          disabled={!isEditing}
        />
        <FormTextarea
          label="Description"
          name="description"
          placeholder="Enter report description"
          className="h-[200px]"
          disabled={!isEditing}
        />
        <FormInput
          label="Author Name"
          name="authorName"
          disabled={!isEditing}
          placeholder="Enter your name"
        />
        <FormInput
          label="Author Age"
          name="authorAge"
          type="number"
          placeholder="Enter your age"
          disabled={!isEditing}
        />

        {isEditing && (
          <>
            <FormInput label="Upload Files" name="files" type="file" multiple />

            <Button
              type="submit"
              className="w-full mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 /> : "Submit"}
            </Button>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default ReportForm;
