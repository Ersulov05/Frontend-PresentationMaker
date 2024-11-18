import { TypedUseSelectorHook, useSelector } from "react-redux"
import { combineReducers } from "redux"
import { slidesReducer } from "./slidesReducers"
import { namePresentationReducer } from "./namePresentationReducer"
import { colorsReducer } from "./colorsReducer"
import { scaleReducer } from "./scaleReducer"

const rootReducer = combineReducers({ 
    slides: slidesReducer,
    title: namePresentationReducer,
    scale: scaleReducer,
    colors: colorsReducer
})


type RootState = ReturnType<typeof rootReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    rootReducer,
    useAppSelector
}
