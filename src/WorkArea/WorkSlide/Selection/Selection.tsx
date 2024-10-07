import { ObjectText as ObjectType } from '../../../Presentation.ts';
import { Position, Size, Slide as SlideType } from '../../../Presentation.ts'; 
import styles from './Selection.module.css';

interface SlideProps {
    slide: SlideType; 
    widthCoef: number;
}

type GlobalSelection = {
    size: Size,
    pos: Position
}

function Selection({ slide, widthCoef }: SlideProps)
{
    const selectedObjects = slide.objects.filter(object => slide.selectedObjectIds.includes(object.uid));

    if (selectedObjects.length === 0) {
        return null;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    selectedObjects.forEach(object => {
        const { pos, size } = object;
        minX = Math.min(minX, pos.x);
        minY = Math.min(minY, pos.y);
        maxX = Math.max(maxX, pos.x + size.width);
        maxY = Math.max(maxY, pos.y + size.height);
    });

    const globalWidth = maxX - minX;
    const globalHeight = maxY - minY;

    const globalSelection: GlobalSelection = {
        pos: { x: minX, y: minY },
        size: { width: globalWidth, height: globalHeight }
    };
    return (
        <>
            <div 
                className={styles.selection} 
                style={{
                    position: 'absolute',
                    top: `${globalSelection.pos.y*widthCoef}px`,
                    left: `${globalSelection.pos.x*widthCoef}px`,
                    width: `${globalSelection.size.width*widthCoef}px`,
                    height: `${globalSelection.size.height*widthCoef}px`,
                    border: '1px dashed red'
                }}
            >
                <div className={styles.anglePoint} style={{top:'-5px', left:'-5px'}}></div>
                <div className={styles.anglePoint} style={{top:'-5px', right:'-5px'}}></div>
                <div className={styles.anglePoint} style={{bottom:'-5px', left:'-5px'}}></div>
                <div className={styles.anglePoint} style={{bottom:'-5px', right:'-5px'}}></div>
            </div>
        </>
    )
}

export default Selection