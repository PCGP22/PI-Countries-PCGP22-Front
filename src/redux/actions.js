export const ADD_COUNTRIES = "ADD_COUNTRIES"
export const ID_SEARCH = "ID_SEARCH"
export const NAME_SEARCH = "NAME_SEARCH"
export const FILTER = "FILTER"
export const ORDER = "ORDER"
export const ACTIVITY_CREATE = "ACTIVITY_CREATE"
export const ADD_ACTIVITIES = "ADD_ACTIVITIES"
export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY"
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY"
export const ID_ACTIVITY_SEARCH = "ID_ACTIVITY_SEARCH"
import axios from "axios"
    
const URL = "https://pi-countries-pcgp22-back-production.up.railway.app/"

export const addCountries = () => {
    const endpoint = URL + 'countries/allCountries'
    return async (dispatch) => {
        try{
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: ADD_COUNTRIES,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: ADD_COUNTRIES,
                payload: error
            })
        }
}}

export const addActivities = () => {
    const endpoint = URL + 'countries/activities'
    return async (dispatch) =>{
        try{
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: ADD_ACTIVITIES,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: ADD_ACTIVITIES,
                payload: error
            })
        }
    }
}

export const idSearch = (idCountry) => {
    const endpoint = URL + `countries/countries/${idCountry}`
    return async (dispatch) => {
    try{
        const {data} = await axios(endpoint)
        if(typeof data === "error"){console.log("error")}
        return dispatch({
            type: ID_SEARCH,
            payload: data[0]
        })
    }
    catch(error){
        return dispatch({
            type: ID_SEARCH,
            payload: error
        })
    }
}
}

export const nameSearch = (name) => {
    const endpoint = URL + `countries/countries/search?name=${name}`
    return async (dispatch) => {
        try{
            const {data} = await axios(endpoint)
            return dispatch({
                type: NAME_SEARCH,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: NAME_SEARCH,
                payload: error
            })
        }
    }
}

export const filter = (filterdata) => {return {
    type: FILTER,
    payload: filterdata
}}

export const order = (orderdata) => {return{
    type: ORDER,
    payload: orderdata
}}

export const activityCreate = (activity) => {
    const endpoint = URL + 'countries/activities'
    return async (dispatch) => {
        try{
            const {data} = await axios.post(endpoint,activity);
            return dispatch({
                type: ACTIVITY_CREATE,
                payload: data
            })
        }
        catch(error){
            console.log(error)
            return dispatch({
                type: ACTIVITY_CREATE,
                payload: error
            })
        }
    } 
}

export const removeActivity = (id) => {
    const endpoint = URL + `countries/activities/${id}`
    return async (dispatch) => {
        try{
            const {data} = await axios.delete(endpoint);
            return dispatch({
                type: REMOVE_ACTIVITY,
                payload: data
            })
        }
        catch(error){
            console.log(error)
            return dispatch({
                type: REMOVE_ACTIVITY,
                payload: error
            })
        }
    } 
}

export const updateActivity = (id,info) => {
    const endpoint = URL + `countries/activities/${id}`
    return async (dispatch) => {
        try{
            const {data} = await axios.put(endpoint,info);
            return dispatch({
                type: UPDATE_ACTIVITY,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: UPDATE_ACTIVITY,
                payload: error
            })
        }
    } 
}

export const idActivitySearch = (idActivity) => {
    const endpoint = URL + `countries/activities/${idActivity}`
    return async (dispatch) => {
    try{
        const {data} = await axios(endpoint)
        if(typeof data === "error"){console.log("error")}
        return dispatch({
            type: ID_ACTIVITY_SEARCH,
            payload: data[0]
        })
    }
    catch(error){
        return dispatch({
            type: ID_ACTIVITY_SEARCH,
            payload: error
        })
    }
}
}
