import { CreateReportWithFilesDto, ReportService } from "@/client";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

const CreateReportForm = () => {
  const { toast } = useToast(); // show toasts - submit success/error
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateReportWithFilesDto>();

  const onSubmit = async (data: CreateReportWithFilesDto) => {
    try {
      data.files = Array.from(data.files); // convert FileList to Array
      setIsSubmitting(true);
      await ReportService.reportControllerCreate(data);
      toast({ description: "Report created successfully!" });
      setIsSubmitting(false);
      reset();
    } catch {
      toast({ description: "There was an error creating the report" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-5 shadow-md rounded-md space-y-4 border border-gray-300"
    >
      <div>
        <Label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </Label>
        <Input
          {...register("title")}
          required
          className="mt-1 block w-full"
          placeholder="Enter report title"
        />
      </div>

      <div>
        <Label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </Label>
        <Textarea
          {...register("description")}
          required
          className="mt-1 block w-full h-[300px]"
          placeholder="Enter report description"
        />
      </div>

      <div>
        <Label
          htmlFor="authorName"
          className="block text-sm font-medium text-gray-700"
        >
          Author Name
        </Label>
        <Input
          {...register("authorName")}
          required
          className="mt-1 block w-full"
          placeholder="Enter author name"
        />
      </div>

      <div>
        <Label
          htmlFor="authorAge"
          className="block text-sm font-medium text-gray-700"
        >
          Author Age
        </Label>
        <Input
          {...register("authorAge")}
          type="number"
          id="authorAge"
          name="authorAge"
          required
          className="mt-1 block w-full"
          placeholder="Enter author age"
        />
      </div>

      <div>
        <Label
          htmlFor="files"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Files
        </Label>
        <Input
          {...register("files")}
          type="file"
          multiple
          className="mt-1 block w-full"
        />
      </div>

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
  );
};

export default CreateReportForm;
