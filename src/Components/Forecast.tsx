import {useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {HourlyForecastItem} from "../api";
import React, {useState} from "react";
import {CurrentForecastItem, ForecastItem} from "./store/ForecastItem";


export const Forecast = React.memo(() => {

    const forecast = useSelector((state: AppStateType) => state.forecast.forecastItems)

    const forecastItems = forecast && Array.from(new Set(forecast.map(item => item.time.toString().slice(0, 10)))).map(time => {
        const hours: HourlyForecastItem[] = []
        forecast.forEach(item => {
            if (item.time.toString().slice(0, 10) === time) {
                hours.push(item)
            }
        })
        return {time, hours}
    }).map((item,index)=> {
        if(index === 0) return <CurrentForecastItem key={index} item={item} />
        return <ForecastItem key={index} item={item} />
    })

    return <>
        {forecastItems && forecastItems.length !== 0 && <>
            <div className={'forecast_today'}>
                {forecastItems[0]}
            </div>
            <div className={'forecast'}>
                {forecastItems.slice(1)}
            </div>
        </>
        }
    </>
})