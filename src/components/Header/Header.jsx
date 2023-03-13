import { NavLink } from "react-router-dom";
import "./style.css";

export const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to={"/"} className="item">
          Home
        </NavLink>
        <NavLink to={"/history"} className="item">
          History
        </NavLink>
        <NavLink to={"/members"} className="item">
          Members
        </NavLink>
      </nav>
    </header>
  );
};
