import { useState, useEffect, useRef } from 'react'

const CustomInput = ({ placeholder, searchPoke, ...props }) => {

    const [value, setValue] = useState('');
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            searchPoke(value);
        }, 1200);
    }, [value]);

    const handleChange = e => {
        const inputValue = e.target.value.toLowerCase();
        setValue(inputValue)
    }

    return (
        <input type='text' placeholder={placeholder} onChange={handleChange} value={value} {...props} />
    )


}

export default CustomInput