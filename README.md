## 

#### 프로젝트 세팅하기

클론 후 
```
yarn install 혹은 npm run build
```

### 개발모드 : webpack 개발서버 핫 리로딩
```
yarn serve 혹은 npm run serve
```

### production 모드를 위해 빌드 : Compile and minify
```
yarn build 혹은 npm run build
```
# Wishpool - frontend

SPA구조의 Vue.js프레임워크를 만들고, 이를 Azure storage의 정적 웹사이트와 Azure CDN을 이용하여 호스팅하는 프로젝트입니다.

## Getting Started

로컬 환경에서 프로젝트개발서버로 실행하기.

### Prerequisites

node: v12.1.0
vue-cli : v3

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
SPA는 build하면 compiled and minified되어 배포할 수 있는 dist폴더가 생성됨.
dist폴더 전체를 호스팅하고, 유저가 접속하는 default화면은 index.html임.

```
#for prouction
yarn build 혹은 npm run build
```
Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
