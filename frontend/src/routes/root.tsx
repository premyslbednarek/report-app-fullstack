import NewReportButton from "@/components/new-report-button";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <h1>Front Page</h1>
      <Link to="/reports">
        <Button>Browse reports</Button>
      </Link>
      <NewReportButton />
    </div>
  );
};

export default FrontPage;
