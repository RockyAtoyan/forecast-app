import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store/store";
import {AnyAction} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {
    setCurrentLocation,
    setCurrentLocationAC,
    setCurrentWeather,
    setForecast,
    setForecastAC
} from "./store/forecastReducer";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {CurrentForecast} from "./CurrentForecast";
import { Forecast } from "./Forecast";
import {Preloader} from "./Preloader";

export const getPosition = (callback:(...args:any) => any) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude ,longitude} = position.coords
            callback(latitude ,longitude)
        },positionError => {
            console.log(positionError.message)
        });
    } else {
        console.log('Geolocation is not supported by this browser.')
    }
}


export const Weather = React.memo(() => {
    const dispatch:ThunkDispatch<AppStateType, any, AnyAction> = useDispatch()
    const currentLocation = useSelector((state:AppStateType) => state.forecast.currentLocation)
    const currentError = useSelector((state:AppStateType) => state.forecast.currentError)
    const forecastFetching = useSelector((state: AppStateType) => state.forecast.forecastFetching)

    const [forecastLocation,setForecastLocation] = useState<any>('')

    useLayoutEffect(() => {
        getPosition((latitude,longitude) => {
            dispatch(setCurrentLocation(latitude,longitude))
            dispatch(setCurrentWeather(`${latitude}, ${longitude}`))
        })
        const timer = setInterval(() => {
            getPosition((latitude,longitude) => {
                dispatch(setCurrentLocation(latitude,longitude))
                dispatch(setCurrentWeather(`${latitude}, ${longitude}`))
            })
        },300000)
        return () => {
            clearInterval(timer)
        }
    },[])


    useLayoutEffect(() => {
        setForecastLocation(currentLocation ? currentLocation?.local_names.ru : '' )
    },[currentLocation])

    return <main className={'main'}>
            {forecastFetching && <Preloader />}
            {currentError ? <h2>{currentError}</h2> : <>
                <CurrentForecast />
                <input type="text" value={forecastLocation} onChange={(event) => {
                    setForecastLocation(event.currentTarget.value)
                }} />
                <button onClick={() => {
                    if(forecastLocation) dispatch(setForecast(forecastLocation))
                    else  dispatch(setForecastAC([],''))
                }}>
                    <span>Прогноз на 5 дней</span>
                </button>
                <Forecast />
            </>
            }
    </main>
})