import { CSSProperties } from "react"
import { joinStyles } from "../../store/utils/joinStyles"
// import classNames from "classnames";
import styles from './Button.module.css'

export type ButtopProps = {
    onClick?: () => void
    className?: string
    style?: CSSProperties
    valueLocationHorizontal?: "center" | "left" | "right"
    valueLocationVertical?: "center" | "top" | "bottom"
    children?: React.ReactNode
    border?: number
    width?: number

}

function Button({ 
    className = undefined, 
    style = {},
    onClick, 
    valueLocationHorizontal = 'center', 
    valueLocationVertical = 'center',
    children,
    border,
    width,
 }: ButtopProps) {
    const buttonStyles: CSSProperties = {
        justifyContent: valueLocationHorizontal === 'left' ? 'flex-start' 
                        : valueLocationHorizontal === 'right' ? 'flex-end' 
                        : 'center',
        alignItems: valueLocationVertical === 'top' ? 'flex-start' 
                        : valueLocationVertical === 'bottom' ? 'flex-end' 
                        : 'center',
        paddingInline: `${border ?? 0}px`,
        width:`${width}px`,
    }

    return (
        <div 
            className={joinStyles(className ? className : styles.buttonDefault, styles.button)} 
            style={{ ...style, ...buttonStyles }} 
            onClick={onClick}         
        >
            {children}
        </div>       
    );
}

export {
    Button
}