import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { removeActivity } from "../redux/actions";
import { useState } from "react";
import "../styles/ActivityContainer.modules.css"

function ActivityContainer(props) {
  const [aux, setAux] = useState(true);

  const { pathname } = useLocation();
  const { idActivity } = useParams();

  const Activities = props.source;

  const handleDeleteActivity = (e) => {
    props.removeActivity(e.target.value);
    setAux(!aux);
  };

  return (
    <section className="activityContainer">
      {pathname.startsWith("/countries/countries/") && (
        <Link to={"/countries/activities/"} className="activityLink">
          Add activities
        </Link>
      )}
      {Activities &&
        Activities.length !== 0 &&
        Activities.map((a) => {
          let ratingActivity = "★".repeat(a.difficulty).split("");
          return (
            <div className="activityBox" key={a.id}>
              {(pathname.toString() === "/countries/activities/" ||
                pathname.startsWith("/countries/countries/")) && (
                <>
                  <Link
                    className="activityBox__editButton"
                    to={`/countries/activities/${a.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={handleDeleteActivity}
                    className="activityBox__closeButton"
                    value={a.id}
                  >
                    X
                  </button>
                </>
              )}
              {pathname.toString() === `/countries/activities/${idActivity}` &&
                props.currentActivity.id !== a.id && (
                  <>
                    <Link
                      className="activityBox__editButton"
                      to={`/countries/activities/${a.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={handleDeleteActivity}
                      className="activityBox__closeButton"
                      value={a.id}
                    >
                      X
                    </button>
                  </>
                )}
              <p>
                <strong>Name:</strong> {a.name}
              </p>
              {a.imageURL && (
                <>
                  <img
                    src={a.imageURL}
                    alt={`Image for the activity ${a.name}`}
                  />
                  <br />
                </>
              )}
              {ratingActivity.map((r) => (
                <span key={Math.random()} className="on star_mini">
                  {r}
                </span>
              ))}
              <p>Duration: {a.duration} Hrs.</p>
              <p>Season: {a.season}</p>
              <p>Countries: {a.countryId ? a.countryId.join(", ") : "N/A"}</p>
              <p>
                Description:{" "}
                {a.description
                  ? a.description.charAt(0).toUpperCase() +
                    a.description.slice(1)
                  : "N/A"}
              </p>
            </div>
          );
        })}
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    currentActivity: state.currentActivity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeActivity: (id) => {
      dispatch(removeActivity(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer);
