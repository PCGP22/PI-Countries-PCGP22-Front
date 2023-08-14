import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { idSearch } from "../redux/actions";
import ActivityContainer from "./ActivityContainer";
import logo from "../countries.png";
import "../styles/Detail.modules.css";

import { useLocation } from "react-router-dom";

function Detail(props) {
  const { pathname } = useLocation();

  const { idCountry } = useParams();

  useEffect(() => {
    fetch(idCountry);
  }, [idCountry, props.currentCountry]);

  async function fetch(id) {
    await props.idSearch(id);
  }

  const {
    id,
    name,
    offName,
    image,
    continent,
    capitalCity,
    subregion,
    area,
    population,
    Activities,
  } = props.currentCountry;

  return (
    <div className="detail__container">
      <main className="detail__main">
        <h1>Country info</h1>
        <section className="detail__info">
          {props.currentCountry && (
            <>
              <h3 className="detail__countryName">{name ? `${name} (${id})` : "N/A"}</h3>
              <img
                src={image ? image : logo}
                alt={`bandera de ${name}`}
                className="detail__img"
              />
              <p>
                <strong>Official name:</strong> {offName ? offName : "N/A"}
              </p>
              <p>
                <strong>Capital city:</strong>{" "}
                {capitalCity ? capitalCity : "N/A"}
              </p>
              <p>
                <strong>Continent:</strong> {continent ? continent : "N/A"}
              </p>
              <p>
                <strong>Subregion:</strong> {subregion ? subregion : "N/A"}
              </p>
              <p>
                <strong>Area:</strong> {area ? `${area.toLocaleString()} kms2` : "N/A"}
              </p>
              <p>
               <strong>Population:</strong> {population ? `${population.toLocaleString()} habitants` : "N/A"}
              </p>
            </>
          )}
        </section>
      </main>
      <aside className="detail__aside">
        <h2>Activities of the country:</h2>
        <ActivityContainer source={Activities} />
      </aside>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentCountry: state.currentCountry,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    idSearch: (id) => {
      dispatch(idSearch(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
