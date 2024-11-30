import { ObjectImageType as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './ImageObject.module.css';
import { joinStyles } from '../../../../store/utils/joinStyles.ts';

import useAppSelector from '../../../hooks/useAppSelector.ts';
import { useAppActions } from '../../../hooks/useAppActions.ts';

interface ObjectProps {
    object: ObjectType; 
    scale: number;
    selected?: boolean;
}

function ImageObject({ 
    object, 
    scale,
    selected = false,
}: ObjectProps)
{
    const { selectObject } = useAppActions()
    const selectedObjectIds = useAppSelector(editor => editor.selection.selectedObjectIds)
    const isSelected = selectedObjectIds.includes(object.uid) && selected
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