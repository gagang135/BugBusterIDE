import React from "react";

function RightPanel({ output, error, messages, theme }) {
  const bg = theme === "vs-dark" ? "#212529" : "#f9fafb";
  const text = theme === "vs-dark" ? "#f5f5f5" : "#111";
  const border = theme === "vs-dark" ? "#333" : "#ddd";

  // normalize error
  const errors =
    typeof error === "string"
      ? error
      : Array.isArray(error)
      ? error.join("\n")
      : "";

  // normalize output
  const finalOutput =
    output && typeof output === "string" && output.trim() !== ""
      ? output.trim()
      : errors
      ? "" // if error exists, don't show "No output yet"
      : "No output yet.";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: bg,
        color: text,
        borderLeft: `1px solid ${border}`,
      }}
    >
      {/* Output Section */}
      <div
        style={{
          flex: 1.2,
          borderBottom: `1px solid ${border}`,
          padding: "10px 12px",
          overflowY: "auto",
        }}
      >
        <h3
          style={{
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Output
        </h3>

        <div
          style={{
            padding: "6px 0",
            minHeight: "120px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontFamily: "monospace",
            fontSize: "13px",
            fontWeight:"bold"
          }}
        >
          {/* Always try to show error first if exists */}
          {typeof error !== "undefined" && errors !== "" && (
            <div
              style={{
                color: "red",
                marginBottom: "10px",
                whiteSpace: "pre-wrap",
                fontWeight:"bold"
              }}
            >
              {errors}
            </div>
          )}

          {/* then show output */}
          <div>{finalOutput}</div>
        </div>
      </div>

      {/* Messages Section */}
      {/*<!--div
        style={{
          flex: 0.8,
          padding: "10px 12px",
          overflowY: "auto",
        }}
      >
        <h3
          style={{
            marginBottom: "8px",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Messages
        </h3>

        {messages && messages.length > 0 ? (
          <ul style={{ paddingLeft: "16px" }}>
            {messages.map((msg, i) => (
              <li
                key={i}
                style={{
                  fontSize: "14px",
                  marginBottom: "6px",
                  lineHeight: 1.6,
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                }}
              >
                {typeof msg === "object" ? JSON.stringify(msg) : msg.toString()}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: "14px", color: "#888" }}>No messages.</p>
        )}
      </div>*/}
    </div>
  );
}

export default RightPanel;
