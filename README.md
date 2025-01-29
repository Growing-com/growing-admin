## GRWOING( 그로잉 ) 어드민

- 최대한 업데이트 되는 내용들을 계속 작성한다.

## 실행

```
yarn
yarn dev
```

## 브렌치 전략

- develop
- master
- main

## 빌드

vercel에 현재 dev,prod 가 올라가 있는 상태이다.

- push 를 진행하게 되면 배포 진행하게 된다.

## env

vercel 의 환경변수로 저장되어 있는 상태

```
  NEXT_PUBLIC_ANNOUNCEMENT: 공지 사항 URL ( 노션 연결)
  NEXT_PUBLIC_OPEN_KAKAO: 오픈 카톡방 URL
  NEXT_PUBLIC_SENTRY_DSN: 현재 환경에 따른 접속 URL
  SENTRY_AUTH_TOKEN: senty token
```

## 파일 구성

- domain 기준으로 구분해 두었다
