# 가우스 소거법 계산기

Flask 웹 화면에서 연립방정식의 확대행렬을 입력하면, C로 작성된 `gauss.exe`를 실행해 가우스 소거법 계산 결과를 보여주는 프로그램입니다.

## 실행 환경

- Python 3.10 이상 권장
- Flask
- Windows 환경의 `gauss.exe`

## 설치 방법

프로젝트 폴더에서 아래 명령어를 실행합니다.

```powershell
pip install -r requirements.txt
```

## 실행 방법

```powershell
python app.py
```

또는 Flask 명령어로 실행할 수 있습니다.

```powershell
python -m flask --app app run
```

실행 후 브라우저에서 아래 주소로 접속합니다.

```text
http://127.0.0.1:5000/
```

## 사용 방법

1. 미지수 개수를 입력합니다.
2. `입력칸 만들기` 버튼을 눌러 행렬 입력칸을 생성합니다.
3. 계수와 상수항을 입력합니다.
4. `계산` 버튼을 누르면 결과가 화면 아래에 표시됩니다.

예를 들어 아래 연립방정식은 다음과 같이 입력할 수 있습니다.

```text
2x + y - z = 8
-3x - y + 2z = -11
-2x + y + 2z = -3
```

결과는 다음과 같습니다.

```text
x1 = 2.00
x2 = 3.00
x3 = -1.00
```

## 파일 구조

```text
.
├── app.py                # Flask 서버, gauss.exe 실행 담당
├── gauss.c               # 가우스 소거법 C 소스 코드
├── gauss.exe             # gauss.c를 컴파일한 실행 파일
├── requirements.txt      # Python 패키지 목록
├── static/
│   ├── script.js         # 행렬 입력칸 생성 및 form 데이터 변환
│   └── style.css         # 화면 스타일
└── templates/
    └── index.html        # 웹 화면
```

## 계산 구조

브라우저가 직접 `gauss.exe`를 실행하지는 않습니다. 입력값은 Flask 서버로 전송되고, `app.py`가 `gauss.exe`를 실행한 뒤 결과를 다시 화면에 표시합니다.

```text
HTML 입력 화면 -> Flask /solve -> gauss.exe 실행 -> 계산 결과 반환 -> HTML에 출력
```

## gauss.exe 다시 만들기

`gauss.c`를 수정한 경우 MinGW gcc가 설치되어 있다면 아래 명령어로 다시 컴파일할 수 있습니다.

```powershell
gcc gauss.c -o gauss.exe
```

## 주의 사항

- `gauss.exe`는 `app.py`와 같은 폴더에 있어야 합니다.
- HTML 파일을 직접 더블클릭해서 열면 화면 일부는 보일 수 있지만 계산은 동작하지 않습니다.
- 계산까지 사용하려면 반드시 Flask 서버를 실행한 뒤 `http://127.0.0.1:5000/`으로 접속해야 합니다.