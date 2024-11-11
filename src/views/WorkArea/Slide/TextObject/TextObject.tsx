import { dispatch } from '../../../../store/editor.ts';
import { joinStyles } from '../../../../store/joinStyles.ts';
import { ObjectText as ObjectType } from '../../../../store/PresentationType.ts';
import { selectObject } from '../../../../store/selectObject.ts';
import styles from './TextObject.module.css';

interface ObjectProps {
    object: ObjectType;
    scale: number;
    isSelected?: boolean;
}

function TextObject({ 
    object, 
    scale,
    isSelected = false,
}: ObjectProps)
{
    function onClickHandler(uid: string) {
        dispatch(selectObject, uid)
    }

    return (
        <div className={joinStyles(styles.textArea, isSelected ? styles.select : '')} 
            onClick={() => onClickHandler(object.uid)}
            style={{
                top: `${(object.pos.y)*scale}px`,
                left: `${(object.pos.x)*scale}px`,
                width: `${object.size.width*scale}px`,
                height: `${object.size.height*scale}px`,
                background: object.backgroundColor,
                color: object.color,
                fontFamily: object.font.family, 
                fontWeight: object.font.weight,  
                fontSize: `${object.font.size*scale}px`,  
                lineHeight: `${object.font.lineHeight*scale}px` 
            }}>
            <div className={styles.text}>{object.value}</div>
        </div>
    )
}

export default TextObject