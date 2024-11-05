import { CreateReportWithFilesDto, ReportService } from "@/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./form/form-input";
import FormTextarea from "./form/form-textarea";
import { z } from "zod";

const createReportSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  authorName: z.string(),
  authorAge: z
    .number({ message: "Plese enter your age" })
    .int()
    .positive({ message: "Age must be a positive number" }),
  files: z.instanceof(FileList).transform((files) => Array.from(files)),
});

type CreateReportSchema = z.infer<typeof createReportSchema>;

const CreateReportForm = () => {
  const { toast } = useToast(); // show toasts - submit success/error
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateReportSchema>({
    resolver: zodResolver(createReportSchema),
  });

  const onSubmit = async (data: CreateReportWithFilesDto) => {
    try {
      setIsSubmitting(true);
      await ReportService.reportControllerCreate(data);
      toast({ description: "Report created successfully!" });
      setIsSubmitting(false);
      form.reset();
    } catch {
      toast({ description: "There was an error creating the report" });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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

        <div>
          {isSubmitting ? (
            <Button type="submit" className="w-full" disabled>
              <Loader2 /> Creating Report...
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Create Report
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateReportForm;
