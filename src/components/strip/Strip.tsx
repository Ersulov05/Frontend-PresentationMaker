import { CSSProperties } from 'react'
import styles from './Strip.module.css'
import { joinStyles } from '../../store/utils/joinStyles'

type StripProps = {
    orientation?: "horizontal" | "vertical"
    className?: string
    style?: CSSProperties
}

function Strip({
    orientation = "horizontal",
    className,
    style,
}: StripProps) {
    return (
        <div
            className={joinStyles(
                className, 
                !className && styles.defaultStrip,
                orientation === "horizontal"
                    ? styles.horizontal
                    : styles.vertical
            )}
            style={style}
        >
        </div>
    )
}

export {
    Strip
}