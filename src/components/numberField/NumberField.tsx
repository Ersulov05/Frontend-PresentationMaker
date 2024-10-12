import { CSSProperties, useEffect, useState } from "react";
import { joinStyles } from "../../store/joinStyles";
import _style from "./NumberField.module.css"

type NumberFieldProps = {
    className?: string
    style?: CSSProperties
    value?: string
    placeholder?: string
    isFloat?: boolean
    limit?: {
        minValue: number 
        maxValue: number
    }
    onChange?: (value: number) => void
};

function NumberField({ className = "", style = {}, value="", placeholder = "", isFloat = false, limit, onChange }: NumberFieldProps) {
    const [inputValue, setInputValue] = useState(value);
    useEffect(() => {
        setInputValue(value);
    }, [value]);
    function onChangeHandler(value: string)
    {
        const validValue = isFloat ? /^-?\d*(\.\d*)?$/ : /^-?\d*$/;

        if (validValue.test(value) || value === "") {
            setInputValue(value)
        }

        if (validValue.test(value)) {
            const numericValue: number = isFloat 
                ? parseFloat(value) 
                : parseInt(value, 10);

            const isLimit: boolean = limit !== undefined
                ? limit.minValue <= numericValue && numericValue <= limit.maxValue
                : true

            if (onChange && isLimit) {
                onChange(numericValue)
            }
        }
    }

    function onBlurHandler(_value: string)
    {
        const validValue = isFloat ? /^-?\d*(\.\d*)?$/ : /^-?\d*$/;

        if (validValue.test(_value) || _value === "") {
            if (_value === "") {
                if (limit === undefined) {
                    setInputValue(value)
                } else {
                    setInputValue(limit.minValue.toString())
                    if (onChange) {
                        onChange(limit.minValue)
                    }
                }
            } else {
                let numericValue: number = isFloat 
                    ? parseFloat(_value) 
                    : parseInt(_value, 10);
                numericValue = (limit !== undefined)
                    ? Math.max(limit.minValue, Math.min(limit.maxValue, numericValue))
                    : numericValue
                setInputValue(numericValue.toString())
                if (onChange) {
                    onChange(numericValue)
                }
            }
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
            onBlur={(e) => onBlurHandler(e.target.value)}
        />
    );
}

export {
    NumberField
}