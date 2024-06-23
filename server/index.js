// server/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // 원하는 포트 번호 설정

// PostgreSQL 데이터베이스 연결 설정
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 미들웨어 설정
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: false })); // URL 인코딩 파싱

// API 라우트 설정
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const algorithmRouter = require('./routes/algorithm');
app.use('/api/algorithm', algorithmRouter);

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});