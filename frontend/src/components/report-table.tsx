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
import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ReportDetailsModal from "./report-details-modal";
import NewReportButton from "./new-report-button";

const ReportTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => ReportService.reportControllerFindAll(),
  });

  const [selectedReportId, setSelectedReportId] = useState<
    ReportOutDto["id"] | null
  >(null);
  const selectedReport = data?.find((report) => report.id === selectedReportId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (report: ReportOutDto) => {
    setSelectedReportId(report.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReportId(null);
    setIsModalOpen(false);
  };

  const columns = useMemo<ColumnDef<ReportOutDto, string>[]>(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Author Name",
        accessorKey: "authorName",
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          return date.toLocaleString();
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <Button onClick={() => openModal(row.original)}>View</Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1">
        <p>No reports found!</p>
        <NewReportButton />
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
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
