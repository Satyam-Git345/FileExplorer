import React from "react";

const FileViewer = ({ file }) => {
  return (
    <div>
      <h3>Viewing File: {file.name}</h3>
      <p>Content of the file will be displayed here.</p>
    </div>
  );
};

export default FileViewer;
