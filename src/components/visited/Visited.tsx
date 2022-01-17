import Sidebar from "../sidebar/Sidebar";
import "../home/home.css";
import TopBar from "./../topbar/TopBar";
import Cards from "../cards/Cards";

const Visited: React.FC = () => {
  return (
    <div className="home">
      <div className="home__container">
        <Sidebar />
        <div className="home__content">
          <TopBar pagetitle="Visited" />
          <div className="home__card">
            <Cards visited />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visited;
