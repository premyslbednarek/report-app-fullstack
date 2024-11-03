import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between p-4 shadow-md items-center mb-3">
        <div>
          <Link to="/" className="mx-2">
            Frontpage
          </Link>
          <Link to="/reports" className="mx-2">
            Reports
          </Link>
        </div>
        <Link to="/new" className="mx-2">
          <Button>
            <Plus /> New Report
          </Button>
        </Link>
      </nav>
    </>
  );
};
