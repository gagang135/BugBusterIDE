# autocorrect_lang.py
# Language detection & support control

def detect_language(filename: str) -> str:
    ext = filename.split(".")[-1].lower()
    if ext == "py":
        return "Python"
    if ext == "c":
        return "C"
    return "Unsupported"


def is_supported(lang: str) -> bool:
    return lang in ("Python", "C")
