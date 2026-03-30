import React from "react";
import { FiPlay } from "react-icons/fi";
import logo from "./assets/logo.jpg";

function TopBar({ autoCorrect, setAutoCorrect, theme, setTheme, runCode }) {
  const isLight = theme === "light";

  const toggleStyle = (enabled) => ({
    width: "50px",
    height: "24px",
    backgroundColor: enabled ? "#16a34a" : "#6b7280",
    borderRadius: "20px",
    cursor: "pointer",
    position: "relative",
    transition: "background-color 0.3s ease",
  });

  const knobStyle = (enabled) => ({
    width: "20px",
    height: "20px",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    left: enabled ? "26px" : "2px",
    transition: "left 0.3s ease",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isLight ? "#e5e7eb" : "#1f2937",
        padding: "18px 24px",
        borderBottom: "1px solid " + (isLight ? "#d1d5db" : "#333"),
        color: isLight ? "#000" : "#fff",
        fontSize: "15px",
      }}
    >
      {/* Logo and Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "48px", height: "48px", borderRadius: "10px" }}
        />
        <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>BugBuster IDE</h1>
      </div>

      {/* AutoCorrect Toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "17px", // increased font size
          fontWeight: "500",
        }}
      >
        <span>AutoCorrect</span>
        <div
          onClick={() => setAutoCorrect(!autoCorrect)}
          style={toggleStyle(autoCorrect)}
        >
          <div style={knobStyle(autoCorrect)} />
        </div>
      </div>

      {/* Theme Selector */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "17px", // increased font size
          fontWeight: "500",
        }}
      >
        <span>Theme</span>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #555",
            backgroundColor: isLight ? "#fff" : "#374151",
            color: isLight ? "#000" : "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      {/* Run Button */}
      <button
        onClick={runCode}
        style={{
          padding: "12px 22px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#16a34a",
          color: "white",
          fontSize: "17px", // increased button text size
        }}
      >
        <FiPlay size={20} /> Run
      </button>
    </div>
  );
}

export default TopBar;
