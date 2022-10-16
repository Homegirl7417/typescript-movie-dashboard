#  emoticbox-app-store
Typescript와 React를 활용해 만든 영화 서비스입니다.

영화 목록 조회, 수정, 삭제, 추가 및 검색 서비스를 제공합니다.


- '/'주소의 경우 '/login' 페이지로 자동으로 이동합니다.
- 영화 목록 페이지의 경우 1초 이후에 영화 정보가 보여집니다.
- 검색 페이지의 경우 검색어를 입력하고 검색 버튼을 누르면, 데이터가 담긴 표가 보입니다. Movie, Tv, Person에 따라 다른 데이터를 보여줍니다.
- env 환경 파일을 Root 경로에 만들어두는 세팅이 필요합니다.


<br/>

## 🚩 목차
- 설치 및 세팅
- 브랜치
- 개발 사양
- 기술 스택
- 폴더 구조

<br/>

## ⚙️ 설치 및 세팅
### 1. npm 설치
``` shell
$ npm install
```

### 2. Extension 설치
- ESLint
- Prettier - Code formatter
- Style Guide: Airbnb

### 3. Scripts
| 명령어  | 기능  |
|---|---|
| ```$ npm run start``` | 프로젝트 구동 |

### 4. 테스트 계정
- Email: tester@naver.com
- Password: tester123456@

<br/>

## 📷 스크린샷

<p align="center">
  <table>
    <tr>
      <th>로그인 페이지</th>
    </tr>
    <tr>
      <th>
        <img width="500" height="300" alt="login" src="https://user-images.githubusercontent.com/52736242/196026705-6c44ebb3-a316-4708-b530-dcf8f604a5d7.png">
      </th>
    </tr>    
  </table>
    <table>
    <tr>
      <th>영화 목록 페이지</th>
    </tr>
    <tr>
      <th>
        <img width="500" height="300" alt="movielist" src="https://user-images.githubusercontent.com/52736242/196026729-3a5e9b52-0b68-44c1-8d8a-ad3c1c6abc9b.png">
      </th>
    </tr>    
  </table>
</p>

## 🌲 브랜치
- [master](https://github.com/Homegirl7417/typescript-movie-dashboard)

<br/>

## 📚 개발 사양
- 디자인: PC 최적화
- 표준 브라우저: Chrome
- SPA: Client Side Rendering


<br/>

## ⚒ 기술 스택
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF"/>
<br/>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<br/>
<br/>

## 🗂 폴더 구조

``` shell
├── README.md
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── package.json
├── package-lock.json
├── public
└── src
    ├── assets
    ├── components
    ├── interfaces
    ├── pages
    ├── store