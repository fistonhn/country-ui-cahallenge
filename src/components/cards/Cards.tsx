import { Flags } from "../../types/interface";
import { useEffect } from "react";
import Card from "./Card";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/auth/authSlice";
import {
  countrySelector,
  deleteCountry,
  markCountryAsVisited,
  queryVisitedCountries,
} from "../../features/country/countrySlice";
import { useAppDispatch } from "../../app/hooks";
import { fetchCountries } from "../../features/country/countrySlice";
import { toast } from "react-toastify";

type VisitedCountriesType = {
  visited?: boolean;
};

const Cards: React.FC<VisitedCountriesType> = ({ visited }) => {
  const { user } = useAppSelector(userSelector);
  const { data, isLoading } = useAppSelector(countrySelector);
  const dispatch = useAppDispatch();

  // const fetchData = async () => {
  //   try {
  //     const data = await user;
  //     if (visited) {
  //       return dispatch(queryVisitedCountries({ userId: data.userId }));
  //     }
  //     dispatch(fetchCountries(data.userId));
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };

  const handleDelete = (userId: string, cardId: string) => {
    dispatch(
      deleteCountry({
        userId,
        cardId,
      })
    );
  };

  const handleVisited = (userId: string, cardId: string) => {
    dispatch(
      markCountryAsVisited({
        userId,
        cardId,
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await user;
        if (visited) {
          return dispatch(queryVisitedCountries({ userId: data.userId }));
        }
        dispatch(fetchCountries(data.userId));
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="home__card">
      {data?.map(
        (country: {
          id: string;
          flags: Flags;
          name: string;
          population: number;
          capital: string;
          currencies: string;
          isVisited: boolean;
        }) => (
          <Card
            key={country.id}
            flags={country.flags}
            name={country.name}
            population={country.population}
            capital={country.capital}
            currencies={country.currencies}
            link={`${country.id}`}
            cardId={country.id}
            userId={user?.userId}
            handleDeleteFunction={handleDelete}
            handleVisitedFunction={handleVisited}
            isVisited={country.isVisited}
          />
        )
      )}
      {isLoading && <div>Loading...</div>}
      {data.length === 0 && visited && !isLoading && <div>Not Found</div>}
    </div>
  );
};

export default Cards;
