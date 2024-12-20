import React, { useState } from "react";

const FileOperations = ({ addFolder, deleteFile, renameFile }) => {
  const [folderName, setFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");

  const handleAddFolder = () => {
    if (folderName.trim()) {
      addFolder("root", folderName); // Adding to the root for simplicity
      setFolderName("");
    }
  };

  const handleDeleteFile = (id) => {
    deleteFile(id);
  };

  const handleRenameFile = (id) => {
    renameFile(id, newFileName);
    setNewFileName(""); // Reset the input after renaming
  };

  return (
    <div>
      {/* Add Folder */}
      <div>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder name"
        />
        <button onClick={handleAddFolder}>Add Folder</button>
      </div>

      {/* Rename File */}
      <div>
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          placeholder="New file/folder name"
        />
        <button onClick={() => handleRenameFile("1", newFileName)}>Rename</button>
      </div>

      {/* Delete File */}
      <div>
        <button onClick={() => handleDeleteFile("2")}>Delete File</button>
      </div>
    </div>
  );
};

export default FileOperations;
