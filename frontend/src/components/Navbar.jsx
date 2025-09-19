import { Link } from "react-router";
import { PlusIcon } from 'lucide-react'
const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10 p-4 flex justify-between items-center">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-primary font-mono tracking-tight">Note App</h1>
          <div className="flex items-center justify-between gap-4">
            <Link to="/create" className="btn btn-sm btn-primary">
              <PlusIcon  className="w-5 h-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
