import { useEffect, useRef, useState } from 'react';
import { BackgroundType } from '../../../store/PresentationType.ts'
import styles from './ListSlides.module.css';
import { PreviewSlide } from './PreviewSlide/PreviewSlide.tsx';
import { useDragAndDrop } from '../../hooks/useDragAndDrop.tsx';
import { SlidesDrag } from './SlidesDrag/SlidesDrag.tsx';
import { useAppActions } from '../../hooks/useAppActions.ts';
import useAppSelector from '../../hooks/useAppSelector.ts';

type SlidesProps = {
    tempBackground: BackgroundType | null,
}

function ListSlides({ 
    tempBackground,
}: SlidesProps) {
    const { 
        selectSlide, 
        translateSlides,
        addSlideToSelection,
    } = useAppActions()
    const keys = useAppSelector(editor => editor.keys)
    const slides = useAppSelector(editor => editor.presentation.slides)
    const selectedSlideIds = useAppSelector(editor => editor.selection.selectedSlideIds)

    const dragSlide = useDragAndDrop()
    const listSlidesRef = useRef<HTMLDivElement | null>(null);
    const slidesDragRef = useRef<HTMLDivElement | null>(null);
    const [listSlidesCoords, setListSlidesCoords] = useState({x: 0, y: 0}) 
    const [insertIndex, setInsertIndex] = useState<number | null>(null);

    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const orderedSelectedSlides = selectedSlides.sort((a, b) => {
        return selectedSlideIds.indexOf(b.uid) - selectedSlideIds.indexOf(a.uid);
    });
    const noSelectedSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    const scale = 0.22
    
    const scrollToSelectedSlide = () => {
        const selectedSlideUid = selectedSlideIds[0];
        if (selectedSlideUid) {
            const selectedElement = document.querySelector(`div[data-uid="${selectedSlideUid}"]`);
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest',
                });
            }
        }
    }

    function handleClick(slideUid: string) {
        if (keys.has('Control')) {
            addSlideToSelection(slideUid)
            return
        }
        selectSlide(slideUid)
    }

    useEffect(() => {
        scrollToSelectedSlide();
    }, [selectedSlideIds]);

    useEffect(() => {
        const handleScroll = () => {
            if (listSlidesRef.current) {
                setListSlidesCoords({
                    x: listSlidesRef.current.scrollLeft,
                    y: listSlidesRef.current.scrollTop,
                })
            }
        }

        const listSlidesElement = listSlidesRef.current;
        listSlidesElement?.addEventListener('scroll', handleScroll);

        return () => {
            listSlidesElement?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (dragSlide.dragging) {
            const currentY = dragSlide.position.y
            let newInsertIndex = -1
            if (listSlidesRef.current) {
                let slideIndex = 0
                for (let i = 0; i < listSlidesRef.current.children.length; i++) {
                    const child = listSlidesRef.current.children[i];
                    const dataAtValue = child.getAttribute('data-at');
                    if (dataAtValue == "slide") {
                        const rect = child.getBoundingClientRect();
                        if (currentY > rect.top - rect.height * 0.9) {
                            newInsertIndex = slideIndex
                        }
                        slideIndex++
                    }
                }
            }
            setInsertIndex(newInsertIndex);
        } else {
            setInsertIndex(null);
        }
    }, [dragSlide.dragging, dragSlide.position.y, listSlidesCoords.y]);

    useEffect(() => {   
        if (dragSlide.dragging !== null) {
            if (!dragSlide.dragging) { 
                if (insertIndex !== null) {
                    translateSlides(insertIndex)
                }
                dragSlide.position.x = 0
                dragSlide.position.y = 0
            }
        }  
    }, [dragSlide.dragging]);

    if (dragSlide.dragging) {
        return (
            <div
                ref={listSlidesRef}
                className={styles.slides}
            >
                {insertIndex === -1 && (
                    <div style={{ height: '100px', backgroundColor: 'lightgrey', flexShrink: 0 }}>
                        Preview
                    </div>
                )}
                {noSelectedSlides.map((slide, index) => {
                    return (
                        <>
                            <PreviewSlide
                                data-uid={slide.uid}
                                scale={scale}
                                key={slide.uid} 
                                slide={slide} 
                                style={{
                                    pointerEvents: "none"
                                }}
                                background={
                                    selectedSlideIds[0] === slide.uid 
                                        ? tempBackground 
                                        : null
                                }
                            />
                            {index === insertIndex && (
                                <div  key={"preview"+slide.uid} style={{ height: '100px', backgroundColor: 'lightgrey', flexShrink: 0 }}>
                                    Preview
                                </div>
                            )}
                        </>
                    )
                })}
                <SlidesDrag       
                    ref={slidesDragRef}
                    scale={scale}
                    x={7}
                    y={dragSlide.position.y+listSlidesCoords.y}
                    slides={orderedSelectedSlides} 
                />
            </div>
        )
    }

    return (
        <div
            ref={listSlidesRef}
            className={styles.slides}
        >
            {slides.map(slide => (
                <PreviewSlide 
                    key={slide.uid} 
                    slide={slide} 
                    scale={scale}
                    onClick={() => handleClick(slide.uid)}
                    isSelected={selectedSlideIds.includes(slide.uid)}
                    background={
                        selectedSlideIds[0] === slide.uid 
                            ? tempBackground 
                            : null
                    }
                    onDrag={dragSlide.startDrag}
                 />
            ))}
        </div>
    )
}

export {
    ListSlides
}