import React, { useState } from "react";
import { ReportOutDto, ReportService } from "@/client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog"; // Import shadcn Dialog components
import { Download } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportOutDto;
}

const ShowFiles = ({ files }: { files: ReportOutDto["files"] }) => {
  if (files.length === 0) {
    return <div>No files attached</div>;
  }
  return (
    <>
      <h1>
        <strong>Files</strong>
      </h1>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a
              href={`/files/${file.id}`}
              download={file.name}
              className="text-blue-500 flex items-center"
            >
              <Download className="mr-2" /> {file.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
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

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <strong>Title:</strong> {report.title}
            </p>
            <p>
              <strong>Description:</strong> {report.description}
            </p>
            <p>
              <strong>Author Name:</strong> {report.authorName}
            </p>
            <p>
              <strong>Author Age:</strong> {report.authorAge}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(report.createdAt).toLocaleString()}
            </p>

            <ShowFiles files={report.files} />
          </div>
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
            <Button variant="destructive" onClick={handleDelete}>
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
