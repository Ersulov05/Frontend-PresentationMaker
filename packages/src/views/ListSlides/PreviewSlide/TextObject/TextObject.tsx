import { ObjectText as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';

interface ObjectProps {
    object: ObjectType;
    widthCoef: number;
}

function TextObject({ object, widthCoef}: ObjectProps)
{
    return (
        <div className={styles.textArea} 
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