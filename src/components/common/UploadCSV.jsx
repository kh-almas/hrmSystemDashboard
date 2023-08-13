import React from 'react';
import Input from "./modal/Input";

const UploadCsv = () => {
    return (
        <div className="pt-5">
            <div className="card p-4">
                <div className="d-flex justify-content-between">
                    <h3>Upload Customer or Supplier Via CSV</h3>
                    <div>
                        <a className="btn btn-pill btn-primary btn-air-primary" type="button" download>
                            <i className="fa fa-download me-1"></i>
                            Download
                        </a>
                    </div>
                </div>
                <div>
                    <Input
                        inputName={"csv"}
                        inputType={"file"}
                    />
                    <p>PLEASE DOWNLOAD THE SAMPLE FILE INPUT YOUR DESIRE INFORMATION THEN UPLOAD. DONT TRY TO UPLOAD DIFFERENT FILE FORMAT AND INFORMATION. PLEASE DONT TRY TO EDIT ANY GIVEN HEADER..</p>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-pill btn-primary btn-air-primary"> <i className="fa fa-check"></i> Upload CSV</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadCsv;