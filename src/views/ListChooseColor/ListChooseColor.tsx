import { CSSProperties } from 'react'
import styles from './ListChooseColor.module.css'

type ListChooseColorProps = {
    onGetColor?: (color: string) => void
    colors: string[]
}

function ListChooseColor({
    onGetColor,
    colors,
}: ListChooseColorProps) {

    function onGetValueHandler(color: string) {
        if (onGetColor)
        {
            onGetColor(color)
        }
    }

    return (
        <div className={styles.listContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>Color</div>
            </div>
            <div className={styles.listColors}>
                {colors.map(color => {
                    const colorStyles: CSSProperties = {
                        backgroundColor: color
                    }
                    return (
                        <div 
                            key={color}
                            style={colorStyles} 
                            className={styles.colorItem}
                            onClick={() => onGetValueHandler(color)}
                        >
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export {
    ListChooseColor
}