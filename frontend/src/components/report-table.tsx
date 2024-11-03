import { ReportOutDto, ReportService } from "@/client";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import ReportDetailsModal from "./report-details-modal";

const ReportTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => ReportService.reportControllerFindAll(),
  });

  const [selectedReport, setSelectedReport] = useState<ReportOutDto | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (report: ReportOutDto) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report title</TableHead>
            <TableHead>Report author</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="w-[50px]">Report details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.authorName}</TableCell>
              <TableCell>
                {new Date(report.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <Button onClick={() => openModal(report)}>Open details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedReport && (
        <ReportDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          report={selectedReport}
        />
      )}
    </>
  );
};

export default ReportTable;
