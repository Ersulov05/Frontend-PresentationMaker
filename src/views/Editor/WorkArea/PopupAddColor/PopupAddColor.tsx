import { useRef } from 'react'
import { Button } from '../../../../components/button/Button'
import { Solid } from '../../../../store/PresentationType'
import styles from './PopupAddColor.module.css'
import { useAppActions } from '../../../hooks/useAppActions'

type PopupAddColorProps = {
    onGetColor?: (color: Solid) => void
    onClose: () => void
}

function PopupAddColor({
    onGetColor, 
    onClose
}: PopupAddColorProps) {
    const {addColor} = useAppActions()
    const colorInputRef = useRef<HTMLInputElement>(null)
    function onAddColor() {
        if (colorInputRef.current && onGetColor) {
            const solid: Solid ={
                color: colorInputRef.current.value,
                type: "solid"
            }
            onGetColor(solid)
            addColor(solid)
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
                    <input 
                        ref={colorInputRef}
                        className={styles.inputColor}
                        type="color" 
                    />
                </div>
                <div className={styles.popupButtonsContainer}>
                    <Button 
                        className={styles.popupButton} 
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className={styles.popupButton} 
                        onClick={onAddColor}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
}

export {
    PopupAddColor
}