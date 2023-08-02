import React, { Fragment, useState } from 'react';
import CKEditors from "react-ckeditor-component";

const CkEditorComponent = ({label, fieldContent}) => {
    const [content,setContent] = useState('content')
    const onChange = (evt) => {
        const newContent = evt.editor.getData();
        setContent(newContent)
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <label className="text-muted" htmlFor="exampleFormControlSelect9">{label}</label>
                        <div className="card">
                            <CKEditors
                                activeclassName="p10"
                                content={fieldContent}
                                events={{
                                    "change": onChange
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default CkEditorComponent;