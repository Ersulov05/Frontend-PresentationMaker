import { useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../../../components/button/Button'
import useAppSelector from '../../hooks/useAppSelector';
import { PreviewSlide } from '../ListSlides/PreviewSlide/PreviewSlide';
import styles from './PreviewPresentation.module.css'
import { WIDTH_SLIDE } from '../../../store/constants';

type PreviewPresentationProps = {
    onClose?: () => void
    onGeneratePDF: () => void
}

function PreviewPresentation({
    onClose,
    onGeneratePDF
}: PreviewPresentationProps) {

    const slides = useAppSelector(editor => editor.presentation.slides)

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

    const scaleX = (dimensions.width - 40) / WIDTH_SLIDE

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
                    ref={slideRef}
                >
                    {slides.map(slide => (
                        <PreviewSlide 
                            slide={slide} 
                            scale={scaleX} 
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