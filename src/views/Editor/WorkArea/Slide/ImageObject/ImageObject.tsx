import { ObjectImageType as ObjectType } from '../../../../../store/PresentationType.ts';
import styles from './ImageObject.module.css';
import { joinStyles } from '../../../../../store/utils/joinStyles.ts';

import useAppSelector from '../../../../hooks/useAppSelector.ts';
import { useAppActions } from '../../../../hooks/useAppActions.ts';
import { useClickOutside } from '../../../../hooks/useClickOutside.tsx';

interface ObjectProps {
    object: ObjectType 
    scale: number
    selected?: boolean
    edited?: boolean
}

function ImageObject({ 
    object, 
    scale,
    selected = true,
    edited,
}: ObjectProps)
{
    const keys = useAppSelector(editor => editor.keys)

    const { 
        selectObject,
        addObjectToSelection,
        deleteObjectSelection,
    } = useAppActions()
    const selectedObjectIds = useAppSelector(editor => editor.selection.selectedObjectIds)
    const isSelected = selectedObjectIds.includes(object.uid)

    function handleClick() {
        if (!edited) {
            // if (onSetEdited) {
            //     onSetEdited(object.uid)
            //     return
            // }
            if (keys.has('Control')) {
                addObjectToSelection(object.uid)
                return
            }
            selectObject(object.uid)
        }
    }

    function handleBlur() {
        if (!keys.has('Control')) {
            deleteObjectSelection()
        }
    } 

    useClickOutside({
        onClickOutside: isSelected ? handleBlur : undefined,
        ignoreClasses: [styles.image],
        ignoreIds: ["objectSelection", "deleteObjectButton"],
    })
    
    return (
        <img
            className={joinStyles(styles.image, isSelected && selected ? styles.select : '')} 
            src={object.src}
            draggable={false}
            style={{
                top: `${object.pos.y*scale}px`,
                left: `${object.pos.x*scale}px`,
                width: `${object.size.width*scale}px`,
                height: `${object.size.height*scale}px`,
            }}
            onClick={handleClick}
        />
    )
}

export default ImageObject