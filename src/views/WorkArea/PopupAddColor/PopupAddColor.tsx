import { useState } from 'react'
import { Button } from '../../../components/button/Button'
import { Solid } from '../../../store/PresentationType'
import styles from './PopupAddColor.module.css'

type PopupAddColorProps = {
    onGetColor?: (color: Solid | null) => void
    onClose: () => void
}

function PopupAddColor({
    onGetColor, 
    onClose
}: PopupAddColorProps) {
    const [color, setColor] = useState<Solid | null>(null)

    function onAddColor() {
        if (onGetColor) {
            onGetColor(color)
        }
        onClose()
    }

    return (
        <div className={styles.popupContainer}>
                <div className={styles.popup}>
                    <div className={styles.popupTitleContainer}>
                        <div className={styles.popupTitle}>Add Color</div>
                        <Button 
                            className={styles.buttonClosePopup} 
                            onClick={onClose}
                        />
                    </div>
                    <div className={styles.popupContent}>
                        <div className={styles.colorContainer}>
                            <div className={styles.color}></div>
                            <div className={styles.whiteGradient}></div>
                            <div className={styles.blackGradient}></div>
                        </div>
                    </div>
                    <div className={styles.popupButtonsContainer}>
                        <Button 
                            className={styles.popupButton} 
                            onClick={onClose}
                        >Cancel</Button>
                        <Button 
                            className={styles.popupButton} 
                            onClick={onAddColor}
                        >Add</Button>
                    </div>
                </div>
            </div>
    )
}

export {
    PopupAddColor
}