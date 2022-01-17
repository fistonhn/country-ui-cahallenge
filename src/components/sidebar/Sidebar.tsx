// write Side type script components here.
import { Link } from "react-router-dom";
import logo from "../../icons/logo.svg";
import logo1 from "../../icons/logo1.svg";
import logo2 from "../../icons/logo2.svg";
import "./sidebar.css";
import SidebarRow from "./SidebarRow";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo2} alt="logo" />
        <img src={logo1} alt="logo" />
        <img src={logo} alt="logo" />
      </div>
      <Link to="/">
        <SidebarRow title="My List" />
      </Link>
      <Link to="/visited">
        <SidebarRow title="Visited" />
      </Link>
      <SidebarRow title="To Visit" />
    </div>
  );
};

export default Sidebar;
