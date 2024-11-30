import { joinStyles } from '../../../../store/utils/joinStyles.ts';
import { ObjectTextType as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';
import { useAppActions } from '../../../hooks/useAppActions.ts';
import useAppSelector from '../../../hooks/useAppSelector.ts';

interface ObjectProps {
    object: ObjectType;
    scale: number;
    selected?: boolean;
}

function TextObject({ 
    object, 
    scale,
    selected = true,
}: ObjectProps)
{
    const { selectObject } = useAppActions()
    const selectedObjectIds = useAppSelector(editor => editor.selection.selectedObjectIds)
    const isSelected = selectedObjectIds.includes(object.uid) && selected

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