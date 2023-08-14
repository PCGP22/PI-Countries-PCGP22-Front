import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  activityCreate,
  idActivitySearch,
  updateActivity,
} from "../redux/actions";
import { useLocation } from "react-router-dom";
import { validar } from "../common/Functions.js";

let countryList = [];

function Form(props) {
  const [countryBox, setCountryBox] = useState([]);
  const [form, setForm] = useState(props.initialState);
  const [errores, setErrores] = useState({});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { pathname } = useLocation();

  useEffect(() => {
    setForm({ ...form, countryId: countryList });
  }, [countryBox]);

  useEffect(() => {
    if (pathname.toString() === `/countries/activities/${props.idActivity}`) {
      props.idActivitySearch(props.idActivity);
      if (props.initialState && props.initialState.countryId) {
        handleReset();
      }
    }
  }, [props.idActivity, props.aux]);

  let initialCountries;
  const ratings = [1, 2, 3, 4, 5];
  const countries = props.allCountries.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const handleReset = () => {
    setForm(props.initialState);
    setErrores({})
    if (pathname.toString() !== "/countries/activities/") {
      setRating(props.initialState.difficulty);
      setHover(props.initialState.difficulty);
      countryList = props.initialState.countryId;
      parseCountryList();
    } else {
      setCountryBox([]);
      setRating(0);
      setHover(0);
      countryList = [];
    }
  };
  
  const handleSubmit = (e) => {
      e.preventDefault();
      let erroresLength = Object.keys(errores).length;
      if (!erroresLength) {
        if (pathname.toString() !== "/countries/activities/") {
            props.updateActivity(props.idActivity, form);
        } else {
            props.activityCreate(form);
        }
      handleReset();
      e.target.reset();
    } else {
        let errorLog = [];
        for (let error in errores) {
            errorLog.push(errores[error]);
        }
        alert(errorLog.join("\nand\n"));
    }
};

const handleChange = (e) => {
    if (e.target.value !== "ignore") {
      if (e.target.name === "imageURL") {
        setForm({ ...form, imageURL: e.target.value });
        setErrores(validar({ ...form, imageURL: e.target.value }));
        return;
      }
      setForm({ ...form, [e.target.name]: e.target.value });
      setErrores(validar({ ...form, [e.target.name]: e.target.value }));
    }
  };

const parseCountryList = () => {
  initialCountries = [];
  setCountryBox([]);
  props.initialState.countryId.map(async (c) => {
    let key = c;
    let countryToAdd = props.allCountries.filter((c) => c.id === key)[0];
    initialCountries.push({ id: key, name: countryToAdd.name });
  });
  setCountryBox(initialCountries);
};

const handleCountryChange = (e) => {
    let [id, name] = e.target.value.split(",");
    if (!countryList.find((c) => c === id)) {
      setCountryBox([...countryBox, { id, name }]);
      countryList.push(id);
      setErrores(validar({ ...form, countryId: countryList }));
    }
  };

  const handleClose = (e) => {
    let [name, id] = e.target.value.toString().split(",");
    setCountryBox(countryBox.filter((c) => c.name !== name));
    countryList = countryList.filter((c) => c !== id);
    setErrores(validar({ ...form, countryId: countryList }));
  };

  const handleImgError = () => {
    setForm({ ...form, imageURL: "error" });
    setErrores(validar({ ...form, imageURL: "error" }));
  };

  const handleURLErase = () => {
    setForm({ ...form, imageURL: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="activityPage__form">
      <fieldset className="activityPage__formSection">
        <p>
          *<small> Indicates a required field</small>
        </p>
        <label htmlFor="name">*Name of the new activity:</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Name of the activity"
          value={form.name}
        />
        {errores.name ? (
          <p className="form--error no-space">{errores.name}</p>
        ) : (
          ""
        )}
      </fieldset>
      <fieldset className="activityPage__formSection">
        <label htmlFor="difficulty">*Difficulty:</label>
        <div className="filter__starContainer">
          {ratings.map((i) => {
            return (
              <button
                type="button"
                name="difficulty"
                className={i <= (hover || rating) ? "on star" : "off star"}
                key={i}
                index={i}
                onClick={() => {
                  setRating(i);
                  setForm({ ...form, difficulty: i });
                  setErrores(validar({ ...form, difficulty: i }));
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(rating)}
              >
                ★
              </button>
            );
          })}
        </div>
      </fieldset>
      <fieldset className="activityPage__formSection">
        <label htmlFor="duration">*Approximate duration:</label>
        <br />
        <input
          type="number"
          onChange={handleChange}
          name="duration"
          placeholder="0"
          className="activityPage__numInput"
          value={form.duration}
          min="1"
          max="10"
          step="1"
        />
        <span>Hours</span>
        {errores.duration ? (
          <p className="form--error no-space">{errores.duration}</p>
        ) : (
          ""
        )}
      </fieldset>
      <fieldset className="activityPage__formSection">
        <label htmlFor="season">*Season:</label>
        <br />
        <select onChange={handleChange} value={form.season} name="season">
          <option value="ignore" defaultValue={true}>
            Season:
          </option>
          <option value="Primavera">Spring</option>
          <option value="Verano">Summer</option>
          <option value="Otoño">Fall</option>
          <option value="Invierno">Winter</option>
        </select>
        {errores.season ? (
          <p className="form--error no-space">{errores.season}</p>
        ) : (
          ""
        )}
      </fieldset>
      <fieldset className="activityPage__formSection">
        <label htmlFor="countryId">
          *Country/Countries where it take place:
        </label>
        <br />
        <select onChange={handleCountryChange} name="countryId">
          <option defaultValue={true}>---Country:---</option>
          {countries.map((c) => {
            return (
              <option key={c.name} value={[c.id, c.name]}>
                {c.name}
              </option>
            );
          })}
        </select>
        <div className="activityPage__countryBox">
          {countryBox.length > 0 ? (
            countryBox.map((c) => (
              <div key={c.name} className="activityPage__countryList">
                <span>{c.name}</span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="activityPage__closeButton"
                  value={[c.name, c.id]}
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <div className="activityPage__countryList"> Add a country</div>
          )}
        </div>
      </fieldset>
      <fieldset className="activityPage__formSection">
        <label htmlFor="imageURL">Paste an image URL:</label>
        <br />
        <input
          type="text"
          name="imageURL"
          onChange={handleChange}
          placeholder="Image URL"
          value={form.imageURL}
        />
        <button type="button" onClick={handleURLErase} className="activityPage__deleteButton">
          Delete
        </button>
        {form.imageURL && (
          <>
            <br />
            <img
              src={`${form.imageURL}`}
              onError={handleImgError}
              width={200}
            />
            <br />
          </>
        )}
        {errores.imageURL ? (
          <p className="form--error no-space">{errores.imageURL}</p>
        ) : (
          ""
        )}
      </fieldset>
      <fieldset className="activityPage__formSection">
        <label htmlFor="description">Activity description:</label>
        <br />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Max 200 characters"
          value={form.description}
          className="activityPage__textArea"
        />
        {errores.description ? (
          <p className="form--error no-space">{errores.description}</p>
        ) : (
          ""
        )}
      </fieldset>
      <div className="activityPage__formButtons">
        <button
          onClick={handleReset}
          type="reset"
          className="activityPage__button"
        >
          Reset
        </button>
        <button type="submit" className="activityPage__button submitButton">
          Save
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    allActivities: state.allActivities,
    allCountries: state.allCountries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activityCreate: (activity) => {
      dispatch(activityCreate(activity));
    },
    idActivitySearch: (idActivity) => {
      dispatch(idActivitySearch(idActivity));
    },
    updateActivity: (idActivity, activity) => {
      dispatch(updateActivity(idActivity, activity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
