
## 다마(DAMA)

친구들과의 추억을 보다 특별하게 간직하세요! 
다마(DAMA)는 친구들과의 공유 일기장을 작성하고,
실시간 채팅으로 여행지에서의 추억을 나눌 수 있는 서비스입니다.

## 프로젝트 소개

다마(DAMA)는 추억을 담는다는 뜻으로, 
Spring boot / React / FastAPI 를 기반으로 개발된 
**실시간 채팅&공유 일기장** 프로젝트입니다.
여행중 친구들과 공유한 수많은 사진들을 나중에 다시 찾으려면 기억이 나지 않는 경우가 많습니다.
이를 해결하기 위해, 채팅방에서 공유된 이미지와 대화 기록을 기반으로 공유 일기장을 생성하여
추억을 아카이브에 담는 프로젝트를 기획하게 되었습니다.

- 그룹 채팅방 생성 -> 사진 및 메시지 공유
- 지정된 기간의 채팅 기록을 AI가 요약 -> 일기 작성에 도움
- 작성된 일기는 채팅방 내 모든 멤버가 확인 가능 -> 아카이브에 저장

이를 통해 소중한 추억을 흩어지지 않고 한 곳에서 관리할 수 있으며,
공유 일기를 통해 더욱 특별한 기록으로 남길 수 있습니다.

## 개발 언어 및 활용 기술

---
### Tech

<img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-663399?style=for-the-badge&logo=css&logoColor=white">

![대체 텍스트](https://camo.githubusercontent.com/ad933327ed241d88cd1c93f402e74d9a72cb26d2622316f048faa33633919b8f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e6720426f6f742d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d537072696e67426f6f74266c6f676f436f6c6f723d7768697465)
![대체 텍스트](https://camo.githubusercontent.com/1d5094482cf699e58b93efa1def19b9018bc9b2b30795f685d73bd8a7a28bc93/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e672044617461204a70612d3030373844343f7374796c653d666f722d7468652d6261646765266c6f676f3d266c6f676f436f6c6f723d7768697465)
![대체 텍스트](https://camo.githubusercontent.com/91b949fd3f5d3d60475d1ab8c382735f3df6b1cab5ab8ea105df0d2adbb96bb5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e672053656375726974792d364442333346203f7374796c653d666f722d7468652d6261646765266c6f676f3d537072696e675365637572697479266c6f676f436f6c6f723d7768697465)
![대체 텍스트](https://camo.githubusercontent.com/b71403892b54c3adbfe60201be51fa894007f3971c6cf1062e8109727f0133f9/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a57542d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d4a736f6e576562546f6b656e73266c6f676f436f6c6f723d7768697465)
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/H2 Database-09476B?style=for-the-badge&logo=H2 Database&logoColor=black">



### Tool
![대체 텍스트](https://camo.githubusercontent.com/b657d8051445da43d0e8b7f855ba02bde92bb80c7522bf4f0de45a2a6b92e6de/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f496e74656c6c694a20494445412d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d696e74656c6c696a49646561266c6f676f436f6c6f723d7768697465)

![대체 텍스트](https://camo.githubusercontent.com/5e7c1b08a7a0cb87520f88eabf60ba3c32ce5b7ddceed3808ac1c2dd1f37f3eb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769746875622d3138313731373f7374796c653d666f722d7468652d6261646765266c6f676f3d476974687562266c6f676f436f6c6f723d7768697465)
![대체 텍스트](https://camo.githubusercontent.com/a0e4503e87270c05c76e1b69e7f68169b8323e1096b0febbabf4a2d988827100/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f74696f6e2d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f74696f6e266c6f676f436f6c6f723d7768697465)
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=black">

## 주요기능

---

- JWT 인증 기반 로그인
- STOMP 기반 실시간 채팅
- Huggingface AI 모델 기반 채팅 요약
- 아카이브에 공유 일기 작성

### ⚠️주의 사항
- AI 요약 기능은 **영문 대화만 지원** 합니다.

## 프로젝트 구조
├── └── │

### Frontend
    frontend/
    ├─public/
    │    └─images
    └──src/
        ├─archive
        ├─chatting
        ├─component
        ├─login
        └─pages
### Backend

    Chatting/
    ├─ domain/
    │    ├─ai/
    │        ├─api
    │        ├─dto/
    │            ├─request
    │            └─response
    │        └──service
    │    ├─archive/
    │        ├─api
    │        ├─dto/
    │            ├─request
    │            └─response
    │        ├─exception
    │        ├─model
    │        ├─repository
    │        └─service
    │    ├─chat/
    │        ├─api
    │        ├─dto/
    │            ├─request
    │            └─response
    │        ├─exception
    │        ├─handler
    │        ├─model
    │        ├─repository
    │        └─service
    │    ├─friendship/
    │        ├─api
    │        ├─dto/
    │            ├─request
    │            └─response
    │        ├─exception
    │        ├─model
    │        ├─repository
    │        └─service
    │    └─member/
    │        ├─api
    │        ├─dto/
    │            ├─request
    │            └─response
    │        ├─exception
    │        ├─model
    │        ├─repository
    │        └─service
    └─global
        ├─auth/
            └─token/
                ├─api
                ├─dto/
                    ├─jwt/
                        ├─request
                        └─response
                ├─exception
                ├─filter
                └─service
        ├─base/
            ├─dto
            └─exception
        ├─config/
            ├─auth
            └─web
        └─util

## 개발환경

---

### Version

- Spring boot: 3.x

- Java: JDK 21

- React: 19.1.1

- H2 Database: 2.3.232

### 환경 설정
🔗[Spring boot starter](https://start.spring.io)

- Project: Groovy Project
- Language: Java
- Spring boot: 3.x.x
- Group: NotModified
- Artifact: Chatting
- Packaging: Jar
- java: 21
- Dependencies: Spring Web, Thymeleaf


- 파일 다운로드 및 압축 해제
- IntelliJ에서 해당 파일의 build.gradle 을 Open or import (Open as Project)


    git clone https://github.com/Kdoby/Chatting.git

    -- frontend --
    npm install http-proxy-middleware --save
    npm install axios
    npm install react-router-dom
    -- run (#port:3000)  --
    cd src/main/frontend
    npm start

    -- backend --
    ## application.properties 파일에 아래 항목 추가 
        jwt.secret={your_secret_key}
        file.path=uploads/
    -- run (#port:8080) --
    1. h2.bat 파일 실행 -> 
    2. jdbc:h2:~/Chatting 로 connect
    3. init.sql 파일 ctrl+c, ctrl+v
    4. IntelliJ에서 ChattingApplication 실행
  

### 🔗 [FastAPI 서버 환경 설정](https://github.com/Kdoby/Summarization_AI.git)

## ERD

---
![img_2.png](img_2.png)

## API 명세서

---

- [Member API](https://www.notion.so/Member-API-27a6a052f9e1807393aacceae4f18ebe?source=copy_link)

- [Friendship API](https://www.notion.so/Friendship-API-27a6a052f9e18063ada8c94c75640599?source=copy_link)

- [Chat API](https://www.notion.so/Chat-API-27a6a052f9e1805fa4d5dbf6d564c3df?source=copy_link)

- [Archive API](https://www.notion.so/Archive-API-27a6a052f9e1802d9382cc0aaa04df46?source=copy_link)

## 팀원 소개

---
|                                  Frontend                                   |                                  Frontend                                   |                                    Backend                                    |
|:---------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|:-----------------------------------------------------------------------------:|
| <img src="https://avatars.githubusercontent.com/u/123297062?v=4" width=100> | <img src="https://avatars.githubusercontent.com/u/165632710?v=4" width=100> | <img src="https://avatars.githubusercontent.com/u/155566596?v=4" width = 100> |
|                                     김도담                                     |                                     안유민                                     |                                      권도연                                      |


## Acknowledgements

---

This Project refrences or uses code from the following open-source projects:

- <https://github.com/prgrms-web-devcourse/Team-DarkNight-Kkini-BE.git> - Licensed under the MIT License

