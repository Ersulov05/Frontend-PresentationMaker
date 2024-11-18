import { ActionType, ColorsAction } from "../actionTypes"

const colors: string[] = [
    '#000000',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#00ffff',
    '#ff00ff',
    '#ffffff'
]

const colorsReducer = (state: string[] = colors, action: ColorsAction) => {
    switch (action.type) {
        case ActionType.ADD_COLOR:
            return [...state, action.payload]
        default: 
            return state 
    }
}

export {
    colorsReducer
}