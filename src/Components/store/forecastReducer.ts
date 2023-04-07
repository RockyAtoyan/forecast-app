import {CurrentWeather, forecastAPI, HourlyForecastItem} from "../../api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const InitState = {
    forecastItems:[] as HourlyForecastItem[],
    location:'' as string,
    fetching:true,
    forecastFetching:false,
    currentWeather:null as null | CurrentWeather,
    currentLocation:null as null | CurrentWeather,
    currentError:null as string | null
}

export const forecastReducer = (state = InitState,action:ActionsType) => {
    if(action.type === "set-fetching"){
        return {...state,fetching: action.fetching}
    } else if(action.type === "set-forecast"){
        return {...state,forecastItems: action.forecast,location: action.location}
    } else if(action.type === "set-current-weather"){
        return {...state,currentWeather: action.weather}
    } else if(action.type === "set-current-location"){
        return {...state,currentLocation: action.location}
    } else if(action.type === "set-error"){
        return {...state,currentError: action.error}
    } else if(action.type === "set-forecast-fetching") {
        return {...state, forecastFetching: action.fetching}
    }
    return {...state}
}

type ActionsType =
    SetFetchingType |
    SetForecastType |
    SetCurrentWeatherType |
    SetCurrentLocationType |
    SetErrorType |
    SetForecastFetchingType

type SetFetchingType = {
    type:'set-fetching'
    fetching:boolean
}
export const setFetchingAC = (fetching:boolean):SetFetchingType => ({type:"set-fetching",fetching})

type SetForecastFetchingType = {
    type:'set-forecast-fetching'
    fetching:boolean
}
export const setForecastFetchingAC = (fetching:boolean):SetForecastFetchingType => ({type:"set-forecast-fetching",fetching})

type SetForecastType = {
    type:'set-forecast'
    forecast:HourlyForecastItem[]
    location:string
}
export const setForecastAC = (forecast:HourlyForecastItem[],location:string):SetForecastType => ({type:"set-forecast",forecast,location})

type SetCurrentWeatherType = {
    type:'set-current-weather'
    weather: CurrentWeather
}
export const setCurrentWeatherAC = (weather:CurrentWeather):SetCurrentWeatherType => ({type:"set-current-weather",weather})

type SetCurrentLocationType = {
    type:'set-current-location'
    location: any
}
export const setCurrentLocationAC = (location:CurrentWeather):SetCurrentLocationType => ({type:"set-current-location",location})

type SetErrorType = {
    type:'set-error'
    error:string | null
}
export const setErrorAC = (error:string | null):SetErrorType => ({type:"set-error",error})

type ThunkType = ThunkAction<Promise<void> | void, AppStateType, any, ActionsType>

export const setForecast = (location:string):ThunkType => dispatch => {
    dispatch(setForecastFetchingAC(true))
    return forecastAPI.getCityLocation(location).then(locationData => {
        //debugger
        return  forecastAPI.getForecast(`${locationData.lat}, ${locationData.lon}`).then(data => {
            const [forecastItems,location] = [data.timelines.hourly,data.location.name]
            dispatch(setForecastAC(forecastItems,location))
            dispatch(setErrorAC(null))
        }).catch(err => {
            setError(err,dispatch)
        }).finally(() => {
            dispatch(setForecastFetchingAC(false))
        })
    })

}

export const setCurrentWeather = (location:string):ThunkType => dispatch => {
    dispatch(setFetchingAC(true))
    return forecastAPI.getCurrentWeather(location).then(data => {
        dispatch(setCurrentWeatherAC(data))
        dispatch(setErrorAC(null))
    }).catch(err => {
        setError(err,dispatch)
    }).finally(() => {
        dispatch(setFetchingAC(false))
    })
}

export const setCurrentLocation = (lat:string | number,lon:string | number):ThunkType => dispatch => {
    dispatch(setFetchingAC(true))
    return forecastAPI.getLocation(lat,lon).then(data => {
        dispatch(setCurrentLocationAC(data))
        dispatch(setErrorAC(null))
    }).catch(err => {
        setError(err,dispatch)
    })
}


/////////////////////////////////////
export const setError = (err:any,dispatch:(...args:any) => any) => {
    if({...err}.response?.status === 429){
        dispatch(setErrorAC('Сервис перегружен. Подождите немного.'))
    }
    else {
        dispatch(setErrorAC('Сервис временно недоступен.'))
    }
}

