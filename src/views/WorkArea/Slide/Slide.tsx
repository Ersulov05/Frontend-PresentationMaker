import { useRef, useEffect, useState, CSSProperties } from 'react';
import { BackgroundType, SlideType } from '../../../store/PresentationType.ts'; 
import styles from './Slide.module.css';
import { WIDTH_SLIDE, HEIGHT_SLIDE } from '../../../store/constants.ts'
import TextObject from './TextObject/TextObject.tsx';
import ImageObject from './ImageObject/ImageObject.tsx';
import { Slider } from '../../../components/slider/Slider.tsx';
import { SliderArea } from '../../../components/sliderArea/SliderArea.tsx';

type SlideProps = {
    slide: SlideType;
    isSelected?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
    tempBackground: BackgroundType | null,
}

function Slide({ 
    slide, 
    isSelected = false, 
    style = {}, 
    onClick,
    tempBackground,
}: SlideProps)
{
    const parentRef = useRef<HTMLDivElement | null>(null); 
    const [scale, setScale] = useState<number>(0.2);
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (parentRef.current) {
                setScale(Math.min(parentRef.current.offsetWidth / WIDTH_SLIDE, parentRef.current.offsetHeight / HEIGHT_SLIDE,));
            }
        });
        if (parentRef.current) {
            resizeObserver.observe(parentRef.current);
        }
        return () => {
            resizeObserver.disconnect(); 
        };
    }, []);

    const backgroundStyle = tempBackground 
        ? tempBackground.type === "solid"
            ? { backgroundColor: tempBackground.color }
            : { backgroundImage: `url(${tempBackground.src})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' }
        : slide.background.type === 'solid'
            ? { backgroundColor: slide.background.color }
            : { backgroundImage: `url(${slide.background.src})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' }

    const slideStyles: CSSProperties = {
        ...backgroundStyle,
        width: `${ scale * WIDTH_SLIDE }px`,
        height: `${ scale * HEIGHT_SLIDE }px`,
        ...style
    }
    return (
        <div ref={parentRef} 
            className={`${styles.slide} ${isSelected ? styles.slideSelected : ''}`}
            onClick={onClick}
            style={slideStyles}
        >
            {slide.objects.map(object => (
                (object.type == 'text')
                    ? <TextObject key={object.uid} object={object} widthCoef={scale}/>
                    : <ImageObject key={object.uid} object={object} widthCoef={scale}/>
            ))}
            <SliderArea
                width={200}
                height={100}
                pointSize={20}
                range={{
                    minValueX: 0,
                    minValueY: 0,
                    maxValueX: 255,
                    maxValueY: 255,
                }}
            />
            {/* <Slider
                length={200}
                size={20}
                // startValue={10}
                step={1}
                range={{
                    minValue: 1,
                    maxValue: 255,
                }}
            /> */}
        </div>
    )
}

export default Slide