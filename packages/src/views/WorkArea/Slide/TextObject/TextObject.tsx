import { joinStyles } from '../../../../store/utils/joinStyles.ts';
import { ObjectTextType as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';
import { useAppActions } from '../../../../store/reducers/reducers.ts';

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
    const { selectObject } = useAppActions()

    return (
        <div className={joinStyles(styles.textArea, isSelected ? styles.select : '')} 
            onClick={() => selectObject(object.uid)}
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