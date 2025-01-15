import { useRef, useState } from 'react'
import { NumberField } from '../../../../components/numberField/NumberField'
import { Button } from '../../../../components/button/Button'
import { Gradient} from '../../../../store/PresentationType'
import { generateUID } from '../../../../store/utils/generateUID'
import { useAppActions } from '../../../hooks/useAppActions'
import styles from './PopupAddGradient.module.css'

type PopupAddGradientProps = {
    onGetColor?: (color: Gradient) => void
    onClose: () => void
}

function PopupAddGradient({
    onGetColor, 
    onClose
}: PopupAddGradientProps) {

    const {addColor} = useAppActions()
    function onAddColor() {
        const gradient: Gradient = {
            colors: getColors(),
            angle: angle,
            type: "gradient"
        }
        if (onGetColor) {
            onGetColor(gradient)
        }
        addColor(gradient)
        onClose()
    }
    const [angle, setAngle] = useState(0)
    const [colors, setColors] = useState<string[]>(["#ff0000", "#00ff00"]);

    const colorRef = useRef<HTMLDivElement>(null)
    const colorsContainerRef = useRef<HTMLInputElement>(null)

    function addColorPreview() {
        const newColors = [...getColors(), "#ffffff"]
        setColors(newColors)
    }

    function onChangeColor() {
        if (colorRef.current) {
            colorRef.current.style.background = `linear-gradient(${angle}deg, ${getColors().join(', ')})`
        }
    }

    const getColors = () => {
        const childrens = colorsContainerRef.current?.children
        const colors: string[] = []

        if (childrens) {
            Array.from(childrens).forEach(child => {
                if (child instanceof HTMLInputElement && child.type === 'color') {
                    colors.push(child.value)
                }
            })
        }

        return colors
    }  
    
    function onSetAngle(angle: number) {
        setAngle(angle)
        setColors(getColors())
    }

    return (
        <div className={styles.popupContainer}>
            <div className={styles.popup}>
                <div className={styles.popupTitleContainer}>
                    <div className={styles.popupTitle}>Добавить цвет</div>
                    <Button 
                        className={styles.buttonClosePopup} 
                        onClick={onClose}
                    />
                </div>
                <div className={styles.popupContent}>
                    <div
                        ref={colorRef}
                        className={styles.gradientPreview}
                        style={{
                            background: `linear-gradient(${angle}deg, ${colors.join(', ')})`
                        }}
                    >

                    </div>
                    <div className={styles.angleContainer}>
                        <label className={styles.popupLabel}>Angle:</label>
                        <NumberField
                            value={angle.toString()}
                            onChange={onSetAngle}
                            className={styles.angleField}
                            limit={{
                                minValue: -360,
                                maxValue: 360
                            }}
                        /> 
                    </div>
                    <div 
                        ref={colorsContainerRef}
                    >
                        {colors.map(color => (
                            <input 
                                key={generateUID()}
                                className={styles.inputColor}
                                type="color" 
                                defaultValue={color}
                                onChange={onChangeColor}
                            />
                        ))}
                    </div>                                       
                    <Button onClick={addColorPreview}>
                        Добавить цвет
                    </Button>
                </div>
                <div className={styles.popupButtonsContainer}>
                    <Button 
                        className={styles.popupButton} 
                        onClick={onClose}
                    >
                        Отмена
                    </Button>
                    <Button 
                        className={styles.popupButton} 
                        onClick={() => onAddColor()}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export {
    PopupAddGradient
}