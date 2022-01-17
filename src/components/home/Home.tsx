import Sidebar from "../sidebar/Sidebar";
import "./home.css";
import TopBar from "./../topbar/TopBar";
import Cards from "../cards/Cards";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <Sidebar />
        <div className="home__content">
          <TopBar pagetitle="My List" />
          <div className="home__card">
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
