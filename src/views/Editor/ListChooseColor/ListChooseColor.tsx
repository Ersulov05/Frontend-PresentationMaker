import { CSSProperties, useState } from 'react'
import styles from './ListChooseColor.module.css'
import { Gradient, Solid } from '../../../store/PresentationType'
import { generateUID } from '../../../store/utils/generateUID'
import { PopupAddColor } from '../WorkArea/PopupAddColor/PopupAddColor'
import { PopupAddGradient } from '../WorkArea/PopupAddGradient/PopupAddGradient'

type ListChooseColorProps = {
    onGetColor?: (color: Solid | Gradient) => void
    colors: Array<Solid | Gradient>
}

function ListChooseColor({
    onGetColor,
    colors,
}: ListChooseColorProps) {
    const [openPopupAddColor, setOpenPopupAddColor] = useState(false)
    const [openPopupAddGradient, setOpenPopupAddGradient] = useState(false)
    function onGetValueHandler(color: Solid | Gradient) {
        if (onGetColor)
        {
            onGetColor(color)
        }
    }

    const solids: Solid[] = colors.filter(shape => shape.type === "solid")
    const gradients: Gradient[] = colors.filter(shape => shape.type === "gradient")

    return (
        <>
        <div className={styles.listContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>Color</div>
            </div>
            <div className={styles.listColors}>
                {solids.map(color => {
                    const colorStyles: CSSProperties = {
                        backgroundColor: color.color
                    }
                    return (
                        <div 
                            key={generateUID()}
                            style={colorStyles} 
                            className={styles.colorItem}
                            onClick={() => onGetValueHandler(color)}
                        >
                        </div>
                    )
                })}
                <img 
                    src='/image/react.svg'
                    className={styles.colorItem}
                    onClick={() => setOpenPopupAddColor(true)}
                />
            </div>
            <div className={styles.titleContainer}>
                <div className={styles.title}>Gradient</div>
            </div>
            <div className={styles.listColors}>
                {gradients.map(gradient => {
                    const colorStyles: CSSProperties = {
                        background: `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`
                    }
                    return (
                        <div 
                            key={generateUID()}
                            style={colorStyles} 
                            className={styles.colorItem}
                            onClick={() => onGetValueHandler(gradient)}
                        >
                        </div>
                    )
                })}
                <img 
                    src='/image/react.svg'
                    className={styles.colorItem}
                    onClick={() => setOpenPopupAddGradient(true)}
                />
            </div>
            
        </div>
        {openPopupAddColor && (
            <PopupAddColor 
                onClose={() => setOpenPopupAddColor(false)}
                onGetColor={onGetValueHandler}
            />
        )}
        {openPopupAddGradient && (
            <PopupAddGradient
                onClose={() => setOpenPopupAddGradient(false)}
                onGetColor={onGetValueHandler}
            />
        )}
        </>
    )
}

export {
    ListChooseColor
}