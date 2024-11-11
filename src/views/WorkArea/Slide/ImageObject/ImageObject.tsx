import { dispatch } from '../../../../store/editor.ts';
import { selectObject } from '../../../../store/selectObject.ts';
import { ObjectImage as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './ImageObject.module.css';
import { joinStyles } from '../../../../store/joinStyles.ts';

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
    function onClickHandler(uid: string) {
        dispatch(selectObject, uid)
    }
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
            onClick={() => onClickHandler(object.uid)}
        />
    )
}

export default ImageObject