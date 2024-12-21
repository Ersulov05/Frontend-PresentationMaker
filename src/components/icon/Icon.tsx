import { CSSProperties } from "react"
import styles from './Icon.module.css'
import { joinStyles } from "../../store/utils/joinStyles"

type IconProps = {
    iconSrc: string
    className?: string
    style?: CSSProperties
    size?: number
}

function Icon({
    iconSrc,
    className,
    style,
    size = 20,
}: IconProps) {
    let iconSizeStyle: CSSProperties = {
        width: `${size}px`,
        height: `${size}px`
    }
    return (
        <img
            className={joinStyles(className, styles.icon)}
            style={{
                ...iconSizeStyle,
                ...style,
            }}
            src={iconSrc}
        />
    )
}

export {
    Icon
}