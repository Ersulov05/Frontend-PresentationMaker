import { CSSProperties } from "react"
import { joinStyles } from "../../store/utils/joinStyles"
import styles from './fileInput.module.css'

export type FileInputProps = {
    id: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    style?: CSSProperties
}

function FileInput({ 
    id,
    className, 
    style = {},
    onChange, 
}: FileInputProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event)
        }
        event.target.value = ''
    }

    return (
        <input
            id={id}
            style={style}
            className={joinStyles(styles.input, className)}
            onChange={handleChange} 
            type='file'
        />      
    );
}

export {
    FileInput
}