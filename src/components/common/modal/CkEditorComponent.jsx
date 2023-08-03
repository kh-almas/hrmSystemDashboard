import React, { Fragment, useState } from "react";
import CKEditors from "react-ckeditor-component";

const CkEditorComponent = ({ label, fieldContent }) => {
  const [content, setContent] = useState(fieldContent);
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <label
              style={{ color: "#8990b6", fontSize: "16px" }}
              htmlFor="exampleFormControlSelect9"
            >
              {label}
            </label>
            <div className="card">
              <CKEditors
                activeclassName="p10"
                fontSize_defaultLabel = '44px'
                content={content}
                events={{
                  change: onChange,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default CkEditorComponent;
