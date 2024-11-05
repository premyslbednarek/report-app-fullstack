import { useState } from "react";
import { ReportOutDto, ReportService } from "@/client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import EditableReportDisplay from "./editable-report-display";
import FileList from "./file-list";

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportOutDto;
}

const ReportDetailsModal = ({
  isOpen,
  onClose,
  report,
}: ReportDetailsModalProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // mutation for deleting the report
  const deleteReportMutation = useMutation({
    mutationFn: async () =>
      await ReportService.reportControllerRemove(report.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast({ description: "Report deleted successfully!" });
      onClose();
    },
    onError: () => {
      alert("Failed to delete the report.");
    },
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>

          <EditableReportDisplay report={report} />

          <FileList report={report} />

          <DialogFooter className="flex items-center">
            <Button
              variant="destructive"
              onClick={() => setIsConfirmOpen(true)}
            >
              Delete Report
            </Button>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deletion Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this report?</p>
          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => deleteReportMutation.mutate()}
            >
              Yes, Delete
            </Button>
            <Button onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportDetailsModal;
