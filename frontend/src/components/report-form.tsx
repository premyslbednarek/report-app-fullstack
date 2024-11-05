import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./form/form-input";
import FormTextarea from "./form/form-textarea";
import { z } from "zod";

export const createReportSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  authorName: z.string(),
  authorAge: z
    .number({ message: "Plese enter your age" })
    .int()
    .positive({ message: "Age must be a positive number" }),
  files: z.instanceof(FileList).transform((files) => Array.from(files)),
});

export type CreateReportSchema = z.infer<typeof createReportSchema>;

type FormProps = {
  onFormSubmit: (formData: CreateReportSchema) => Promise<void>;
} & React.FormHTMLAttributes<HTMLFormElement>;

const CreateReportForm = ({ onFormSubmit, ...props }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateReportSchema>({
    resolver: zodResolver(createReportSchema),
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

export default CreateReportForm;
