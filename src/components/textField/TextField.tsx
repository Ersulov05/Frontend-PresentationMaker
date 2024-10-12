import { CSSProperties, useState } from "react";
import { joinStyles } from "../../store/joinStyles";
import _style from "./TextField.module.css"

type TextFieldProps = {
    className?: string;
    style?: CSSProperties;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
};

function TextField({ className = "", style = {}, value="", placeholder = "", onChange }: TextFieldProps) {
    const [inputValue, setInputValue] = useState(value);
    function onChangeHandler(value: string)
    {
        setInputValue(value)
        if (onChange) {
            onChange(value); // Вызываем обработчик с новым значением
        }
    }
    return (
        <input 
            type="text" 
            className={joinStyles(className, _style.input)} 
            style={style} 
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => onChangeHandler(e.target.value)}
        />
    );
}

export {
    TextField
}