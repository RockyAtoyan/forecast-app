import {applyMiddleware, combineReducers, createStore} from "redux";
import {forecastReducer} from "./forecastReducer";
import thunk from "redux-thunk";


const RootReducer = combineReducers({
    forecast:forecastReducer
})

export type AppStateType = ReturnType<typeof RootReducer>

export const store = createStore(RootReducer,applyMiddleware(thunk))