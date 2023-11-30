import React, { useState, useRef, useEffect } from 'react';

const DropdownTable4 = () => {
    const [show, setShow] = useState(false);
    const containerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target)
        ) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef}>
            <input
                onMouseDown={() => setShow(true)}
                type="text"
            />
            {show && (
                <div
                    style={{
                        width: '400px',
                        height: '700px',
                        backgroundColor: 'red',
                        position: 'absolute',
                    }}
                    onClick={() => setShow(true)}
                >
                    {/* Your content goes here */}
                </div>
            )}
        </div>
    );
};

export default DropdownTable4;
