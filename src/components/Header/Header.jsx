import { NavLink } from "react-router-dom";
import "./style.css";

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li className="item">
            <NavLink
              to={"/"}
              style={({ isActive }) =>
                isActive ? { color: "brown" } : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li className="item">
            <NavLink
              to={"/history"}
              style={({ isActive }) =>
                isActive ? { color: "brown" } : undefined
              }
            >
              History
            </NavLink>
          </li>
          <li className="item">
            <NavLink
              to={"/members"}
              style={({ isActive }) =>
                isActive ? { color: "brown" } : undefined
              }
            >
              Members
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
