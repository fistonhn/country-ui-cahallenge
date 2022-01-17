import CountryDetails from "./CountryDetails";
import TopBar from "../topbar/TopBar";
import Sidebar from "./../sidebar/Sidebar";
import "./detail.css";
// import { CardDetailType } from "../../types/interface";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { userSelector } from "../../features/auth/authSlice";
import {
  countrySelector,
  querySingleCountry,
} from "./../../features/country/countrySlice";
import { toast } from "react-toastify";

const Detail: React.FC = () => {
  const { id } = useParams();
  const { singleDoc, isLoading } = useAppSelector(countrySelector);
  const { user } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const fetchDocument = async () => {
    try {
      const d = await user;
      dispatch(querySingleCountry({ userId: d.userId, cardId: id }));
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchDocument();
  }, [dispatch]);
  return (
    <div className="detail">
      <div className="detail__container">
        <Sidebar />
        <div className="detail__content">
          <TopBar isDetail />
          {singleDoc && (
            <CountryDetails
              key={singleDoc.id}
              flags={singleDoc.flags}
              nativeName={singleDoc.nativeName}
              population={singleDoc.population}
              region={singleDoc.region}
              subregion={singleDoc.subregion}
              topLevelDomain={singleDoc.topLevelDomain}
              languages={singleDoc.languages}
              borders={singleDoc.borders}
              name={singleDoc.name}
              capital={singleDoc.capital}
              currencies={singleDoc.currencies}
            />
          )}
          {isLoading && <div>Loading...</div>}
          {!isLoading && !singleDoc && <div>Country Doesn't Exist!</div>}
        </div>
      </div>
    </div>
  );
};

export default Detail;
