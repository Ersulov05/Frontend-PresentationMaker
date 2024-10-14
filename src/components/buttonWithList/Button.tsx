import { CSSProperties, useEffect, useRef, useState } from "react"
import { joinStyles } from "../../store/joinStyles"
// import classNames from "classnames";
import styles from './Button.module.css'

export type ButtopProps = {
    onClick?: () => void
    value?: string
    className?: string
    style?: CSSProperties
    valueLocationHorizontal?: "center" | "left" | "right"
    valueLocationVertical?: "center" | "top" | "bottom"
    children?: React.ReactNode
    isClickToFix?: boolean
}

function Button({ 
    className = undefined, 
    style = {}, 
    value = "", 
    onClick, 
    valueLocationHorizontal = 'center', 
    valueLocationVertical = 'center',
    children,
    isClickToFix = false,
 }: ButtopProps) {
    const [viewChild, setViewChild] = useState(false)
    const [isChildVisible, setIsChildVisible] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonStyles: CSSProperties = {
        justifyContent: valueLocationHorizontal === 'left' ? 'flex-start' 
                        : valueLocationHorizontal === 'right' ? 'flex-end' 
                        : 'center',
        alignItems: valueLocationVertical === 'top' ? 'flex-start' 
                        : valueLocationVertical === 'bottom' ? 'flex-end' 
                        : 'center',
    }
    
    function handleMouseEnter() {
        setTimeout(() => {
            setViewChild(true)
        }, 50)
    }

    function handleMouseLeave(event: React.MouseEvent) {
        setTimeout(() => {
            if (
                !buttonRef.current?.contains(event.relatedTarget as Node) &&
                !containerRef.current?.contains(event.relatedTarget as Node)
            ) {
                setViewChild(false);
            }
        }, 50)
    }

    function handleClick() {
        if (isClickToFix) setIsChildVisible(prev => !prev)
        if (onClick) {
            onClick()
        }
    }

    function handleChildClick() {
        setIsChildVisible(false)
        setViewChild(false)
    }

    function handleClickOutside(event: MouseEvent) {
        if (
            buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
            containerRef.current && !containerRef.current.contains(event.target as Node)
        ) {
            setIsChildVisible(false);
            setViewChild(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container} >
            <div className={styles.buttonContainer} 
                
            >
                <div 
                    ref={buttonRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={joinStyles(className ? className : styles.buttonDefault, styles.button)} 
                    style={{ ...style, ...buttonStyles }} 
                    onClick={handleClick}
                    
                >
                    <div>
                        {value}
                    </div>
                </div>
            </div>
            {(viewChild || isChildVisible) && (
                <div 
                    className={styles.childContainer}
                    onClick={handleChildClick}
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    {children}
                </div>
            )}
        </div>        
    );
}

export {
    Button
}