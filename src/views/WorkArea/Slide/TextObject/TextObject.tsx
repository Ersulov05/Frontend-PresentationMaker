import { useEffect } from 'react';
import { dispatch } from '../../../../store/editor.ts';
import { joinStyles } from '../../../../store/joinStyles.ts';
import { ObjectText as ObjectType } from '../../../../store/PresentationType.ts';
import { selectObject } from '../../../../store/selectObject.ts';
import styles from './TextObject.module.css';

interface ObjectProps {
    object: ObjectType;
    widthCoef: number;
    isSelected?: boolean;
}

function TextObject({ 
    object, 
    widthCoef,
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
                top: `${object.pos.y*widthCoef}px`,
                left: `${object.pos.x*widthCoef}px`,
                width: `${object.size.width*widthCoef}px`,
                height: `${object.size.height*widthCoef}px`,
                background: object.backgroundColor,
                color: object.color,
                fontFamily: object.font.family, 
                fontWeight: object.font.weight,  
                fontSize: `${object.font.size*widthCoef}px`,  
                lineHeight: `${object.font.lineHeight*widthCoef}px` 
            }}>
            <div className={styles.text}>{object.value}</div>
        </div>
    )
}

export default TextObject