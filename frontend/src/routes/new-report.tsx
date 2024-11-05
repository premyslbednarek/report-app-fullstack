import { ReportService } from "@/client";
import Card from "@/components/card";
import ReportForm from "@/components/report-form";
import { CreateReportSchema } from "@/components/report-form-schema";
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

  return (
    <Card>
      <ReportForm onFormSubmit={onSubmit} />
    </Card>
  );
};

export default NewReport;
