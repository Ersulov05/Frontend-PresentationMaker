import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { bindActionCreators, combineReducers } from "redux"
import { slidesReducer } from "./slidesReducers"
import { namePresentationReducer } from "./namePresentationReducer"
import { colorsReducer } from "./colorsReducer"
import { scaleReducer } from "./scaleReducer"
import { ActionCreators } from "../action-creators/actions"


const rootReducer = combineReducers({ 
    slides: slidesReducer,
    name: namePresentationReducer,
    scale: scaleReducer,
    colors: colorsReducer
})


type RootState = ReturnType<typeof rootReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useAppActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(ActionCreators, dispatch)
}

export {
    rootReducer,
    useAppSelector,
    useAppActions,
}
