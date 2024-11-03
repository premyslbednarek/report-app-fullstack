import React, { useState } from "react";
import {
  FileOutDto,
  ReportOutDto,
  ReportService,
  UpdateReportWithFilesDto,
} from "@/client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog"; // Import shadcn Dialog components
import { Download, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportOutDto;
}

const ShowFiles = ({
  files,
  onFileDelete,
}: {
  files: ReportOutDto["files"];
  onFileDelete: (fileId: string) => void;
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileOutDto | null>(null);

  if (files.length === 0) {
    return <div>No files attached</div>;
  }
  return (
    <>
      <h1>
        <strong>Files</strong>
      </h1>
      <ul className="flex flex-col gap-1">
        {files.map((file) => (
          <li key={file.id} className="flex gap-1">
            <a
              href={`/files/${file.id}`}
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
                  onFileDelete(fileToDelete.id);
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

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<UpdateReportWithFilesDto>({
    defaultValues: {
      title: report.title,
      description: report.description,
      authorName: report.authorName,
      authorAge: report.authorAge,
    },
  });

  const updateReportMutation = useMutation({
    mutationFn: async (data: UpdateReportWithFilesDto) =>
      await ReportService.reportControllerUpdate(report.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast({ description: "Report updated successfully!" });
      setIsEditing(false);
    },
    onError: () => {
      toast({ description: "Error while updating the report!" });
    },
  });

  const onSubmit = (data: UpdateReportWithFilesDto) => {
    if (data.files) {
      data.files = Array.from(data.files); // convert FileList to Array
    }
    updateReportMutation.mutate(data);
  };

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

  // Mutation for deleting a single file
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

  const form = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <div>
        <Label htmlFor="title" className="block text-sm font-medium">
          Title
        </Label>
        <Input
          {...register("title")}
          disabled={!isEditing}
          name="title"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium">
          Description
        </Label>
        <Textarea
          {...register("description")}
          disabled={!isEditing}
          name="description"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <Label htmlFor="authorName" className="block text-sm font-medium">
          Author name:
        </Label>
        <Input
          {...register("authorName")}
          disabled={!isEditing}
          name="authorName"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <Label htmlFor="authorAge" className="block text-sm font-medium">
          Author age:
        </Label>
        <Input
          {...register("authorAge")}
          disabled={!isEditing}
          name="authorAge"
          type="number"
          className="mt-1 block w-full"
        />
      </div>

      {isEditing && (
        <>
          <Label htmlFor="files" className="block text-sm font-medium">
            Add files
          </Label>
          <div>
            <Input {...register("files")} type="file" multiple></Input>
          </div>
        </>
      )}

      <div>
        {isEditing && (
          <div className="flex gap-1">
            <Button type="submit">Save Changes</Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        )}
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit</Button>}
      </div>
    </form>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {form}
          <ShowFiles
            files={report.files}
            onFileDelete={deleteFileMutation.mutate}
          />
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
