import { CardDetailType } from "../../types/interface";
import "./countryDetail.css";

const CountryDetails: React.FC<CardDetailType> = ({
  flags,
  name,
  population,
  capital,
  currencies,
  nativeName,
  region,
  subregion,
  topLevelDomain,
  languages,
  borders,
}) => {
  return (
    <div className="countrydetail">
      <div className="countrydetail__container">
        <div className="countrydetail__container__left">
          <img src={flags.png} alt={name} />
        </div>
        <div className="countrydetail__container__right">
          <div className="countrydetail__container__right__container">
            <h1 className="countrydetail__title">{name}</h1>
            <div className="countrydetail__container__right__container__item1">
              <p>
                Native Name: <span className="detail-value">{nativeName}</span>{" "}
              </p>
              <p>
                Population: <span className="detail-value">{population}</span>{" "}
              </p>
              <p>
                Region: <span className="detail-value">{region}</span>{" "}
              </p>
              <p>
                Sub Region: <span className="detail-value">{subregion}</span>{" "}
              </p>
              <p>
                Capital: <span className="detail-value">{capital}</span>{" "}
              </p>
            </div>
            <div className="countrydetail__container__right__container__item2">
              <p>
                Top Level Domain:{" "}
                <span className="detail-value">{topLevelDomain}</span>{" "}
              </p>
              <p>
                Currencies:{" "}
                <span className="detail-value">
                  {currencies && Object.keys(currencies)}
                </span>{" "}
              </p>
              <p>
                Languages:{" "}
                {languages && (
                  <span className="detail-language-value">
                    {Object.values(languages)}
                  </span>
                )}
              </p>
            </div>
            <div className="countrydetail__container__right__container__item3">
              <p>
                Border Countries:{" "}
                {Array.isArray(borders) &&
                  borders?.map((country) => (
                    <span key={country} className="bordercountry">
                      {country}
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
