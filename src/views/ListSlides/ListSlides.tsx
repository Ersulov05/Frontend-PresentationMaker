import { CSSProperties, useEffect, useRef, useState } from 'react';
import { dispatch } from '../../store/editor.ts';
import { BackgroundType, SlideType } from '../../store/PresentationType.ts'
import { selectSlide } from '../../store/selectSlide.ts';
import styles from './ListSlides.module.css';
import { HEIGHT_SLIDE, WIDTH_SLIDE } from '../../store/constants.ts';
import { PreviewSlide } from './PreviewSlide/PreviewSlide.tsx';
import { useDragAndDrop } from '../hooks/useDragAndDrop.tsx';
import { SlidesDrag } from './SlidesDrag/SlidesDrag.tsx';
import { translateSlides } from '../../store/translateSlides.ts';

type SlidesProps = {
    slides: SlideType[],
    selectedSlideIds: string[],
    tempBackground: BackgroundType | null,
}

function ListSlides({ 
    slides, 
    selectedSlideIds,
    tempBackground,
}: SlidesProps)
{
    const dragSlide = useDragAndDrop()
    const listSlidesRef = useRef<HTMLDivElement | null>(null);
    const slidesDragRef = useRef<HTMLDivElement | null>(null);
    const [listSlidesCoords, setListSlidesCoords] = useState({x: 0, y: 0}) 
    const [insertIndex, setInsertIndex] = useState<number | null>(null);

    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const noSelectedSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    const firstSlide = selectedSlides[0]
    const scale = 0.18

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
                        if (currentY > rect.top - rect.height * 0.5) {
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
                console.log("save")
                if (insertIndex !== null) {
                    dispatch(translateSlides, insertIndex)
                }
                dragSlide.position.x = 0
                dragSlide.position.y = 0
            }
        }  
    }, [dragSlide.dragging]);

    function onSelectSlide(slideUid: string) {
        dispatch(selectSlide, slideUid)
    }

    const slideStyles: CSSProperties = {
        width: WIDTH_SLIDE * scale + "px",
        aspectRatio: `${WIDTH_SLIDE}/${HEIGHT_SLIDE}`,
    }

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
                                scale={scale}
                                key={slide.uid} 
                                slide={slide} 
                                onClick={() => onSelectSlide(slide.uid)}
                                isSelected={selectedSlideIds.includes(slide.uid)}
                                style={slideStyles}
                                tempBackground={
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
                    key={firstSlide.uid}
                    ref={slidesDragRef}
                    scale={scale}
                    x={7}
                    y={dragSlide.position.y+listSlidesCoords.y}
                    slide={firstSlide} 
                    isSelected={selectedSlideIds.includes(firstSlide.uid)}
                    style={slideStyles}
                    tempBackground={
                        selectedSlideIds[0] === firstSlide.uid 
                            ? tempBackground 
                            : null
                    }
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
                    onClick={() => onSelectSlide(slide.uid)}
                    isSelected={selectedSlideIds.includes(slide.uid)}
                    style={slideStyles}
                    tempBackground={
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