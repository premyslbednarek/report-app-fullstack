import { useState } from "react";
import { FileOutDto, ReportOutDto, ReportService } from "@/client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog"; // Import shadcn Dialog components
import { Download, Trash } from "lucide-react";
import { BASE_URL } from "@/main";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const FileList = ({ report }: { report: ReportOutDto }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileOutDto | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // mutation for deleting a single file
  const deleteFileMutation = useMutation({
    mutationFn: async (fileId: string) => {
      return await ReportService.reportControllerUpdate(report.id, {
        fileToDelete: fileId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast({ description: "File deleted successfully!" });
    },
    onError: () => {
      toast({ description: "Error while deleting the file!" });
    },
  });

  if (report.files.length === 0) {
    return <div>No files attached</div>;
  }
  return (
    <>
      <h1>
        <strong>Files</strong>
      </h1>
      <ul className="flex flex-col gap-1">
        {report.files.map((file) => (
          <li key={file.id} className="flex gap-1">
            <a
              href={`${BASE_URL}/file/${file.id}`}
              download={file.name}
              className="text-blue-500 flex items-center"
            >
              <Download className="mr-2" /> {file.name}
            </a>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setIsConfirmOpen(true);
                setFileToDelete(file);
              }}
            >
              <Trash /> Delete
            </Button>
          </li>
        ))}
      </ul>

      {/* File deletion confirmation */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm File Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the following file?</p>
          <p>File to delete: {fileToDelete?.name}</p>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                if (fileToDelete) {
                  deleteFileMutation.mutate(fileToDelete.id);
                }
                setIsConfirmOpen(false);
              }}
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

export default FileList;
