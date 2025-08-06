import { NavLink } from "react-router";
import "./Navbar.css"

// left: title
// right: nav links
export default function Navbar() {
    const pagePaths = {
        "/": "Home",
        "/create": "Create Post",
        "/explore": "Explore"
    };

  return (
    <nav className="navbar-container">
        <div className="title-container">
            <NavLink
                to={"/"}
            >
                PostMySpot
            </NavLink>
        </div>
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