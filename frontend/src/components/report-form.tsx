import { CreateReportWithFilesDto, ReportService } from "@/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./form/form-input";
import FormTextarea from "./form/form-textarea";

const CreateReportForm = () => {
  const { toast } = useToast(); // show toasts - submit success/error
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateReportWithFilesDto>();

  const onSubmit = async (data: CreateReportWithFilesDto) => {
    try {
      data.files = Array.from(data.files); // convert FileList to Array
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
