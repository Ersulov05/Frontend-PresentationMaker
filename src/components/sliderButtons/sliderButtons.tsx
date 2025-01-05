import { CSSProperties, useState } from 'react'
import styles from './sliderButtons.module.css'
import { joinStyles } from '../../store/utils/joinStyles'

type SliderButtonsProps = {
    gap?: number,
    buttons: string[]
    onSelect?: (button: string) => void
}

function SliderButtons({
    gap,
    buttons,
    onSelect,
}: SliderButtonsProps) {
    const [selectButtonIndex, setSelectButtonIndex] = useState(0)

    const containerStyles: CSSProperties = {
        gap: `${gap ?? 10}px`
    }

    function handleClick(index: number) {
        if (selectButtonIndex === index) return
        setSelectButtonIndex(index)
        if (onSelect) {
            onSelect(buttons[index])
        }
    }

    return (
        <div
            style={containerStyles}
            className={styles.sliderButtonsContainer}
        >
            {buttons.map((button, index) => (
                <div
                    key={button+index}
                    onClick={() => handleClick(index)}
                    className={joinStyles(
                        styles.button, 
                        index === selectButtonIndex && styles.selected
                    )}
                >{button}</div>
            ))}
        </div>
    )
}

export {
    SliderButtons
}