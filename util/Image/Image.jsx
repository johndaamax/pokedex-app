import { useState, useEffect } from 'react'

const Image = ({ source, fallbackSrc = '/static/missing.png', ...props }) => {
    const [src, setSrc] = useState(source);
    const [error, setError] = useState(false);

    useEffect(() => {
        setSrc(source)
    }, [source])

    const onError = () => {
        if (!error) {
            setSrc(fallbackSrc);
            setError(true);
        }
    }

    return (
        <img
            src={src}
            onError={onError}
            {...props}
        />
    );
}

export default Image;