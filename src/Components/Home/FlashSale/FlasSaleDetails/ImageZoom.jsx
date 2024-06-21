import { useState } from "react";


const ImageZoom = ({ src, alt }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    return (
        <div className="relative w-full h-full" onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <img className="w-full h-full object-cover" src={src} alt={alt} />
            {isZoomed && (
                <div className="absolute ml-20 inset-y-0 left-full w-96 h-96 bg-no-repeat z-10 border border-gray-300" style={{ backgroundImage: `url(${src})`, backgroundSize: '200%', backgroundPosition: backgroundPosition }}></div>
            )}
        </div>
    );
};

export default ImageZoom;
