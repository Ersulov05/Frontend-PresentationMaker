import { TypedUseSelectorHook, useSelector } from "react-redux"
import { editorReducer } from "../../store/redux/editorReducer"

// const rootReducer = combineReducers({ 
//     slides: slidesReducer,
//     name: namePresentationReducer,
//     scale: scaleReducer,
//     colors: colorsReducer
// })


type RootState = ReturnType<typeof editorReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector