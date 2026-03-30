from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from docker_runner import run_in_docker
from autocorrector import router as autocorrect_router

# 🔽 NEW imports (IMPORTANT)
from autocorrect_lang import detect_language as ac_detect_language, is_supported
from autocorrect_engine import autocorrect_code

app = FastAPI(title="BugBuster IDE")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach autocorrect router (/autocorrect)
app.include_router(autocorrect_router)

# ---------------- MODELS ----------------
class RunRequest(BaseModel):
    filename: str
    code: str
    auto_correct: bool = False
    user_input: str = ""

# ---------------- HELPERS ----------------
def detect_language(filename: str) -> str:
    ext = filename.split(".")[-1].lower()
    mapping = {
        "py": "python",
        "c": "c",
        "cpp": "cpp",
        "cc": "cpp",
        "cxx": "cpp",
        "cs": "csharp",
        "java": "java",
        "js": "javascript",
        "jsx": "javascript",
    }
    return mapping.get(ext, "python")


def clean_error(err: str):
    if not err:
        return ""
    lines = [line.strip() for line in err.strip().split("\n") if line.strip()]
    return lines[-1] if lines else ""

# ---------------- RUN ENDPOINT ----------------
@app.post("/run")
async def run_code(req: RunRequest):
    language = detect_language(req.filename)

    corrected_code = req.code

    # ✅ BACKEND AUTOCORRECT HAPPENS HERE
    if req.auto_correct:
        ac_lang = ac_detect_language(req.filename)
        if is_supported(ac_lang):
            corrected_code = autocorrect_code(ac_lang, req.code)

    result = run_in_docker(language, corrected_code, req.user_input)

    return JSONResponse({
        "success": result.get("return_code") == 0,
        "corrected_code": corrected_code,
        "output": result.get("stdout") or "",
        "error": clean_error(result.get("stderr") or ""),
        "messages": []
    })
