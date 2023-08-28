import React from "react";

const FilesComponent = () => {
  return (
    <div className="ps-3">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button className="btn btn-outline-secondary  p-2" type="button">
          <i className="fa fa-files-o "></i>
        </button>
        <button className="btn btn-outline-secondary p-2" type="button">
          <i className="fa fa-file-excel-o"></i>
        </button>
        <button className="btn btn-outline-secondary p-2" type="button">
          <i className="fa fa-file-text"></i>
        </button>
        <button className="btn btn-outline-secondary p-2" type="button">
          <i className="fa fa-file-pdf-o"></i>
        </button>
        <button className="btn btn-outline-secondary p-2" type="button">
          <i className="fa fa-print"></i>
        </button>
        <button className="btn btn-outline-secondary p-2" type="button">
          <i className="fa fa-columns "></i>
        </button>
      </div>
    </div>
  );
};

export default FilesComponent;
