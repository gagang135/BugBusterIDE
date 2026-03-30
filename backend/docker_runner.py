# docker_runner.py

import os
import re
import time
import tempfile
import docker
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("docker_runner")

client = docker.from_env()

LANGUAGE_ALIASES = {
    "py": "python",
    "python": "python",
    "c": "c",
    "cpp": "cpp",
    "cc": "cpp",
    "c++": "cpp",
    "cs": "csharp",
    "csharp": "csharp",
    "java": "java",
    "js": "node",
    "javascript": "node",
    "node": "node",
}

LANGUAGE_CONFIG = {
    "python": {
        "image": "bugbuster-python",
        "run": "python3 {file}"
    },
    "c": {
        "image": "bugbuster-c",
        "compile": "gcc {file} -O2 -o /code/a.out",
        "run": "/code/a.out"
    },
    "cpp": {
        "image": "bugbuster-cpp",
        "compile": "g++ {file} -O2 -o /code/a.out",
        "run": "/code/a.out"
    },
    "csharp": {
        "image": "bugbuster-csharp",
        "compile": (
            "rm -rf app && "
            "dotnet new console -n app --force --no-restore && "
            "mv {file} app/Program.cs && "
            "cd app && dotnet build -c Release --nologo"
        ),
        "run": "cd app/bin/Release/net7.0 && dotnet app.dll"
    },
    "java": {
        "image": "bugbuster-java",
        "compile": "javac /code/{basename}.java",
        "run": "java -cp /code {basename}"
    },
    "node": {
        "image": "bugbuster-node",
        "run": "node {file}"
    }
}


def run_in_docker(language: str, code: str, user_input: str = "", timeout=20):
    """Compile & run code inside Docker container. Return stdout/stderr/return_code."""

    language = LANGUAGE_ALIASES.get(language.lower().strip(), language)

    if language not in LANGUAGE_CONFIG:
        return {"return_code": 1, "stdout": "", "stderr": f"Unsupported language: {language}"}

    config = LANGUAGE_CONFIG[language]

    with tempfile.TemporaryDirectory() as tmpdir:

        ext_map = {
            "python": ".py",
            "c": ".c",
            "cpp": ".cpp",
            "csharp": ".cs",
            "java": ".java",
            "node": ".js"
        }

        file_ext = ext_map.get(language, ".txt")

        # Java requires class name detection
        if language == "java":
            match = re.search(r"public\s+class\s+(\w+)", code)
            basename = match.group(1) if match else "Main"
            filename = f"{basename}.java"
        else:
            basename = "main"
            filename = f"{basename}{file_ext}"

        file_path = os.path.join(tmpdir, filename)

        # Write code file
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(code)

        volumes = {tmpdir: {"bind": "/code", "mode": "rw"}}
        workdir = "/code"

        # -----------------------------
        # Step 1: Compile (if needed)
        # -----------------------------
        if "compile" in config:
            compile_cmd = config["compile"].format(
                file=f"/code/{filename}", basename=basename)

            compile_result = _exec(
                config["image"], compile_cmd, volumes, workdir, timeout=timeout
            )

            if compile_result["return_code"] != 0:
                return compile_result

        # -----------------------------
        # Step 2: Run program
        # -----------------------------
        run_cmd = config["run"].format(
            file=f"/code/{filename}", basename=basename)

        result = _exec(config["image"], run_cmd, volumes,
                       workdir, timeout=timeout, user_input=user_input)

        return result


def _exec(image, command, volumes, workdir, timeout=20, user_input=""):
    """Execute a single command inside the docker image."""

    try:
        # Ensure image exists locally
        try:
            client.images.get(image)
        except docker.errors.ImageNotFound:
            return {"return_code": 1, "stdout": "", "stderr": f"Image '{image}' not found"}

        container = client.containers.run(
            image=image,
            command=["bash", "-c", command],
            volumes=volumes,
            working_dir=workdir,
            stdin_open=True,
            stderr=True,
            stdout=True,
            detach=True,
            network_disabled=True,
            mem_limit="1g",
            cpu_shares=512,
            auto_remove=False
        )

        # Provide user input (if any)
        if user_input.strip():
            container.exec_run(cmd="bash", stdin=True, socket=True)

        # Wait for finish
        result = container.wait(timeout=timeout)
        exit_code = result.get("StatusCode", 1)

        # Allow logs to flush
        time.sleep(0.25)

        stdout = container.logs(stdout=True, stderr=False).decode(
            "utf-8", errors="ignore")
        stderr = container.logs(stdout=False, stderr=True).decode(
            "utf-8", errors="ignore")

        container.remove(force=True)

        return {
            "return_code": exit_code,
            "stdout": stdout.strip(),
            "stderr": stderr.strip()
        }

    except Exception as e:
        return {"return_code": 1, "stdout": "", "stderr": f"Docker exec error: {e}"}
