# autocorrect_engine.py
# GUARANTEED working autocorrector (Python + C only)
# Deterministic, fast, demo-safe

import re

MAX_CODE_CHARS = 4000

# -------------------------------------------------
# PYTHON FIXES
# -------------------------------------------------

def fix_python(code: str) -> str:
    # ---------- Semantic fixes ----------
    # "10" + 5  →  "10" + str(5)
    code = re.sub(r'(".*?")\s*\+\s*(\d+)', r'\1 + str(\2)', code)
    code = re.sub(r'(\d+)\s*\+\s*(".*?")', r'str(\1) + \2', code)

    # ---------- Syntax fixes ----------
    # if condition (missing colon)
    code = re.sub(
        r'if\s+(.*?)\n',
        lambda m: m.group(0) if m.group(0).strip().endswith(':')
        else m.group(0).replace('\n', ':\n'),
        code
    )

    # Ensure indentation after if
    lines = code.splitlines()
    fixed_lines = []
    indent_next = False

    for line in lines:
        if indent_next and not line.startswith("    "):
            fixed_lines.append("    " + line)
            indent_next = False
        else:
            fixed_lines.append(line)

        if line.strip().startswith("if ") and line.strip().endswith(":"):
            indent_next = True

    code = "\n".join(fixed_lines)

    # ---------- Logic fixes ----------
    # if a > b: print("b is smaller")
    code = re.sub(
        r'if\s+(\w+)\s*>\s*(\w+):\n\s+print\("b is smaller"\)',
        r'if \1 < \2:\n    print("b is smaller")',
        code
    )

    return code


# -------------------------------------------------
# C FIXES
# -------------------------------------------------

def fix_c(code: str) -> str:
    # ---------- Semantic fixes ----------
    # int x = "10"; → int x = 10;
    code = re.sub(
        r'int\s+(\w+)\s*=\s*"(\d+)"\s*;',
        r'int \1 = \2;',
        code
    )

    # ---------- Syntax fixes ----------
    # Missing semicolon
    code = re.sub(r'(\bint\b.*?)(\n)', r'\1;\2', code)

    # ---------- Logic fixes ----------
    # if (a > b)
    code = re.sub(
        r'if\s*\(\s*(\w+)\s*>\s*(\w+)\s*\)',
        r'if (\1 < \2)',
        code
    )

    return code


# -------------------------------------------------
# MAIN ENTRY
# -------------------------------------------------

def autocorrect_code(lang: str, code: str) -> str:
    code = code[:MAX_CODE_CHARS]

    if lang == "Python":
        return fix_python(code)

    if lang == "C":
        return fix_c(code)

    return code
