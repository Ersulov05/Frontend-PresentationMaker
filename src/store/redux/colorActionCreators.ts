import { Gradient, Solid } from "../PresentationType"
import { 
    ActionType, 
    AddColorAction, 
} from "./actions"

const addColor = (color: Solid | Gradient): AddColorAction => {
    return {
        type: ActionType.ADD_COLOR,
        payload: color
    }
}

export {
    addColor
}