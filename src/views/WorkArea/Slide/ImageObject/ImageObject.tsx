import { dispatch } from '../../../../store/editor.ts';
import { selectObject } from '../../../../store/selectObject.ts';
import { ObjectImage as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './ImageObject.module.css';
import { joinStyles } from '../../../../store/joinStyles.ts';

interface ObjectProps {
    object: ObjectType; 
    widthCoef: number;
    isSelected?: boolean;
}

function ImageObject({ 
    object, 
    widthCoef,
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
            style={{
                top: `${object.pos.y*widthCoef}px`,
                left: `${object.pos.x*widthCoef}px`,
                width: `${object.size.width*widthCoef}px`,
                height: `${object.size.height*widthCoef}px`,
            }}
            onClick={() => onClickHandler(object.uid)}
        />
    )
}

export default ImageObject