import { useState } from 'react'
import { Button } from '../../../../components/button/Button'
import { ButtonWithChild } from '../../../../components/buttonWithChild/ButtonWithChild'
import { ListChooseColor } from '../../ListChooseColor/ListChooseColor'
import styles from './PopupChangeBackground.module.css'
import { BackgroundType, Gradient, Solid } from '../../../../store/PresentationType'
import { BackgroundDataType } from '../../../../store/slides/changeBackgroundSlide'
import { PopupAddColor } from '../PopupAddColor/PopupAddColor'
import { useAppActions } from '../../../hooks/useAppActions'
import useAppSelector from '../../../hooks/useAppSelector'
import { PopupAddGradient } from '../PopupAddGradient/PopupAddGradient'
import { FileInput } from '../../../../components/fileInput/fileInput'
import { Base64FormatType, getBase64ByFile, isValidBase64Data } from '../../../../store/utils/imageManager'

type PopupChangeBackgroundProps = {
    onClose: () => void,
    background: BackgroundType,
    onGetBackground?: (backgraund: BackgroundType | null) => void
}

function PopupChangeBackground({
    onClose,
    onGetBackground,
    background,
}: PopupChangeBackgroundProps)
{
    const { changeBackground } = useAppActions()
    const colors = useAppSelector(editor => editor.colors)
    
    const getBackgroundStyle = (background: BackgroundType) => {  
        switch (background.type) {
            case "solid":
                return { backgroundColor: background.color }
            case "gradient":
                return {
                    background: `linear-gradient(${background.angle}deg, ${background.colors.join(', ')})`
                }
            case "image":
                return {
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }
            default:
                return {}
        }
    }

    const [currentBackground, setCurrentBackground] = useState<BackgroundType>(background)
    const [openPopupAddColor, setOpenPopupAddColor] = useState(false)
    const [openPopupAddGradient, setOpenPopupAddGradient] = useState(false)
    const backgroundStyle = getBackgroundStyle(currentBackground) 

    function onGetColor(color: Solid | Gradient) {
        const backgraund: BackgroundType = color
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

    function handleLoad(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file && file.type === 'image/png') {
            getBase64ByFile(file)
                .then((imageBase64) => {
                    const formats: Base64FormatType[] = [
                        Base64FormatType.IMAGE_PNG,
                        Base64FormatType.IMAGE_SVG,
                        Base64FormatType.IMAGE_JPEG,
                        Base64FormatType.IMAGE_GIF,
                    ]
                    if (isValidBase64Data(imageBase64, formats)) {
                        const backgraund: BackgroundType = {
                            src: imageBase64,
                            type: "image"
                        }
                        setCurrentBackground(backgraund)
                        if (onGetBackground) {
                            onGetBackground(backgraund)
                        }
                    } else {
                        console.log("неверный тип base64")
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке изображения:", error);
                });
        } else {
            console.error("Выберите файл формата PNG.");
        }
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
                            {(currentBackground.type === "gradient" 
                            || currentBackground.type === "solid") && 
                                <div 
                                    style={backgroundStyle} 
                                    className={styles.colorItem}
                                >
                                </div>
                            }
                            <ButtonWithChild
                                className={styles.popupButton} 
                                value='Choose color'
                            >
                                <ListChooseColor 
                                    colors={colors} 
                                    onGetColor={(color) => onGetColor(color)}
                                    addColor={() => setOpenPopupAddColor(true)}
                                    addGradient={() => setOpenPopupAddGradient(true)}
                                />
                            </ButtonWithChild>
                        </div>
                        <div className={styles.popupContentItem}>
                            <label className={styles.popupLabel}>Image:</label>
                            {currentBackground.type === "image" && 
                                <div 
                                    style={backgroundStyle} 
                                    className={styles.colorItem}
                                >
                                </div>
                            }
                            <FileInput
                                id={"loadBackgroundImage"}
                                onChange={handleLoad}
                            />
                            <Button 
                                className={styles.popupButton} 
                                onClick={() => {document.getElementById('loadBackgroundImage')?.click()}}
                                border={15}
                            >
                                Load image
                            </Button>
                        </div>
                    </div>
                    <div className={styles.popupButtonsContainer}>
                        <Button 
                            className={styles.popupButton} 
                            onClick={() => onChangeBackgroundSlide(true)}
                        >Apply to all</Button>
                        <Button 
                            className={styles.popupButton} 
                            onClick={() => onChangeBackgroundSlide()}
                        >Save</Button>
                    </div>
                </div>
            </div>
            {openPopupAddColor && (
                <PopupAddColor 
                    onClose={() => setOpenPopupAddColor(false)}
                    onGetColor={onGetColor}
                />
            )}
            {openPopupAddGradient && (
                <PopupAddGradient
                    onClose={() => setOpenPopupAddGradient(false)}
                    onGetColor={onGetColor}
                />
            )}
        </>
    )
}

export {
    PopupChangeBackground
}