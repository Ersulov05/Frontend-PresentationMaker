import { Button } from '../../../components/button/Button'
import useAppSelector from '../../hooks/useAppSelector';
import { useGeneratePDF } from '../../hooks/useGeneratePDF';
import { PreviewSlide } from '../ListSlides/PreviewSlide/PreviewSlide';
import styles from './PreviewPresentation.module.css'

type PreviewPresentationProps = {
    onClose?: () => void
    onGeneratePDF: () => void
}

function PreviewPresentation({
    onClose,
    onGeneratePDF
}: PreviewPresentationProps) {

    const slides = useAppSelector(editor => editor.presentation.slides)

    return (
        <div className={styles.previewContainer}>
            <div className={styles.previewPresentation}>
                <div
                    className={styles.title}
                >
                    <div>
                        Presentation Preview
                    </div>
                </div>
                
                <div
                    className={styles.content}
                >
                    {slides.map(slide => (
                        <PreviewSlide 
                            slide={slide} 
                            scale={1} 
                            key={'preview' + slide.uid} 
                        />
                    ))}
                </div>
                <div
                    className={styles.footer}
                >
                    <Button 
                        onClick={onClose}
                        border={10}
                    >
                        Close
                    </Button>
                    <Button
                        border={10}
                        onClick={onGeneratePDF}

                    >
                        Generate PDF
                    </Button>
                </div>
            </div>
        </div>
    )
}

export {
    PreviewPresentation
}