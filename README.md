# Wishpool - frontend

SPA구조의 Vue.js프레임워크를 만들고, 이를 Azure storage의 정적 웹사이트와 Azure CDN을 이용하여 호스팅하는 프로젝트입니다.

## Getting Started

로컬 환경에서 프로젝트개발서버로 실행하기.

### Prerequisites

* node: v12.1.0
* vue-cli : v3

```
# 1. Node.js설치 (브라우저에서)
# 2. vue-cli설치
npm i -g @vue/cli
```

### Installing

해당 프로젝트 fork한 후, dependency 설치

```
cd Wishpool_front
npm install
```
Webpack 개발서버 실행(핫 리로딩)

```
#for development
yarn serve 혹은 npm run serve
```
브라우저로 ```localhost:8080```접속하면 로그인화면 뜬다.

## Deployment

### Build
SPA는 build하면 compiled and minified되어 배포할 수 있는 dist폴더가 생성된다.
이 dist폴더 전체를 호스팅하고, 유저가 접속하는 default화면은 index.html이다.

```
#for prouction
yarn build 혹은 npm run build
```
### Deploy to Azure Storage
* VS Code extension 중 Azure Storage 검색 후 설치한다.
* 빌드 된 ```dist```폴더위에 마우스 우클릭 - ```Deploy to Static Website```
* 스토리지 계정 선택 혹은 새 계정 생성 후 선택(새 스토리지 생성시 정적 웹 사이트 설정해야함)
* 기존 ```$web``` 컨테이너에 이미 배포된 것이 있다면, ```Delete and Deploy```
* 배포가 끝나면 우측하단 알림창에 ```browse website``` 클릭하면 배포된 것을 확인할 수있따.

