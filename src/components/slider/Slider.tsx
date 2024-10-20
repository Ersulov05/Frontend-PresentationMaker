import { CSSProperties, useEffect, useRef, useState } from 'react'
import styles from './Slider.module.css'
import { joinStyles } from '../../store/joinStyles'

type SliderProps = {
    orientation?: "horizontal" | "vertical"
    length: number
    size?: number
    range: {
        minValue: number
        maxValue: number
    }
    startValue?: number
    step?: number
    visibleValue?: "top" | "bottom" | "left" | "right"
    pointStyle?: CSSProperties
    stripStyle?: CSSProperties
    onGetValue?: (value: number) => void
}

const overflowHorizontal: number = 2

function Slider({
    length,
    size,
    range,
    startValue = range.minValue,
    step = 1,
    visibleValue,
    stripStyle,
    pointStyle,
    orientation,
    onGetValue,
}: SliderProps) {
    const [value, setValue] = useState<number>(startValue)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [isClick, setIsClick] = useState<boolean>(false)
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const pointRef = useRef<HTMLDivElement | null>(null)

    const pointSize: number = size || 10
    const stepLength: number = (length + overflowHorizontal * 2 - pointSize) / ((range.maxValue - range.minValue))
    const pointPos = (value - range.minValue) * stepLength - overflowHorizontal
    
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
    }, [isDragging, value, isClick])

    function changeValue(newValue: number) {
        newValue = Math.min(range.maxValue, Math.max(range.minValue, newValue))
        if (newValue === value) return
        setValue(newValue)
        if (onGetValue) {
            onGetValue(newValue)
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
        if (event.key === 'ArrowLeft') {
            changeValue(value - step)
        } else if (event.key === 'ArrowRight') {
            changeValue(value + step)
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        setIsClick(false)
        if (isDragging && sliderRef.current) {
            const sliderRect = sliderRef.current.getBoundingClientRect()
            const sliderLeft = sliderRect.left
            let newPos = event.clientX - sliderLeft

            if (newPos < 0) newPos = 0
            if (newPos > length + overflowHorizontal * 2 - pointSize) newPos = length + overflowHorizontal * 2 - pointSize

            const newValue = Math.round(newPos / stepLength * (1 / step)) / (1/step) + range.minValue           
            changeValue(newValue) 
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseDown = () => {
        setIsDragging(true)
    }

    const pointContainerStyles: CSSProperties = {
        width: `${pointSize}px`,
        height: `${pointSize}px`,
        left: `${pointPos}px`
    }

    const stripStyles: CSSProperties = {
        width: `${length}px`,
        height: `${pointSize/2}px`,
        borderRadius: `${pointSize/6}px`,
    }

    const containerStyles: CSSProperties = {
        height: `${pointSize}px`,
    }

    return (
        <div className={styles.sliderContainer}
            style={containerStyles}
            >
            <div
                className={styles.sliderStrip}
                style={stripStyles}
                ref={sliderRef}
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
                        {value}
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export {
    Slider
}