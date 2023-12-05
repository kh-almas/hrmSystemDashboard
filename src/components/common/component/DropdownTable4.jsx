import React, { useState, useRef, useEffect } from 'react';

const SelectProductInCreateProductForm = () => {
    const [show, setShow] = useState(false);
    const containerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = (item) => {
        console.log(`Button clicked with item: ${item}`);
        setShow(false);
    };

    const handleInputClick = () => {
        if (!show) {
            setShow(true);
        }
    };

    return (
        <div ref={containerRef}>
            <input
                onClick={handleInputClick}
                type="text"
                placeholder="Click me"
            />
            {show && (
                <div
                    style={{
                        width: '200px',
                        height: '200px',
                        backgroundColor: 'red',
                        position: 'absolute',
                    }}
                >
                    <button onClick={() => handleButtonClick('Button 1')}>Button 1</button>
                    <button onClick={() => handleButtonClick('Button 2')}>Button 2</button>
                    <button onClick={() => handleButtonClick('Button 3')}>Button 3</button>
                </div>
            )}
        </div>
    );
};

export default SelectProductInCreateProductForm;
