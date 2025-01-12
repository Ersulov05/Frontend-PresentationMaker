import { useRef, CSSProperties } from 'react';
import { BackgroundType, ObjectType, SlideType, TransformType } from '../../../store/PresentationType.ts'; 
import styles from './Slide.module.css';
import { WIDTH_SLIDE, HEIGHT_SLIDE } from '../../../store/constants.ts'
import TextObject from './TextObject/TextObject.tsx';
import ImageObject from './ImageObject/ImageObject.tsx';
import { Selection } from './Selection/Selection.tsx';
import useAppSelector from '../../hooks/useAppSelector.ts';

type SlideProps = {
    slide: SlideType;
    style?: CSSProperties;
    onClick?: () => void;
    scale: number;
    tempBackground: BackgroundType | null,
}

function getGlobalSelectionObject(selectedObjects: ObjectType[]): TransformType {
    if (selectedObjects.length === 0) {
        return {
            position: {
                x: 0,
                y: 0
            },
            size: {
                width: 0,
                height: 0
            }
        }
    }
    let xStart = selectedObjects[0].pos.x
    let yStart = selectedObjects[0].pos.y
    let xEnd = selectedObjects[0].pos.x + selectedObjects[0].size.width
    let yEnd = selectedObjects[0].pos.y + selectedObjects[0].size.height
    selectedObjects.forEach(object => { 
        xStart = Math.min(object.pos.x, xStart)
        yStart = Math.min(object.pos.y, yStart)
        xEnd = Math.max(object.pos.x + object.size.width, xEnd)
        yEnd = Math.max(object.pos.y + object.size.height, yEnd)
    })
    return {
        position: {
            x: xStart,
            y: yStart
        },
        size: {
            width: xEnd - xStart,
            height: yEnd - yStart
        }
    }
}

function Slide({ 
    slide,
    style = {}, 
    scale,
    onClick,
    tempBackground,
}: SlideProps)
{
    const parentRef = useRef<HTMLDivElement | null>(null); 
    const selectedObjectIds = useAppSelector(editor => editor.selection.selectedObjectIds)

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
                    background: `url(${background.src}) center center / 100% 100% no-repeat`,
                }
            default:
                return {}
        }
    }

    const backgroundStyle = tempBackground 
        ? getBackgroundStyle(tempBackground) 
        : getBackgroundStyle(slide.background)

    const slideStyles: CSSProperties = {
        ...backgroundStyle,
        width: `${ scale * WIDTH_SLIDE }px`,
        height: `${ scale * HEIGHT_SLIDE }px`,
        ...style
    }
    const selectedObjects = slide.objects.filter(object => selectedObjectIds.includes(object.uid))
    const globalSelectedTransform = getGlobalSelectionObject(selectedObjects)
    const noSelectedObjects = slide.objects.filter(object => !selectedObjectIds.includes(object.uid))
    return (
        <div ref={parentRef} 
            className={`${styles.slide}`}
            onClick={onClick}
            style={slideStyles}
        >
            {noSelectedObjects.map(object => (
                //добавить switch case
                (object.type == 'text')
                    ? <TextObject 
                        key={object.uid} 
                        object={object} 
                        scale={scale}
                    />
                    : <ImageObject 
                        key={object.uid} 
                        object={object} 
                        scale={scale}
                    />
            ))}
            {selectedObjects.length > 0 && (
                <Selection 
                    transform={globalSelectedTransform}
                    scale={scale}
                    selectedObjects={selectedObjects}
                />
            )}
        </div>
    )
}

export default Slide