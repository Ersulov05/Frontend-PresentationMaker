import { CSSProperties } from 'react'
import styles from './Text.module.css'

type TextProps = {
    className?: string
    style?: CSSProperties
    children?: React.ReactNode
}

function Text({
    children,
    className,
    style,
}: TextProps) {
    return (
        <div 
            className={className}
            style={style}
        >
            {children}
        </div>
    )
}

export {
    Text
}