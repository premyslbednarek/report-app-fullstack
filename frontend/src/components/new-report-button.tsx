import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const NewReportButton = () => (
  <Link to="/new" className="mx-2">
    <Button>
      <Plus /> New Report
    </Button>
  </Link>
);

export default NewReportButton;
