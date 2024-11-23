import { useState } from 'react'
import { Button } from '../../../components/button/Button'
import { ButtonWithChild } from '../../../components/buttonWithChild/ButtonWithChild'
import { ListChooseColor } from '../../ListChooseColor/ListChooseColor'
import styles from './PopupChangeBackground.module.css'
import { BackgroundType } from '../../../store/PresentationType'
import { BackgroundDataType } from '../../../store/slides/changeBackgroundSlide'
import { PopupAddColor } from '../PopupAddColor/PopupAddColor'
import { useAppActions } from '../../../store/reducers/reducers'

type PopupChangeBackgroundProps = {
    onClose: () => void,
    colors: string[],
    background: BackgroundType,
    onGetBackground?: (backgraund: BackgroundType | null) => void
}

function PopupChangeBackground({
    onClose,
    onGetBackground,
    colors,
    background,
}: PopupChangeBackgroundProps)
{
    const { changeBackground } = useAppActions()
    const [currentBackground, setCurrentBackground] = useState<BackgroundType>(background)
    const [openPopupAddColor, setOpenPopupAddColor] = useState(false)
    function onApplyToAllHandler() {
        onCloseHandler()
    }

    function onGetColor(color: string) {
        const backgraund: BackgroundType = {
            type: "solid",
            color: color
        }
        setCurrentBackground(backgraund)
        if (onGetBackground) {
            onGetBackground(backgraund)
        }
    }

    function onChangeBackgroundSlide(all: boolean = false) {
        if (background !== currentBackground || all)
        {
            const data: BackgroundDataType = {
                background: currentBackground,
                all: all,
            }
            changeBackground(data)
        }
        onCloseHandler()
    }

    function onCloseHandler() {
        if (onGetBackground) {
            onGetBackground(null)
        }
        onClose()
    }

    return (
        <>
            <div className={styles.popupContainer}>
                <div className={styles.popup}>
                    <div className={styles.popupTitleContainer}>
                        <div className={styles.popupTitle}>Background</div>
                        <Button 
                            className={styles.buttonClosePopup} 
                            onClick={onCloseHandler}
                        />
                    </div>
                    <div className={styles.popupContent}>
                        <div className={styles.popupContentItem}>
                            <label className={styles.popupLabel}>Color:</label>
                            <ButtonWithChild
                                className={styles.popupButton} 
                                value='Choose color'
                            >
                                <ListChooseColor 
                                    colors={colors} 
                                    onGetColor={(color) => onGetColor(color)}
                                    addColor={() => setOpenPopupAddColor(true)}
                                />
                            </ButtonWithChild>
                        </div>
                        <div className={styles.popupContentItem}>
                            <label className={styles.popupLabel}>Image:</label>
                            <Button 
                                className={styles.popupButton} 
                                value='Load image'
                                onClick={onApplyToAllHandler}
                            />
                        </div>
                    </div>
                    <div className={styles.popupButtonsContainer}>
                        <Button 
                            className={styles.popupButton} 
                            value='Apply to all'
                            onClick={() => onChangeBackgroundSlide(true)}
                        />
                        <Button 
                            className={styles.popupButton} 
                            value='Save'
                            onClick={() => onChangeBackgroundSlide()}
                        />
                    </div>
                </div>
            </div>
            {openPopupAddColor && (
                <PopupAddColor 
                    onClose={() => setOpenPopupAddColor(false)}
                />
            )}
        </>
    )
}

export {
    PopupChangeBackground
}