# 🚀 Cloud Infrastructure Project - Platform Team (Week 1)

이 문서는 플랫폼 팀의 **제어 노드(Control Node) 구축** 및 **서비스 자동화** 실습을 위한 가이드라인입니다. 아래 순서대로 환경을 구축해 주시면 됩니다.

## 1. 제어 노드(Control Node) 환경 및 의존성
앤서블 명령을 내리기 위해 본인의 컴퓨터에 아래 프로그램들이 설치되어 있어야 합니다.

*   **OS:** Windows 11 WSL2 (Ubuntu 22.04 LTS 권장)
*   **Python:** v3.10 이상
*   **Ansible:** v2.16 이상
*   **Docker Desktop:** 설치 후 WSL2 연동 설정 필수

### 📦 필수 패키지 설치 명령어
WSL 터미널에서 다음 명령어를 순서대로 실행하세요.
```bash
sudo apt update
sudo apt install software-properties-common -y
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible -y
```

---

## 2. 파일 구조 (Repository Structure)
공유해드린 폴더의 구조는 다음과 같습니다.
```text
.
├── hosts.ini            # 앤서블 인벤토리 (대상 서버 주소록)
├── install_docker.yml   # 도커 자동 설치 플레이북
├── web_setup.yml        # Nginx 웹 서버 세팅 플레이북
└── mini-app/            # 미니 웹서버 소스 코드 폴더
    ├── app.js           # 웹 서버 코드
    └── Dockerfile       # 도커라이징 레시피
```

---

## 3. 실행 및 테스트 순서

### Step 1: 앤서블 교신 확인 (Ping Test)
앤서블이 타겟 서버(로컬)와 정상적으로 대화하는지 확인합니다.
```bash
ansible my_computer -i hosts.ini -m ping
```

### Step 2: 도커 자동 설치 (Playbook Run)
순정 리눅스 서버를 도커 엔진이 깔린 서버로 자동 변신시킵니다. (비밀번호 입력 필수; WSL 설치시 입력했던 비밀번호)
```bash
ansible-playbook -i hosts.ini install_docker.yml -K
```

### Step 3: 도커라이징 및 실행 (App Deployment)
미니 웹서버를 컨테이너 이미지로 빌드하고 실행합니다.
```bash
# 폴더 이동
cd mini-app

# 도커 이미지 빌드
docker build -t my-mini-app .

# 컨테이너 실행 (8080 포트 개방)
docker run -d -p 8080:8080 my-mini-app:latest
```

---

## 4. 최종 결과 확인
1.  **CLI 확인:** `curl http://localhost:8080` 실행 시 메시지 출력 확인
2.  **Browser 확인:** 주소창에 `localhost:8080` 입력 후 웹 페이지 확인

---

## 💡 주의사항
*   **탭 문자(Tab) 금지:** 모든 `.yml` 파일은 탭 대신 **스페이스바 2칸**으로 들여쓰기 해야 합니다. (이맥스 사용 시 `untabify` 필수!)
*   **비밀번호 요청:** `-K` 옵션 사용 시 본인의 WSL 비밀번호를 입력하면 됩니다.