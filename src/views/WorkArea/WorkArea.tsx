import { CSSProperties, useState } from 'react';
import { HEIGHT_SLIDE, WIDTH_SLIDE } from '../../store/constants.ts';
import { SlideType, ObjectType } from '../../store/PresentationType.ts'; // Импортируйте тип Slide
import Slide from './Slide/Slide.tsx';
import styles from './WorkArea.module.css';
import { ListActions, ListComponentsType } from '../../components/listActions/ListActions.tsx';
import { joinStyles } from '../../store/joinStyles.ts';
import { PopupChangeBackground } from './PopupChangeBackground/PopupChangeBackground.tsx';

// const WORK_AREA_BORDER_WIDTH: number = 20

type OverflowType = {
    top: number,
    right: number,
    bottom: number,
    left: number,
}

function calculateOverflow(objects: ObjectType[]): OverflowType 
{
    const overflow: OverflowType = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    objects.forEach(object => {
        if (object.pos.x < 0) overflow.left = Math.max(object.pos.x * -1, overflow.left) 
        if (object.pos.y < 0) overflow.top = Math.max(object.pos.y * -1, overflow.top)
        Math.max(object.pos.x + object.size.width - WIDTH_SLIDE, overflow.right)
        Math.max(object.pos.y + object.size.height - HEIGHT_SLIDE, overflow.bottom)
    })

    return overflow
}

type SlideProps = {
    slide?: SlideType,
    scale: number,
}

function WorkArea({ slide, scale }: SlideProps)
{
    const [openPopupChangeBackground, setOpenPopupChangeBackground] = useState(false)
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const components: ListComponentsType = [
        {
            type: "Button",
            value: "change backgraund",
            className: joinStyles(styles.buttonListAction),
            onClick: () => setOpenPopupChangeBackground(true)
        },
    ] 


    function handleContextMenu(event: React.MouseEvent) {
        event.preventDefault()
        setMouseX(event.clientX)
        setMouseY(event.clientY)
        setContextMenuVisible(true)
    }

    function closeContextMenu() {
        setContextMenuVisible(false)
    }

    if (!slide) {
        return (
            <div className={styles.workArea}>
                <p>Нет слайда для отображения</p>
            </div>
        );
    }

    const { objects } = slide;
    const overflow: OverflowType = calculateOverflow(objects)
    const workAreaStyles: CSSProperties = {
        width: `${ scale * (WIDTH_SLIDE + Math.max(overflow.left, overflow.right) * 2)}px`,
        height: `${ scale * (HEIGHT_SLIDE + Math.max(overflow.top, overflow.bottom) * 2)}px`,
    }

    const slideStyles: CSSProperties = {
        position: 'absolute',
        overflow: 'unset',
        top: `${ scale * Math.max(overflow.top, overflow.bottom)}px`,
        left: `${ scale * Math.max(overflow.left, overflow.right)}px`,
        width: `${ scale * WIDTH_SLIDE}px`,
        height: `${ scale * HEIGHT_SLIDE}px`
    }
    
    return (
        <>
            <div 
                className={styles.workAreaContainer}
                onContextMenu={handleContextMenu}
                onClick={closeContextMenu}
            >
                <div className={styles.workArea} style={workAreaStyles}>
                    <Slide slide={slide} style={slideStyles}/>
                </div>
                {contextMenuVisible && (
                    <ListActions 
                        components={components} 
                        regarding={{
                            type: "mouse",
                            mouseX: mouseX,
                            mouseY: mouseY,
                        }}
                    />
                )}
            </div>
            {openPopupChangeBackground && (
                <PopupChangeBackground onClickClose={() => setOpenPopupChangeBackground(false)}/>
            )}
        </>
        
    )
}

export {
    WorkArea
}