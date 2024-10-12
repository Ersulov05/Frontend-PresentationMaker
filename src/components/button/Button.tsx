import { CSSProperties } from "react"
import { joinStyles } from "../../store/joinStyles"
import _style from './Button.module.css'


type ButtopProps = {
    onClick?: () => void
    value?: string
    className?: string
    style?: CSSProperties
    valueLocationHorizontal?: "center" | "left" | "right"
    valueLocationVertical?: "center" | "top" | "bottom"
}

function Button({ className = "", style = {}, value = "", onClick, valueLocationHorizontal = 'center', valueLocationVertical = 'center' }: ButtopProps) {
    const buttonStyles: CSSProperties = {
        justifyContent: valueLocationHorizontal === 'left' ? 'flex-start' 
                        : valueLocationHorizontal === 'right' ? 'flex-end' 
                        : 'center',
        alignItems: valueLocationVertical === 'top' ? 'flex-start' 
                        : valueLocationVertical === 'bottom' ? 'flex-end' 
                        : 'center',
    }
    
    return (
        <div
            className={joinStyles(className, _style.button)} 
            style={{ ...style, ...buttonStyles }} 
            onClick={onClick}
        >
            <div>
                {value}
            </div>
        </div>
    );
}

export {
    Button
}