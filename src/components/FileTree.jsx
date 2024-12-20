import React from "react";
import { FaFile, FaFolder } from "react-icons/fa";

const FileTree = ({ fileSystem, onFileClick }) => {
  const renderFileTree = (node) => {
    if (node.type === "file") {
      return (
        <div onClick={() => onFileClick(node)} key={node.id}>
          <FaFile />
          {node.name}
        </div>
      );
    }

    return (
      <div key={node.id}>
        <FaFolder />
        {node.name}
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((child) => renderFileTree(child))}
        </div>
      </div>
    );
  };

  return <div>{renderFileTree(fileSystem)}</div>;
};

export default FileTree;
