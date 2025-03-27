import { NavLink, useSearchParams } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="bg-[#212121] text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="bg-yellow-500 p-2 rounded-lg text-black font-bold">
            NS
          </span>
          <h1 className="text-xl font-semibold">NoteSaver</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
              }`
            }
          >
            Notes
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 bg-[#181818] p-4 rounded-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Notes
          </NavLink>
        </div>
      )}
    </nav>
  );
}
