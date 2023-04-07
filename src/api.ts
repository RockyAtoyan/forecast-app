import axios from "axios";

const instance = axios.create({
    baseURL:'https://api.tomorrow.io/v4/weather/'
})

export type HourlyForecastItem = {
    time:number
    values:{
        cloudBase:number
        cloudCeiling:number
        cloudCover:number
        dewPoint:number
        evapotranspiration:number
        freezingRainIntensity:number
        humidity:number
        precipitationProbability:number
        pressureSurfaceLevel:number
        rainAccumulation:number
        rainIntensity:number
        sleetAccumulation:number
        sleetIntensity:number
        snowIntensity:number
        temperature:number
        temperatureApparent:number
        visibility:number
        weatherCode:number
        windDirection:number
        windGust:number
        windSpeed:number
    }
}
export type CurrentWeather = {
    data:HourlyForecastItem
    location:{
        lat:number
        lon:number
        name:string
        type:string
    }
}
type GetForecastResponce = {
    timelines:{
        hourly:HourlyForecastItem[]
    }
    location:{
        lat:number
        lon:number
        name:string
        type:string
    }
}

export const forecastAPI = {
    getForecast(location:string){
        return instance.get<GetForecastResponce>(`forecast?location=${location}&timesteps=hourly&apikey=IcattJKgiuf0g3ueQp9Cx0NLVZWk2tIE`).then(data => {
            return data.data
        })
    },
    getCurrentWeather(location:string){
        return instance.get<CurrentWeather>(`realtime?location=${location}&apikey=IcattJKgiuf0g3ueQp9Cx0NLVZWk2tIE`).then(data => {
            return data.data
        })
    },
    getLocation(lat:string | number,lon:string | number){
        return axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=c34ca9a3d45a71ed2223cb045ab680fb`).then(data => {
            return data.data[0]
        })
    },
    getCityLocation(city:string | undefined){
        debugger
        return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=c34ca9a3d45a71ed2223cb045ab680fb`).then(data => {
            return data.data[0]
        })
    },
}