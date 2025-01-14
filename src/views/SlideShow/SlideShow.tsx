import { useLayoutEffect, useRef, useState } from "react"
import useAppSelector from "../hooks/useAppSelector"
import { PreviewSlide } from "../Editor/ListSlides/PreviewSlide/PreviewSlide"
import styles from './SlideShow.module.css'
import { Text } from "../../components/text/Text"
import { useNavigate } from "react-router"
import { HEIGHT_SLIDE, WIDTH_SLIDE } from "../../store/constants"

function SlideShow() {
    const slides = useAppSelector(editor => editor.presentation.slides)
    const [targetSlideIndex, setTargetSlideIndex] = useState(0)
    let slide = slides[targetSlideIndex]

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

    const keys = useAppSelector(editor => editor.keys)
    function handleKeyBoard(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowRight':
                if(!keys.has('ArrowRight')) {
                    onGo()
                }
                break
            case 'ArrowLeft':
                if(!keys.has('ArrowLeft')) {
                    onBack()
                }
                break
            case 'ArrowUp':
                if(!keys.has('ArrowUp')) {
                    onBack()
                }
                break
            case 'ArrowDown':
                if(!keys.has('ArrowDown')) {
                    onGo()
                }
                break
            case ' ':
                if(!keys.has(' ')) {
                    onGo()
                }
                break
        }
    }

    function quit() {
        if (!document.fullscreenElement) {
            navigate('/')
        }
    }

    const navigate = useNavigate()
    useLayoutEffect(() => {
        document.getElementById('full')?.requestFullscreen()
        document.addEventListener("fullscreenchange", quit)
        window.addEventListener('keydown', handleKeyBoard, true)
        return () => {
            window.removeEventListener('keydown', handleKeyBoard, true)
            document.removeEventListener("fullscreenchange", quit)
        }
    }, [targetSlideIndex])

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const slideRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const updateDimensions = () => {
            if (slideRef.current) {
                const { offsetWidth, offsetHeight } = slideRef.current;
                setDimensions({ width: offsetWidth, height: offsetHeight });
            }
        };

        updateDimensions();

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    const scaleX = dimensions.width / WIDTH_SLIDE
    const scaleY = dimensions.height / HEIGHT_SLIDE
    return (
        <div id="full">
            <div className={styles.container} >
                <div className={styles.slideContainer} ref={slideRef}>
                    <PreviewSlide slide={slide} key={slide.uid} scale={scaleX < scaleY ? scaleX : scaleY}/>
                    <Text className={styles.text}>{targetSlideIndex+1} / {slides.length}</Text>
                </div>
            </div>
        </div>
        
    )
}

export default SlideShow