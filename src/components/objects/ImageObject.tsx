import { ObjectImage as ObjectType } from '../../Presentation.ts';
import styles from './ImageObject.module.css';

interface ObjectProps {
    object: ObjectType; 
    widthCoef: number;
}

function ImageObject({ object, widthCoef }: ObjectProps)
{
    return (
        <img className={styles.image} 
            src={object.src}
            style={{
                top: `${object.pos.y*widthCoef}px`,
                left: `${object.pos.x*widthCoef}px`,
                width: `${object.size.width*widthCoef}px`,
                height: `${object.size.height*widthCoef}px`,
            }}
        />
    )
}

export default ImageObject