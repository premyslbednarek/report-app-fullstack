import { ReportService } from "@/client";
import CreateReportForm, { CreateReportSchema } from "@/components/report-form";
import { useToast } from "@/hooks/use-toast";

const NewReport = () => {
  const { toast } = useToast(); // show toasts - submit success/error

  const onSubmit = async (formData: CreateReportSchema) => {
    try {
      await ReportService.reportControllerCreate(formData);
      toast({ description: "Report created successfully!" });
    } catch {
      toast({ description: "There was an error creating the report" });
    }
  };

  return <CreateReportForm onFormSubmit={onSubmit} />;
};

export default NewReport;
