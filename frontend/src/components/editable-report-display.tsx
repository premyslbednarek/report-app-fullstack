import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import ReportForm from "./report-form";
import { CreateReportSchema } from "./report-form-schema";
import {
  ReportOutDto,
  ReportService,
  UpdateReportWithFilesDto,
} from "@/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const EditableReportDisplay = ({ report }: { report: ReportOutDto }) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateReportMutation = useMutation({
    mutationFn: async (data: UpdateReportWithFilesDto) =>
      await ReportService.reportControllerUpdate(report.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast({ description: "Report updated successfully!" });
    },
    onError: () => {
      toast({ description: "Error while updating the report!" });
    },
  });

  return (
    <>
      <ReportForm
        isEditing={isEditing}
        onFormSubmit={async (data: CreateReportSchema) => {
          updateReportMutation.mutate(data);
          setIsEditing(false);
        }}
        defaultValues={{
          title: report.title,
          description: report.description,
          authorName: report.authorName,
          authorAge: report.authorAge,
        }}
      />

      {!isEditing && (
        <>
          <Button className="mt-3" onClick={() => setIsEditing(!isEditing)}>
            <Edit /> Edit Report
          </Button>
        </>
      )}
    </>
  );
};

export default EditableReportDisplay;
