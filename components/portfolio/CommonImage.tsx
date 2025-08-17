'use client'
import React, { useState } from "react";

const CommonImage = (props: any) => {
    const [error, setError] = useState(false);
    return (
        <img
            {...props}
            className={`shadow-md ${props.className || ""}`}
            loading="lazy"
            src={error ? "/nature.jpeg" : (props.src || "/nature.jpeg")}
            onError={() => {setError(true);}}
        />
    )
}
export default CommonImage;