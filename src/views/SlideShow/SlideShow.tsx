import { useState } from "react"
import useAppSelector from "../hooks/useAppSelector"
import { PreviewSlide } from "../Editor/ListSlides/PreviewSlide/PreviewSlide"
import styles from './SlideShow.module.css'
import { Button } from "../../components/button/Button"
import { Text } from "../../components/text/Text"
import { Icon } from "../../components/icon/Icon"
import { useNavigate } from "react-router"

function SlideShow() {
    const slides = useAppSelector(editor => editor.presentation.slides)
    const [targetSlideIndex, setTargetSlideIndex] = useState(0)
    const slide = slides[targetSlideIndex]

    function onBack() {
        if (targetSlideIndex > 0) {
            setTargetSlideIndex(targetSlideIndex - 1)
        }
    }

    function onGo() {
        if (targetSlideIndex < slides.length - 1) {
            setTargetSlideIndex(targetSlideIndex + 1)
        }
    }

    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <div className={styles.slideContainer}>
                <PreviewSlide slide={slide} key={slide.uid}/>
                <Button 
                    onClick={() => navigate('/')} 
                    className={styles.buttonClose}
                >
                    <Icon iconSrc="/image/iconKrest.svg" size={40}/>
                </Button>
            </div>
            <div className={styles.buttonContainer}>
                <Button onClick={onBack}>Назад</Button>
                <Text>{`${targetSlideIndex + 1} / ${slides.length}`}</Text>
                <Button onClick={onGo}>Дальше</Button>
            </div>
        </div>
    )
}

export default SlideShow