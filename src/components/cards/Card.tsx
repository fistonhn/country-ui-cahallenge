import { CardType } from "../../types/interface";
import deleteIcon from "../../icons/delete.svg";
import checkIcon from "../../icons/check.svg";
import "./Card.css";
import { Link } from "react-router-dom";

// write card typescript react components to display card data and make all card a link to the card detail page

const Card: React.FC<CardType> = ({
  userId,
  cardId,
  flags,
  name,
  population,
  capital,
  currencies,
  link,
  handleDeleteFunction,
  handleVisitedFunction,
  isVisited,
}) => {
  return (
    <>
      <div className="card-container">
        <div className="card">
          <Link to={`/details/${link}`}>
            <div className="card-image">
              <img src={flags.png} alt={name} />
            </div>
          </Link>
          <Link to={`/details/${link}`}>
            <div className="card-content">
              <h3>{name}</h3>
              <p>Population: {population}</p>
              <p>Capital: {capital}</p>
              <p>Currency: {currencies && Object.keys(currencies)}</p>
            </div>
          </Link>
          <div className="card-action">
            {/* delete button and v button */}
            <button
              className="delete-btn btn"
              onClick={() => handleDeleteFunction(userId, cardId)}
            >
              <img
                src={deleteIcon}
                alt="delete svg icon"
                style={{ width: "15.5px", height: "20.24px" }}
              />
            </button>
            <button
              className={`check-btn btn ${isVisited ? "visited" : ""}`}
              onClick={() => handleVisitedFunction(userId, cardId)}
            >
              <img
                src={checkIcon}
                alt="check svg icon"
                style={{ width: "16.67px", height: "11.33px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
