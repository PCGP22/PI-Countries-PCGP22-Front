import { ADD_COUNTRIES, ID_SEARCH, NAME_SEARCH, FILTER, ACTIVITY_CREATE, ORDER, ADD_ACTIVITIES, REMOVE_ACTIVITY, UPDATE_ACTIVITY, ID_ACTIVITY_SEARCH } from "./actions.js"

const initialState = {
    allCountries: [], 
    allActivities: [],
    countriesFiltered: [], 
    foundCountries:[],
    currentCountry: [],
    currentActivity: [],
    errorMessage: "",
}

export const reducer = (state=initialState,action) =>{  
    switch(action.type){
        case ADD_COUNTRIES:
            if(state.allCountries.length > 10){return{state}}
            return{
                ...state,
                allCountries: action.payload,
                countriesFiltered: action.payload,
            }
        case ADD_ACTIVITIES:
            return{
                ...state,
                allActivities: action.payload
            }
        case ID_SEARCH:
            return{
                ...state,
                currentCountry: action.payload
            }
        case NAME_SEARCH:
            if(!Array.isArray(action.payload)){return{...state,foundCountries:[], errorMessage: action.payload.response.data}}
            else {
                return{
                    ...state,
                    foundCountries: state.allCountries.filter(c=> action.payload.find(f=>f.name === c.name)),
                    errorMessage: ""
                };
            }
        case FILTER:
            if(action.payload[1] === "All"){
                return{
                    ...state,
                    countriesFiltered: state.allCountries
                }
            }
            if(action.payload[0] === "continents"){
                return{
                    ...state,
                    countriesFiltered: state.allCountries.filter(c=>c.continent === action.payload[1]),
                }
            }
            else if( action.payload[0] === "activities"){
                let temp = state.allActivities.filter(a=>a.name === action.payload[1])
                let toSearch = temp[0].countryId
                return{
                    ...state,
                    countriesFiltered: state.allCountries.filter(c => toSearch.includes(c.id) ),
                }
            }
        case ORDER:
            if(action.payload[0]==="alphabet"){
                if(action.payload[1]==="A"){
                    return{
                        ...state,
                        countriesFiltered: state.countriesFiltered.sort((a, b) => {
                            if (a.name < b.name) {
                              return -1;
                            }
                            if (a.name > b.name) {
                              return 1;
                            }
                            return 0;
                          })
                     
                    }
                }
                else if(action.payload[1]==="D"){
                    return{
                        ...state,
                        countriesFiltered: state.countriesFiltered.sort((a, b) => {
                            if (a.name > b.name) {
                              return -1;
                            }
                            if (a.name < b.name) {
                              return 1;
                            }
                            return 0;
                          })
                    }
                }
            }
            else if(action.payload[0]==="population"){
                if(action.payload[1]==="A"){
                    return{
                        ...state,
                        countriesFiltered: state.countriesFiltered.sort((a,b)=> {
                            if (a.population < b.population) {
                              return -1;
                            }
                            if (a.population > b.population) {
                              return 1;
                            }
                            return 0;
                          }) 
                    }
                }
                else if(action.payload[1]==="D"){
                    return{
                        ...state,
                        countriesFiltered: state.countriesFiltered.sort((a, b) => {
                            if (a.population > b.population) {
                              return -1;
                            }
                            if (a.population < b.population) {
                              return 1;
                            }
                            return 0;
                          }) 
                    }
                }
            }
        case ACTIVITY_CREATE:
            return{
                ...state,
                allActivities: action.payload
            }
        case REMOVE_ACTIVITY:
            return{
                ...state,
                allActivities: action.payload
            }
        case UPDATE_ACTIVITY:
            return{
                ...state,
                allActivities: action.payload
            }
        case ID_ACTIVITY_SEARCH:
            return{
                ...state,
                currentActivity: action.payload
            }
        default: return state;
    }
}