<div align=center>
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=230&section=header&text=DAMA%20다마&fontSize=42&fontColor=F8FAFC" />
</div>


<div align="center">

#### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Purple%20Heart.png" alt="Purple Heart" width="25" height="25" /> Tech

<img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-663399?style=for-the-badge&logo=css&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">

<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white">
<img src="https://img.shields.io/badge/Spring Data JPA-0078D4?style=for-the-badge&logo=&logoColor=white" />

<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=SpringSecurity&logoColor=white" />

<img src="https://img.shields.io/badge/JWT-6DB33F?style=for-the-badge&logo=JsonWebTokens&logoColor=white" />
<img src="https://img.shields.io/badge/H2 Database-09476B?style=for-the-badge&logo=H2&logoColor=black">

#### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Blue%20Heart.png" alt="Blue Heart" width="25" height="25" /> Tools
<img src="https://img.shields.io/badge/IntelliJ IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=black">
</div>

<br><br><br>


## 다마(DAMA)

친구들과의 추억을 보다 특별하게 간직하세요! 
다마(DAMA)는 친구들과의 공유 일기장을 작성하고,
실시간 채팅으로 여행지에서의 추억을 나눌 수 있는 서비스입니다.

<br>

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

<br>

## 데모

### 회원가입/로그인
![Image](https://github.com/user-attachments/assets/e00b5077-c622-4b6c-bf7a-43a7bcfcb03e)
### 친구추가
![Image](https://github.com/user-attachments/assets/9f557af0-8beb-4079-a867-637b4950cf5c)
### 채팅방 생성 / 채팅
![Image](https://github.com/user-attachments/assets/de3c8294-0d3b-4a4f-a17b-c464fc5ca3be)
### 아카이브 생성
![Image](https://github.com/user-attachments/assets/a9fd3fb1-0a00-48a9-a079-b231ac9df154)


<br>

## 주요기능

- JWT 인증 기반 로그인
- STOMP 기반 실시간 채팅
- Huggingface AI 모델 기반 채팅 요약
- 아카이브에 공유 일기 작성

> ### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Warning.png" alt="Warning" width="25" height="25" /> 주의 사항
> - AI 요약 기능은 **영문 대화만 지원** 합니다.

<br>

## 시스템 아키텍처
<img width="1412" height="931" alt="image" src="https://github.com/user-attachments/assets/d65b3cdc-771e-4a66-8e48-614f0f11a317" />


<br>



## 프로젝트 구조

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

<br>

## 개발환경

### Version

- Spring boot: 3.x

- Java: JDK 21

- React: 19.1.1

- H2 Database: 2.3.232

### 환경 설정
- IntelliJ에서 https://github.com/Kdoby/Chatting.git 레포지토리 복제 및 프로젝트로 열기
- IntelliJ > File > Settings > Build, Execution, Deployment > Build Tools > Gradle > Build and run using, Run tests using IntelliJ IDEA로 변경 후, build.gradle reload


      -- db --
      1. h2.bat 파일 실행 -> 
      2. jdbc:h2:~/Chatting 로 connect
      3. sql/init.sql 파일 ctrl+c, ctrl+v
  
      -- frontend --
      cd src/main/frontend
      npm install http-proxy-middleware --save
      npm install axios
      npm install react-router-dom
      npm i react-virtuoso
      -- run (#port:3000)  --
      npm start
    
      -- backend --
      1. src/main/resources/application.properties 파일에 아래 항목 추가 
          jwt.secret=[your_secret_key]
          file.path=uploads/
      2. http://localhost:3000/login -> SIGN-UP -> username=SYSTEM, PASSWORD=[your_password], nickname=system
         -> 임의의 시스템 유저 생성
      -- run (#port:8080) --
      IntelliJ에서 src/main/java/ChattingApplication 실행
      localhost:3000 새로고침
  

### 🔗 [FastAPI 서버(AI 서버) 환경 설정](https://github.com/Kdoby/Summarization_AI.git)
![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=Kdoby&repo=Summarization_AI)

<br>

## ERD
<img width="1287" height="723" alt="image" src="https://github.com/user-attachments/assets/e6159802-46cd-424a-9ed2-d62d33269962" />


<br>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="25" height="25" /> 팀원 소개

|                                  Frontend                                   |                                  Frontend                                   |                                    Backend                                    |
|:---------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|:-----------------------------------------------------------------------------:|
| <img src="https://avatars.githubusercontent.com/u/123297062?v=4" width=100> | <img src="https://avatars.githubusercontent.com/u/165632710?v=4" width=100> | <img src="https://avatars.githubusercontent.com/u/155566596?v=4" width = 100> |
|                                     김도담                                     |                                     안유민                                     |                                      권도연                                      |


<br>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png" alt="Love Letter" width="25" height="25" /> Acknowledgements
This Project refrences or uses code from the following open-source projects:

- <https://github.com/prgrms-web-devcourse/Team-DarkNight-Kkini-BE.git> - Licensed under the MIT License

