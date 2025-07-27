import { NavLink } from "react-router";
import "./Navbar.css"

export default function Navbar() {
    const pagePaths = {
        "/": "Home",
        "/create": "Create a Crewmate",
        "/gallery": "Gallery"
    };

  return (
    <nav className="navbar-container">
        <div className="navlink-container">
            {Object.entries(pagePaths).map(([path, label]) => (
                <NavLink 
                    key={path}
                    to={path}
                    end={path === "/"} 
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    {label}
                </NavLink>
            ))}
        </div>
    </nav>
  );
}