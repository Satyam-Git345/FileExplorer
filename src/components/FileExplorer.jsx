import React, { useState } from "react";
import FileTree from "./FileTree";
import FileViewer from "./FileViewer";
import FileOperations from "./FileOperations";
import fileSystemData from "../data.json";

const FileExplorer = () => {
  const [fileSystem, setFileSystem] = useState(fileSystemData);
  const [currentFile, setCurrentFile] = useState(null);

  
  const handleFileClick = (file) => {
    if (file.type === "file") {
      setCurrentFile(file);
    }
  };

  
  const addFolder = (parentId, folderName) => {
    const newFileSystem = { ...fileSystem };
    const parentFolder = findFolderById(newFileSystem, parentId);
    parentFolder.children.push({
      id: Date.now().toString(),
      name: folderName,
      type: "folder",
      children: []
    });
    setFileSystem(newFileSystem);
  };

  
  const deleteFile = (id) => {
    const newFileSystem = { ...fileSystem };
    deleteFileById(newFileSystem, id);
    setFileSystem(newFileSystem);
  };

  
  const deleteFileById = (fileSystem, id) => {
    for (let i = 0; i < fileSystem.children.length; i++) {
      if (fileSystem.children[i].id === id) {
        fileSystem.children.splice(i, 1); 
        return;
      } else if (fileSystem.children[i].type === "folder") {
        deleteFileById(fileSystem.children[i], id); 
      }
    }
  };

  const renameFile = (id, newName) => {
    if (!newName.trim()) return; 
    const newFileSystem = { ...fileSystem };
    renameFileById(newFileSystem, id, newName);
    setFileSystem(newFileSystem);
  };

  
  const renameFileById = (fileSystem, id, newName) => {
    for (let i = 0; i < fileSystem.children.length; i++) {
      if (fileSystem.children[i].id === id) {
        fileSystem.children[i].name = newName; 
        return;
      } else if (fileSystem.children[i].type === "folder") {
        renameFileById(fileSystem.children[i], id, newName); 
      }
    }
  };

  return (
    <div className="file-explorer">
      <div className="file-tree">
        <FileTree fileSystem={fileSystem} onFileClick={handleFileClick} />
      </div>
      <div className="file-content">
        {currentFile ? (
          <FileViewer file={currentFile} />
        ) : (
          <p>Select a file to view</p>
        )}
        <FileOperations
          addFolder={addFolder}
          deleteFile={deleteFile}
          renameFile={renameFile}
        />
      </div>
    </div>
  );
};

export default FileExplorer;
