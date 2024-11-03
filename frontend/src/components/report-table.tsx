import { ReportService } from "@/client";
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

const ReportTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => ReportService.reportControllerFindAll(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
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
            <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <Button>Open details</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportTable;
