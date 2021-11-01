import { useState, useEffect } from 'react'
import Image from 'next/image'

const ImageOpt = ({ source, fallbackSrc = '/static/missing.png', width, height, ...props }) => {
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
        <Image
            src={src}
            onError={onError}
            width={width}
            height={height}
            {...props}
        />
    );
}

export default ImageOpt;