import { ObjectImageType as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './ImageObject.module.css';
import { joinStyles } from '../../../../store/utils/joinStyles.ts';
import { useAppActions } from '../../../../store/reducers/reducers.ts';

interface ObjectProps {
    object: ObjectType; 
    scale: number;
    isSelected?: boolean;
}

function ImageObject({ 
    object, 
    scale,
    isSelected = false,
}: ObjectProps)
{
    const { selectObject } = useAppActions()

    return (
        <img
            className={joinStyles(styles.image, isSelected ? styles.select : '')} 
            src={object.src}
            draggable={false}
            style={{
                top: `${object.pos.y*scale}px`,
                left: `${object.pos.x*scale}px`,
                width: `${object.size.width*scale}px`,
                height: `${object.size.height*scale}px`,
            }}
            onClick={() => selectObject(object.uid)}
        />
    )
}

export default ImageObject