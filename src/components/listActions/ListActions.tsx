import { CSSProperties } from "react"
import _style from './ListActions.module.css'
import { joinStyles } from "../../store/joinStyles"
import { Button, ButtopProps } from "../buttonWithList/Button"
import { generateUID } from "../../store/generateUID"

type BaseComponent = ButtopProps

export type ComponentButton = BaseComponent & {
    type: "Button"
}

export type ListComponentsType = Array<ComponentListAction | ComponentButton>

export type ComponentListAction = BaseComponent & {
    type: "ListAction"
    components: ListComponentsType
    regarding?: MouseRegarding | ObjectRegarding
}

type MouseRegarding = {
    type: "mouse"
    mouseX: number
    mouseY: number
}

type ObjectRegarding = {
    type: "object"
    locationView: "top" | "bottom" | "left" | "right"
}

type ListActionsProps = {
    components: ListComponentsType
    className?: string
    style?: CSSProperties
    regarding?: MouseRegarding | ObjectRegarding
}

function ListActions({ 
    components, 
    style = {}, 
    className = "", 
    regarding = {
        type: "object",
        locationView: "right",
    }
}: ListActionsProps) {
    const ListActionsStyles: CSSProperties = {
        ...(regarding.type === "object") 
            ? {
                ...(regarding.locationView === "bottom") 
                    ? {
                        bottom: 0,
                        left: 0,
                        transform: 'translateY(100%)',
                    } 
                    : {},
                ...(regarding.locationView === "top") 
                    ? {
                        top: 0,
                        left: 0,
                        transform: 'translateY(-100%)',
                    } 
                    : {},
                ...(regarding.locationView === "right") 
                    ? {
                        top: 0,
                        right: 0,
                        transform: 'translateX(100%)',
                    } 
                    : {},
                ...(regarding.locationView === "left") 
                    ? {
                        top: 0,
                        left: 0,
                        transform: 'translateX(-100%)',
                    } 
                    : {},
            }
            : {},
        ...(regarding.type === "mouse") 
            ? {
                top: `${regarding.mouseY}px`,
                left: `${regarding.mouseX}px`,
            }
            : {},
    }
    return (
        <div
            className={joinStyles(className, _style.listAction)} 
            style={{ ...style, ...ListActionsStyles}} 
        >
            {components.map(component => {
                const uid = generateUID(); // Генерация UID
                switch (component.type) {
                    case "Button": {
                        return (
                            <Button
                                key={uid} 
                                onClick={component.onClick} 
                                value={component.value} // Передаем текст кнопки
                                className={component.className}
                                style={component.style}
                                valueLocationHorizontal={component.valueLocationHorizontal}
                                valueLocationVertical={component.valueLocationVertical}
                            />
                        );
                    }
                    case "ListAction": {
                        return (
                            <Button
                                key={uid} 
                                onClick={() => console.log(uid)} 
                                value={component.value} // Передаем текст кнопки
                            >
                                <ListActions 
                                    components={component.components} 
                                    regarding={component.regarding}
                                />
                            </Button>
                        );
                    }
                    default: {
                        throw new Error(`Нет обработки для типа`);
                    }
                }
            })}
        </div>
    )

}

export {
    ListActions
}