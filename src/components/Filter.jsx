import { connect } from "react-redux";
import { filter, order } from "../redux/actions";
import "../styles/Filter.modules.css";

function Filter(props) {
  const activities = props.allActivities;

  const continents = [
    "All",
    "Africa",
    "North America",
    "South America",
    "Antarctica",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const handleOrder = (e) => {
    const [category, filter] = e.target.value.split(",");
    if (typeof filter === "string") {
      props.aux();
      props.order([category, filter]);
    }
  };

  const handleFilterContinents = (e) => {
    if (e.target.value !== "ignore") {
      props.aux();
      props.filter(["continents", e.target.value]);
    }
  };

  const handleFilterActivities = (e) => {
    if (e.target.value !== "ignore") {
      props.aux();
      props.filter(["activities", e.target.value]);
    }
  };

  return (
    <section className="filters__container purple white-text">
      <div className="filters__group">
        <label htmlFor="orden" className="label">
          Order:
        </label>
        <select onChange={handleOrder} name="orden">
          <option defaultValue={true}>Order:</option>
          <optgroup label="Alphabetic">
            <option value={["alphabet", "A"]}>{"A - Z"}</option>
            <option value={["alphabet", "D"]}>{"Z - A"}</option>
          </optgroup>
          <optgroup label="Population">
            <option value={["population", "D"]}>Largest to smallest</option>
            <option value={["population", "A"]}>Smallest to largest</option>
          </optgroup>
        </select>
      </div>
      <div className="filters__group">
        <label htmlFor="filterContinent" className="label">
          Filter:
        </label>
        <select onChange={handleFilterContinents} name="filterContinent">
          <option defaultValue={true} value="ignore">
            Continent:
          </option>
          {continents.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="filters__group">
        <label htmlFor="filterActivity" className="label">
          Filter:
        </label>
        <select onChange={handleFilterActivities} name="filterActivity">
          <option defaultValue={true} value="ignore">
            Activity:
          </option>
          <option value={"All"}>All</option>
          {activities.length !== 0 &&
            activities.map((a) => {
              return (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              );
            })}
        </select>
      </div>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    filter: (filterCategory) => {
      dispatch(filter(filterCategory));
    },
    order: (orderCategorry) => {
      dispatch(order(orderCategorry));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    allActivities: state.allActivities,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
