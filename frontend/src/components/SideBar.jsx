import React from "react";
import { FiFilePlus, FiX } from "react-icons/fi";
import {
  SiPython,
  SiJavascript,
  SiC,
  SiCplusplus,
  SiCsharp,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

function SideBar({ files, setFiles, setActiveId, activeId, theme }) {
  const languageIcons = {
    py: <SiPython size={18} />,
    python: <SiPython size={18} />,
    js: <SiJavascript size={18} />,
    javascript: <SiJavascript size={18} />,
    c: <SiC size={18} />,
    cpp: <SiCplusplus size={18} />,
    cs: <SiCsharp size={18} />, // C# icon added
    java: <FaJava size={18} />,
   };

  const handleAddFile = () => {
    const name = prompt("Enter file name (e.g., index.js):");
    if (!name) return;
    if (files.some((f) => f.name === name)) {
      alert("File already exists!");
      return;
    }
    const newFile = { id: Date.now(), name, content: "" };
    setFiles([...files, newFile]);
    setActiveId(newFile.id);
  };

  const handleDeleteFile = (id) => {
    setFiles(files.filter((f) => f.id !== id));
    if (id === activeId) setActiveId(null);
  };

  const getIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    return languageIcons[ext] || <FiFilePlus size={16} />;
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100%",
        backgroundColor: theme === "vs-dark" ? "#252526" : "#f3f4f6",
        color: theme === "vs-dark" ? "#fff" : "#000",
        borderRight: `1px solid ${theme === "vs-dark" ? "#333" : "#ddd"}`,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          fontWeight: "bold",
          borderBottom: `1px solid ${theme === "vs-dark" ? "#333" : "#ccc"}`,
        }}
      >
        <span>EXPLORER</span>
        <button
          onClick={handleAddFile}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <FiFilePlus color={theme === "vs-dark" ? "#fff" : "#000"} />
        </button>
      </div>

      {/* File list */}
      <ul style={{ listStyle: "none", padding: "8px", margin: 0 }}>
        {files.length === 0 ? (
          <li
            style={{
              opacity: 0.6,
              textAlign: "center",
              fontSize: "12px",
              padding: "10px 0",
            }}
          >
            No files yet
          </li>
        ) : (
          files.map((file) => (
            <li
              key={file.id}
              onClick={() => setActiveId(file.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px",
                borderRadius: "6px",
                backgroundColor:
                  file.id === activeId
                    ? theme === "vs-dark"
                      ? "#3a3d41"
                      : "#e5e7eb"
                    : "transparent",
                cursor: "pointer",
                marginBottom: "4px",
                transition: "background-color 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {getIcon(file.name)}
                <span>{file.name}</span>
              </div>
              <FiX
                size={14}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.id);
                }}
                color="#f87171"
                style={{ cursor: "pointer" }}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default SideBar;
