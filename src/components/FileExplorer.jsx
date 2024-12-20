import React, { useState } from "react";
import FileTree from "./FileTree";
import FileViewer from "./FileViewer";
import FileOperations from "./FileOperations";
import fileSystemData from "../data.json";

const FileExplorer = () => {
  const [fileSystem, setFileSystem] = useState(fileSystemData);
  const [currentFile, setCurrentFile] = useState(null);

  // Handle file click (to view the file content)
  const handleFileClick = (file) => {
    if (file.type === "file") {
      setCurrentFile(file);
    }
  };

  // Add a new folder under a specified parentId
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

  // Delete a file or folder by ID
  const deleteFile = (id) => {
    const newFileSystem = { ...fileSystem };
    deleteFileById(newFileSystem, id);
    setFileSystem(newFileSystem);
  };

  // Helper function to recursively delete a file/folder by ID
  const deleteFileById = (fileSystem, id) => {
    for (let i = 0; i < fileSystem.children.length; i++) {
      if (fileSystem.children[i].id === id) {
        fileSystem.children.splice(i, 1); // Delete the item
        return;
      } else if (fileSystem.children[i].type === "folder") {
        deleteFileById(fileSystem.children[i], id); // Recursive deletion
      }
    }
  };

  // Rename a file/folder by its ID
  const renameFile = (id, newName) => {
    if (!newName.trim()) return; // Validation for empty names
    const newFileSystem = { ...fileSystem };
    renameFileById(newFileSystem, id, newName);
    setFileSystem(newFileSystem);
  };

  // Helper function to recursively rename a file/folder by ID
  const renameFileById = (fileSystem, id, newName) => {
    for (let i = 0; i < fileSystem.children.length; i++) {
      if (fileSystem.children[i].id === id) {
        fileSystem.children[i].name = newName; // Rename the item
        return;
      } else if (fileSystem.children[i].type === "folder") {
        renameFileById(fileSystem.children[i], id, newName); // Recursive rename
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
