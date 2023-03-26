import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import {Header} from "./Components/Header";
import {Weather} from "./Components/Weather";
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import {AppStateType} from "./Components/store/store";
import {useSelector} from "react-redux";
import {Preloader} from "./Components/Preloader";

function App() {

    const currentWeather = useSelector((state: AppStateType) => state.forecast.currentWeather)
    const fetching = useSelector((state: AppStateType) => state.forecast.fetching)

    const [vantaEffect, setVantaEffect] = useState<any>(null)

    const bg = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(vantaEffect && Number(currentWeather?.data.time.toString().slice(11).split(':')[0]) >= 18){
            setVantaEffect(CLOUDS({
                el: bg.current,
                speed: 1.40,
                skyColor: 0x0,
                cloudColor: 0x2c2c42,
                cloudShadowColor: 0x6b7781,
                sunColor: 0x2a4fe0,
                sunGlareColor: 0x727272,
                sunlightColor: 0x89847f
            }))
        }
    },[currentWeather])

    useEffect(() => {
        if(!vantaEffect) setVantaEffect(CLOUDS({
            el: bg.current,
            speed: 1.40,
        }))
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [])




    return (
        <div className="wrapper" ref={wrapper}>
            {fetching && <Preloader />}
            <div className="bg" ref={bg}></div>
            <Header/>
            <Weather/>
        </div>
    );
}

export default App;
