# autocorrector.py
# FastAPI endpoint for autocorrection

import time
from fastapi import APIRouter
from autocorrect_lang import detect_language, is_supported
from autocorrect_engine import autocorrect_code

router = APIRouter()

@router.post("/autocorrect")
async def autocorrect(payload: dict):
    """
    {
      "auto_correct": true,
      "filename": "test.py",
      "code": "..."
    }
    """

    code = payload.get("code", "")
    filename = payload.get("filename", "")
    auto = payload.get("auto_correct", False)

    lang = detect_language(filename)

    # 🔒 HARD SKIP
    if not auto or not is_supported(lang):
        return {
            "status": "skipped",
            "language": lang,
            "corrected_code": code
        }

    start = time.time()
    fixed = autocorrect_code(lang, code)

    return {
        "status": "ok",
        "language": lang,
        "corrected_code": fixed,
        "time": f"{round(time.time() - start, 2)}s"
    }
