import Dropdown from "react-dropdown";
import "./topbar.css";
import darkToggle from "../../icons/dark-toggle.svg";
import bellIcon from "../../icons/bell.svg";
import searchIcon from "../../icons/search.svg";
import dropdownIndicator from "../../icons/dropdown-check.svg";
import backbuttonIcon from "../../icons/back-icon.svg";
import { BackButtonType } from "../../types/interface";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { saveUser, userSelector } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./../../app/hooks";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {
  searchCountry,
  searchCountryByContinent,
} from "./../../features/country/countrySlice";

// Material UI Components
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

const TopBar: React.FC<BackButtonType> = ({ isDetail, pagetitle }) => {
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const options = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const { user } = useAppSelector(userSelector);

  const dispatch = useAppDispatch();
  // search handle

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  // onClick handle
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(
      searchCountry({
        userId: user.userId,
        countryName: country,
      })
    );
  };
  // listen to enter key

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (country !== "" && e.key === "Enter") {
      dispatch(
        searchCountry({
          userId: user.userId,
          countryName: country,
        })
      );
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(saveUser(undefined));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // account dropdown menu

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (continent !== "") {
      dispatch(
        searchCountryByContinent({
          userId: user.userId,
          continent: continent,
        })
      );
    }
  }, [dispatch, continent]);

  return (
    <>
      <div className="topbar">
        <div className="topbar__left">
          {isDetail ? (
            <h1>
              {" "}
              <Link to="/" className="back-button">
                <img
                  src={backbuttonIcon}
                  alt="Back button"
                  className="backbutton__img"
                />{" "}
                Back
              </Link>{" "}
            </h1>
          ) : (
            <h1 className="page-title">{pagetitle}</h1>
          )}
        </div>
        <div className="topbar__right">
          <div className="toggle">
            <h3>Dark Mode</h3>
            <button className="toggle-btn">
              <img src={darkToggle} alt="dark mode toggle" />
            </button>
          </div>
          <div className="bell-icon">
            <a href="/">
              {" "}
              <img src={bellIcon} alt="bell icon" />{" "}
            </a>
          </div>
          <div className="user-icon">
            {user && (
              <a href="/">
                Hey,{" "}
                <span className="user-name">
                  {" "}
                  {user?.displayName || "username"}{" "}
                </span>{" "}
                <button
                  onClick={handleProfileClick}
                  style={{
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    background: "none",
                  }}
                >
                  <Avatar
                    src={user?.photoURL}
                    alt="profile"
                    className="profile"
                  />
                </button>
              </a>
            )}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />

              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      {isDetail ? (
        ""
      ) : (
        <div className="topbar-search__filter">
          <div className="topbar-search__filter-left">
            {/* search form with magnificent glass */}
            <form className="search-form">
              <div className="search-form__input-container">
                <input
                  type="text"
                  placeholder="Search For a Country"
                  className="search-form__input"
                  value={country}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                />
                <button className="search-form__button" onClick={handleClick}>
                  <img src={searchIcon} alt="bell icon" />
                </button>
              </div>
            </form>
          </div>
          <div className="topbar-search__filter-right">
            {/* dropdown */}
            <img
              src={dropdownIndicator}
              alt="dropdown indicator"
              className="indicator-img"
              style={{ width: "14px", height: "8px" }}
            />
            <div className="dropdown">
              <Dropdown
                options={options}
                placeholder="Filter by Region"
                className="dropdown__select"
                controlClassName="dropdownControlClassName"
                placeholderClassName="dropdownPlaceholderClassName"
                menuClassName="dropdownMenuClassName"
                arrowClassName="dropdownArrowClassName"
                arrowClosed={<span className="arrow-closed" />}
                arrowOpen={<span className="arrow-open" />}
                value={continent}
                onChange={(e) => {
                  setContinent(e.value);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
