import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

const EditorPanel = forwardRef(
  (
    {
      file,
      updateContent,
      autoCorrectToggle,
      setOutput,
      setMessages,
      setError, // <-- added
      theme,
    },
    ref
  ) => {
    const editorRef = useRef(null);
    const decorationsRef = useRef([]);

    const getLanguage = (filename) => {
      const ext = filename?.split(".").pop();
      switch (ext) {
        case "py":
          return "python";
        case "js":
          return "javascript";
        case "java":
          return "java";
        case "c":
          return "c";
        case "cpp":
          return "cpp";
        case "cs":
          return "csharp";
        default:
          return "plaintext";
      }
    };

    const clearHighlights = () => {
      if (!editorRef.current) return;
      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        []
      );
    };

    const applyHighlights = (issues) => {
      if (!editorRef.current || !issues || issues.length === 0) return;

      const decorations = issues.map((issue) => ({
        range: new monaco.Range(issue.line, 1, issue.line, 1),
        options: {
          isWholeLine: true,
          className: "yellow-line-highlight",
          glyphMarginClassName: "yellow-gutter-warning",
          hoverMessage: { value: `${issue.type.toUpperCase()}: ${issue.msg}` },
        },
      }));

      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        decorations
      );
    };

    useImperativeHandle(ref, () => ({
      runCode: async () => {
        if (!file) return;

        let code = editorRef.current.getValue();

        // clear UI before run
        setOutput("Running...");
        setMessages(["Running code..."]);
        setError(""); // <-- clear old errors
        clearHighlights();

        // --------------------------------------------------
        // 1. AUTOCORRECT ONLY IF TOGGLE IS ON
        // --------------------------------------------------
        if (autoCorrectToggle) {
          try {
            const res = await fetch("http://localhost:8000/autocorrect", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                filename: file.name,
                code,
                auto_correct: true,
              }),
            });

            const data = await res.json();

            if (data.corrected_code) {
              editorRef.current.setValue(data.corrected_code);
              updateContent(file.id, data.corrected_code);
              code = data.corrected_code;
            }

            if (data.issues) applyHighlights(data.issues);

            setMessages(data.messages || ["Autocorrect complete."]);
          } catch (err) {
            setMessages(["Autocorrect failed: " + err.message]);
          }
        }

        // --------------------------------------------------
        // 2. RUN CODE (ALWAYS)
        // --------------------------------------------------
        try {
          const runRes = await fetch("http://localhost:8000/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename: file.name,
              code,
              auto_correct: autoCorrectToggle,
            }),
          });

          const result = await runRes.json();

          // store output, messages, and error
          setOutput(result.output || "");
          setMessages(result.messages || []);
          setError(result.error || ""); // <-- THIS FIXES YOUR UI

        } catch (err) {
          setOutput("");
          setMessages(["Run failed: " + err.message]);
          setError(err.message);
        }
      },
    }));

    return (
      <Editor
        key={file.id}
        height="100%"
        width="100%"
        theme={theme}
        language={getLanguage(file.name)}
        value={file.content}
        onMount={(e) => (editorRef.current = e)}
        onChange={(value) => updateContent(file.id, value ?? "")}
        options={{
          automaticLayout: true,
          fontSize: 14,
          minimap: { enabled: false },
          glyphMargin: true,
          scrollBeyondLastLine: false,
        }}
      />
    );
  }
);

export default EditorPanel;
