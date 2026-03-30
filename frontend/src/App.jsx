import React, { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import EditorPanel from "./components/EditorPanel";
import RightPanel from "./components/RightPanel";
import logoDark from "./components/assets/logo-D.png";
import logoLight from "./components/assets/logo-L.png";

export default function App() {
  const [files, setFiles] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [autoCorrect, setAutoCorrect] = useState(false);

  // Store output, messages, and error
  const [output, setOutput] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(""); // <-- added

  const editorRef = useRef(null);

  const runCode = () => {
    if (editorRef.current && editorRef.current.runCode) {
      editorRef.current.runCode();
    } else {
      setOutput("⚠️ No file selected or editor not ready.");
      setMessages(["Please create a file and write code first."]);
      setError(""); // clear old errors
    }
  };

  const createNewFile = () => {
    const name = prompt("Enter file name (e.g., main.py or index.js)");
    if (!name) return;
    if (files.some((f) => f.name === name)) {
      alert("File already exists!");
      return;
    }
    const newFile = { id: Date.now(), name, content: "" };
    setFiles([...files, newFile]);
    setActiveId(newFile.id);
  };

  const updateFileContent = (id, newContent) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, content: newContent } : f))
    );
  };

  const deleteFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (id === activeId) setActiveId(null);
  };

  const activeFile = files.find((f) => f.id === activeId);

  const bgColor = theme === "vs-dark" ? "#111827" : "#f3f4f6";
  const textColor = theme === "vs-dark" ? "#fff" : "#000";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <TopBar
        autoCorrect={autoCorrect}
        setAutoCorrect={setAutoCorrect}
        theme={theme}
        setTheme={setTheme}
        runCode={runCode}
      />

      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          height: "100%",
        }}
      >
        <SideBar
          files={files}
          setFiles={setFiles}
          setActiveId={setActiveId}
          activeId={activeId}
          theme={theme}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* Editor Panel */}
          <div
            style={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {activeFile ? (
              <EditorPanel
                ref={editorRef}
                file={activeFile}
                updateContent={updateFileContent}
                autoCorrectToggle={autoCorrect}
                setOutput={setOutput}
                setMessages={setMessages}
                setError={setError}     // <-- added
                theme={theme}
              />
            ) : (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={theme === "vs-dark" ? logoDark : logoLight}
                  alt="Bugbuster logo"
                  style={{ width: "100px", height: "100px", marginBottom: "12px" }}
                />
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: theme === "vs-dark" ? "#e5e7eb" : "#111827",
                  }}
                >
                  Bugbuster
                </h2>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div
            style={{
              flex: 1.2,
              display: "flex",
              flexDirection: "column",
              borderLeft: `1px solid ${
                theme === "vs-dark" ? "#333" : "#ccc"
              }`,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <RightPanel
              output={output}
              error={error}         // <-- added
              messages={messages}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
