import { ReportService } from "@/client";
import Card from "@/components/card";
import ReportForm from "@/components/report-form";
import { CreateReportSchema } from "@/components/report-form-schema";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const NewReport = () => {
  const { toast } = useToast(); // show toasts - submit success/error
  const navigate = useNavigate();

  const createReportMutation = useMutation({
    mutationFn: async (formData: CreateReportSchema) => {
      await ReportService.reportControllerCreate(formData);
    },
    onSuccess: () => {
      toast({ description: "Report created successfully!" });
      navigate("/reports");
    },
    onError: () => {
      toast({ description: "There was an error creating the report" });
    },
  });

  return (
    <Card>
      <ReportForm
        onFormSubmit={async (formData) =>
          createReportMutation.mutateAsync(formData)
        }
      />
    </Card>
  );
};

export default NewReport;
