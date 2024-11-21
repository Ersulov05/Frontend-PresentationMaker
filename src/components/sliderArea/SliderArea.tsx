import { CSSProperties, useEffect, useRef, useState } from 'react'
import styles from './SliderArea.module.css'
import { joinStyles } from '../../store/utils/joinStyles'

type SliderAreaProps = {
    orientation?: "horizontal" | "vertical"
    width: number
    height: number
    pointSize?: number
    range: {
        minValueX: number
        maxValueX: number
        minValueY: number
        maxValueY: number
    }
    startValueX?: number
    startValueY?: number
    step?: number
    visibleValue?: "top" | "bottom" | "left" | "right"
    pointStyle?: CSSProperties
    stripStyle?: CSSProperties
    onGetValue?: (valueX: number, valueY: number) => void
}

const overflowHorizontal: number = 2

function SliderArea({
    width,
    height,
    pointSize,
    range,
    startValueX = range.minValueX,
    startValueY = range.minValueY,
    step = 1,
    visibleValue,
    stripStyle,
    pointStyle,
    orientation,
    onGetValue,
}: SliderAreaProps) {
    const [valueX, setValueX] = useState<number>(startValueX)
    const [valueY, setValueY] = useState<number>(startValueY)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [isClick, setIsClick] = useState<boolean>(false)
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const pointRef = useRef<HTMLDivElement | null>(null)

    const _pointSize: number = pointSize || 10
    const stepLengthX: number = (width + _pointSize/2) / (range.maxValueX - range.minValueX)
    const pointPosX = (valueX - range.minValueX) * stepLengthX - _pointSize / 2
    const stepLengthY: number = (height + _pointSize/2) / (range.maxValueY - range.minValueY)
    const pointPosY = (valueY - range.minValueY) * stepLengthY - _pointSize / 2
    
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        if (isClick) {
            document.addEventListener('keydown', handleKeyDown)
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDragging, valueX, valueY, isClick])

    function changeValue(newValueX: number, newValueY: number) {
        newValueX = Math.min(range.maxValueX, Math.max(range.minValueX, newValueX))
        newValueY = Math.min(range.maxValueY, Math.max(range.minValueY, newValueY))
        if (newValueX === valueX && newValueY === valueY) return
        setValueX(newValueX)
        setValueY(newValueY)
        if (onGetValue) {
            onGetValue(newValueX, newValueY)
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (pointRef.current && !pointRef.current.contains(event.target as Node)
        ) {
            setIsClick(false);
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault()
        switch (event.key) {
            case 'ArrowRight':
                changeValue(valueX + step, valueY)
                break
            case 'ArrowLeft':
                changeValue(valueX - step, valueY)
                break
            case 'ArrowUp':
                changeValue(valueX, valueY - step)
                break
            case 'ArrowDown':
                changeValue(valueX, valueY + step)
                break
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        setIsClick(false)
        if (isDragging && sliderRef.current) {
            const sliderRect = sliderRef.current.getBoundingClientRect()
            const sliderLeft = sliderRect.left
            const sliderTop = sliderRect.top
            let newPosX = event.clientX - sliderLeft
            let newPosY = event.clientY - sliderTop

            if (newPosX < 0) newPosX = 0
            if (newPosX > width + _pointSize) newPosX = width + _pointSize

            if (newPosY < 0) newPosY = 0
            if (newPosY > height  + _pointSize) newPosY = height  + _pointSize
            const newValueX = Math.round(newPosX / stepLengthX * (1 / step)) / (1/step) + range.minValueX
            const newValueY = Math.round(newPosY / stepLengthY * (1 / step)) / (1/step) + range.minValueY         
            changeValue(newValueX, newValueY) 
        }
    }

    const handleClickArea = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsClick(true)
        if (sliderRef.current) {
            const sliderRect = sliderRef.current.getBoundingClientRect()
            const sliderLeft = sliderRect.left
            const sliderTop = sliderRect.top
            let newPosX = event.clientX - sliderLeft
            let newPosY = event.clientY - sliderTop

            if (newPosX < 0) newPosX = 0
            if (newPosX > width + _pointSize) newPosX = width + _pointSize

            if (newPosY < 0) newPosY = 0
            if (newPosY > height  + _pointSize) newPosY = height  + _pointSize
            const newValueX = Math.round(newPosX / stepLengthX * (1 / step)) / (1/step) + range.minValueX
            const newValueY = Math.round(newPosY / stepLengthY * (1 / step)) / (1/step) + range.minValueY         
            changeValue(newValueX, newValueY)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseDown = () => {
        setIsDragging(true)
    }

    const pointContainerStyles: CSSProperties = {
        width: `${_pointSize}px`,
        height: `${_pointSize}px`,
        left: `${pointPosX}px`,
        top: `${pointPosY}px`,
    }

    const areaStyles: CSSProperties = {
        width: `${width}px`,
        height: `${height}px`,
    }

    return (
        <div className={styles.sliderArea}
            style={areaStyles}
            ref={sliderRef}
            onClick={handleClickArea}
            >
            <div 
                ref={pointRef}
                className={joinStyles(styles.pointContainer, isClick && styles.pointContainerBorder)}
                style={pointContainerStyles}
                onMouseDown={handleMouseDown}
                onClick={() => setIsClick(true)}
                onBlur={() => setIsClick(false)}
            >
                <div
                    className={styles.point}
                    style={pointStyle}
                >
                    {valueX}, {valueY}
                </div>
            </div>
        </div>
    )
    
}

export {
    SliderArea
}