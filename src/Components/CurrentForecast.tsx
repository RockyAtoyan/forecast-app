import {useSelector} from "react-redux";
import {AppStateType} from "./store/store";


export const CurrentForecast = () => {

    const currentWeather = useSelector((state:AppStateType) => state.forecast.currentWeather)
    const currentLocation = useSelector((state:AppStateType) => state.forecast.currentLocation)
    const fetching = useSelector((state:AppStateType) => state.forecast.fetching)

    return <div className={'current_forecast'}>
        {!fetching && <>
            <h2>{currentLocation?.local_names.ru}</h2>
            <h3>{currentWeather?.data.values.temperature}°C</h3>
            <h4>{currentWeather?.data.values.cloudCover && (currentWeather?.data.values.cloudCover < 20 ? 'Безоблачно' : (currentWeather?.data.values.cloudCover < 50 ? 'Небольшая облачность' : 'Облачно')) }</h4>
            <div className="current_forecast__info">
                <h3>
                    <span>Видимость</span>
                    <span>{currentWeather?.data.values.visibility} км</span>
                </h3>
                <h3>
                    <span>Скорость ветра</span>
                    <span>{currentWeather?.data.values.windSpeed} м/с</span>
                </h3>
                {!!currentWeather?.data.values.rainIntensity && <h3>Идет дождь</h3>}
                {!!currentWeather?.data.values.snowIntensity && <h3>Идет снег</h3>}
            </div>
        </>}
    </div>
}