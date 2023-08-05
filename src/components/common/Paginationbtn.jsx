import React from 'react';

const Paginationbtn = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <p style={{fontSize: "13px"}}>Showing page 1 of 1</p>
                <div className="d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-pill btn-outline-secondary btn-xs"
                        type="button"
                    >
                        <i
                            style={{fontSize: "24px"}}
                            className="icofont icofont-swoosh-left"
                        ></i>
                    </button>

                    <p
                        style={{fontSize: "13px"}}
                        className="p-1 px-2 btn-primary-gradien mt-3 mx-2 rounded text-light"
                    >
                        1
                    </p>
                    <button
                        className="btn btn-pill btn-outline-secondary btn-xs"
                        type="button"
                    >
                        <i
                            style={{fontSize: "24px"}}
                            className="icofont icofont-swoosh-right"
                        ></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Paginationbtn;