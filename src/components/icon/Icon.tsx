import { CSSProperties } from "react"
import styles from './Icon.module.css'
import { joinStyles } from "../../store/utils/joinStyles"

type IconProps = {
    iconSrc: string
    className?: string
    style?: CSSProperties
    size?: number
    onClick?: () => void
}

function Icon({
    iconSrc,
    className,
    style,
    size = 20,
    onClick,
}: IconProps) {
    let iconSizeStyle: CSSProperties = {
        width: `${size}px`,
        height: `${size}px`
    }
    return (
        <img
            onClick={onClick}
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