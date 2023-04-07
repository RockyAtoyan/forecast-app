import {FC, useState} from "react";
import {HourlyForecastItem} from "../../api";
import CloseIcon from '@mui/icons-material/Close';

export const ForecastItem: FC<{ item: { time: string, hours: HourlyForecastItem[] } }> = ({item}) => {

    const [watchMode, setWatchMode] = useState(false)

    const [maxTemp, minTemp] = [Math.max(...item.hours.map(hour => Number(hour.values.temperature))), Math.min(...item.hours.map(hour => Number(hour.values.temperature)))]

    return <div className={'forecast_item'}>
        <h2>{item.time.split('-').reverse().join('.')}</h2>
        <h3>
            <span>{minTemp}°C</span>
            <span>{maxTemp}°C</span>
        </h3>
        <button onClick={() => setWatchMode(prevState => !prevState)}>
            <span>{watchMode ? 'Hide' : 'Show'} hourly forecast</span>
        </button>
        {watchMode && item.hours && <div className={'forecast_item__hours'} onClick={(event) => {
            const el = event.target as HTMLButtonElement
            if(el.classList[0] === 'forecast_item__hours') setWatchMode(prevState => false)
        }}>
            <div>
                {item.hours.map((hour, index) => {
                    return <div key={index}>
                        <h5>
                            <span>{hour.time.toString().slice(11, 13)}:00</span>
                            <span>{hour.values.temperature}°C</span>
                        </h5>
                    </div>
                })}
                <button onClick={() => {
                    setWatchMode(prevState => !prevState)
                }}>
                    <CloseIcon />
                </button>
            </div>
            </div>
        }
    </div>
}

export const CurrentForecastItem: FC<{ item: { time: string, hours: HourlyForecastItem[] } }> = ({item}) => {

    //const [watchMode,setWatchMode] = useState(true)

    return <div className={'current_forecast__item'}>
        {/*<h2>{item.time.split('-').reverse().join('.')}</h2>*/}
        <h3>Today</h3>
        <div className="current_forecast__item__hours">
            {item.hours && item.hours.map((hour, index) => {
                return <div key={index}>
                    <h5>
                        <span>{hour.time.toString().slice(11, 13)}:00</span>
                        <span>{hour.values.temperature}°C</span>
                    </h5>
                </div>
            })}
        </div>
    </div>
}