import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import {Header} from "./Components/Header";
import {Weather} from "./Components/Weather";
import {AppStateType} from "./Components/store/store";
import {useSelector} from "react-redux";
import {Preloader} from "./Components/Preloader";
import CLOUDS from 'vanta/dist/vanta.clouds.min'

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
                skyColor: 0x0,
                cloudColor: 0x44446f,
                cloudShadowColor: 0x413e93,
                sunColor: 0x0,
                sunGlareColor: 0x0,
                sunlightColor: 0x0
            }))
            wrapper.current?.classList.add('dark')
        } else {
            wrapper.current?.classList.remove('dark')
        }
    },[currentWeather])

    useEffect(() => {
        if(!vantaEffect) setVantaEffect(CLOUDS({
            el: bg.current,
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
