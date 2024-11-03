import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
