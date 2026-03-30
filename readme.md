# 🐞 BugBuster IDE – AI-Powered Smart Debugging Environment

BugBuster IDE is an AI-powered multi-language Integrated Development Environment that detects, analyzes, and automatically corrects programming errors in real time using transformer-based Large Language Models and static code analysis techniques. It improves developer productivity by reducing debugging time and ensuring secure execution through Docker containerization.

---

# 📌 Project Overview

Debugging software manually is time-consuming and error-prone. BugBuster IDE automates the debugging lifecycle by integrating:

* Syntax error detection
* Semantic error detection
* Logical error detection
* AI-based auto-correction
* Multi-language execution support
* Secure Docker-based runtime environment

The system uses a React frontend, FastAPI backend, and DeepSeek-Coder transformer model to provide intelligent debugging assistance.

---

# ✨ Features

## Core Features

* Multi-language code support
* Automatic syntax error detection
* Semantic and logical bug detection
* AI-based code correction
* Toggle-based AutoCorrect mode
* Secure containerized execution
* Execution output visualization
* Modular architecture for scalability

## Advanced Features

* AST-based program analysis
* Spectrum-Based Fault Localization (SBFL)
* Transformer-based patch generation
* Regression test validation
* Behavioral similarity verification
* Overfitting patch detection
* Docker sandbox execution

---

# 🏗️ System Architecture

BugBuster IDE follows a three-phase Automated Program Repair workflow:

Localization Phase → Repair Phase → Verification Phase → Deployment

### 1. Localization Phase

Identifies fault-prone regions using:

* Lexer and Parser
* Abstract Syntax Tree (AST)
* Spectrum-Based Fault Localization
* Program slicing
* Dynamic execution tracing

### 2. Repair Phase

Generates candidate patches using:

* DeepSeek-Coder transformer model
* Template-based repair
* Mutation-based repair
* Neural Machine Translation (Buggy → Corrected Code)

### 3. Verification Phase

Validates patch correctness through:

* Regression testing
* Behavioral similarity checks
* Dynamic invariant detection
* ML-based overfitting detection

---

# ⚙️ Execution Workflow

BugBuster operates using a toggle-based pipeline.

## AutoCorrect Mode ON

Frontend
↓
FastAPI AutoCorrect Service
↓
DeepSeek-Coder Model
↓
FastAPI Execution Service
↓
Docker Runtime Execution
↓
Output + Logs + Patch Suggestions

## AutoCorrect Mode OFF

Frontend
↓
FastAPI Execution Service
↓
Docker Runtime Execution
↓
Program Output

---

# 🧩 Project Modules

### Input Module

Accepts source code written in:

* C
* C++
* Java
* Python
* JavaScript
* C#

Validates structure before processing.

---

### Preprocessing Module

Performs:

* Tokenization
* Comment removal
* Code formatting cleanup
* Structural segmentation

---

### Syntax Error Detection Module

Detects:

* Missing semicolons
* Invalid keywords
* Unmatched brackets
* Python indentation errors

---

### Semantic Error Detection Module

Identifies:

* Undeclared variables
* Type mismatches
* Incorrect function calls
* Scope violations

---

### Logical Error Detection Module

Analyzes:

* Loop conditions
* Control-flow structures
* Variable usage patterns
* Execution logic inconsistencies

---

### Reporting Module

Displays:

* Error type
* Line number
* Suggested corrections
* Execution output

---

# 🤖 AI Model Used

## DeepSeek-Coder (1.3B)

Capabilities include:

* Code completion
* Bug fixing
* Patch generation
* Logical correction suggestions
* Multi-language understanding

Supports long-context reasoning for project-level debugging tasks.

---

# 🐳 Docker Integration

BugBuster executes programs inside isolated Docker containers to ensure:

* Secure execution
* Environment consistency
* Protection from malicious code
* Reproducible builds

Execution pipeline:

Compile → Run Tests → Collect Logs → Return Output

---

# 💻 Technology Stack

## Frontend

* React.js
* TypeScript
* Monaco Editor

## Backend

* FastAPI
* Python

## AI Layer

* DeepSeek-Coder Transformer Model
* Machine Learning classifiers

## Static Analysis

* AST Parsing
* SBFL Fault Localization
* Program Slicing

## Execution Engine

* Docker

---

# 🌐 Supported Languages

Currently supported:

* C
* C++
* Java
* Python
* JavaScript
* C#

Architecture supports easy extension for additional languages.

---

# 📦 Installation Guide

## Step 1: Clone Repository

git clone https://github.com/yourusername/bugbuster-ide.git

cd bugbuster-ide

---

## Step 2: Backend Setup

cd backend

pip install -r requirements.txt

Run server:

uvicorn main:app --reload

---

## Step 3: Frontend Setup

cd frontend

npm install

npm start

---

## Step 4: Docker Setup

Ensure Docker is installed:

docker --version

Start container services:

docker compose up

---

# 📂 Project Structure

BugBuster-IDE/

├── frontend/
│ ├── components/
│ ├── editor/
│ └── ui/

├── backend/
│ ├── autocorrect/
│ ├── execution/
│ ├── parser/
│ └── api/

├── docker/

├── models/

├── tests/

└── README.md

---

# 🧪 Testing Strategy

BugBuster uses:

### Unit Testing

Tests individual FastAPI endpoints

### Integration Testing

Validates:

Frontend → Backend → Model → Docker → Output

### Regression Testing

Ensures patches do not introduce new errors

### Security Testing

Includes:

* container escape prevention
* input injection testing
* secrets protection checks

---

# 📊 Performance Metrics

| Metric                           | Result          |
| -------------------------------- | --------------- |
| Syntax Detection Accuracy        | 80–85%          |
| Avg Processing Time (100 lines)  | 1.5 minutes     |
| Avg Processing Time (200+ lines) | 2.5–3.5 minutes |
| Resource Usage                   | Low             |
| Scalability                      | High            |

---

# 🔮 Future Enhancements

Planned improvements include:

* Real-time collaborative editing
* Advanced semantic analysis
* Multi-file debugging support
* Git integration
* Cloud deployment support
* Plugin ecosystem support

---

# 👨‍💻 Contributors

Department of Computer Science and Engineering
Government Engineering College, Chamarajanagara
 A M Chethan
 Gagan G
 Somesh N M
 Thejesh kumar T L
