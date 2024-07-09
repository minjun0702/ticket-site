## 환경변수
+ env.example 파일의 이름을 .env로 변경하고 아래 내용을 채움
```

DB_HOST= localhost
DB_PORT=3306
DB_USERNAME= DB ID
DB_PASSWORD= DB PASSWARD
DB_NAME= DB Table name 
DB_SYNC=true
JWT_SECRET_KEY= JWT 생성을 위한 비밀 키
```

## 실행 방법 (with yarn)
+필요한 패키지 설치
```
npm
```

+서버 실행
```
npm run start
```

## API 명세서
<[https://thundering-philosophy-7ed.notion.site/Node-js-API-855059b2f0b043a097db5e9462a18de6?pvs=4](https://www.notion.so/81b7ac6e6354421f874f19be27b889a6?pvs=4)>

## ERD
<[https://drawsql.app/teams/team-3527/diagrams/skillproject](https://drawsql.app/teams/team-3527/diagrams/ticketsite)>


<br>
기본적인 기능(회원가입, 로그인, 프로필보기, 새공연등록(역할에 따라), 공연 목록 전체 조회, 카테고리별 조회, 공연 이름 검색, 공연상세보기)
공연 예매, 확인 기능 구현하지 못하였습니다.
