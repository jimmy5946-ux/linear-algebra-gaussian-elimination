from pathlib import Path
import subprocess

from flask import Flask, render_template, request


BASE_DIR = Path(__file__).resolve().parent
GAUSS_EXE = BASE_DIR / "gauss.exe"

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html", result=None, error=None)


@app.route("/solve", methods=["POST"])
def solve():
    input_data = request.form.get("matrix", "").strip()

    if not input_data:
        return render_template(
            "index.html",
            result=None,
            error="행렬 값을 입력한 뒤 계산해 주세요.",
        )

    if not GAUSS_EXE.exists():
        return render_template(
            "index.html",
            result=None,
            error="gauss.exe 파일을 찾을 수 없습니다.",
        ), 500

    result = subprocess.run(
        [str(GAUSS_EXE)],
        input=input_data + "\n",
        text=True,
        capture_output=True,
        cwd=BASE_DIR,
    )

    if result.returncode != 0:
        return render_template(
            "index.html",
            result=None,
            error=result.stderr or "계산 중 오류가 발생했습니다.",
        ), 500

    return render_template("index.html", result=result.stdout, error=None)


if __name__ == "__main__":
    app.run(debug=True)