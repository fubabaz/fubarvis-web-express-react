// server/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const { rows } = await db
    .query(`SELECT MB.BAEKJOON_ID 
                 , MB.GITHUB_ID
                 , MB.MEMBER_NM
                 , MB.IMAGE
                 , RS.LEV
                 , RS.RANKING
                 , RS.AC_RATING
                 , (SELECT COUNT(*) FROM POST_INFORMATION PI2 WHERE GITHUB_ID = MB.GITHUB_ID) AS POSTING_CNT
              FROM (
      SELECT *,
      ROW_NUMBER() OVER(PARTITION BY BAEKJOON_ID  ORDER BY BAEKJOON_ID, BASE_DT DESC) RN
       FROM RANKING_INFORMATION RI
      WHERE ACCOUNT_TYPE ='I'
       ORDER BY BASE_DT
      ) RS  INNER JOIN MEMBER MB
      ON RS.BAEKJOON_ID = MB.BAEKJOON_ID 
      AND MB.DEL_YN ='N'
      WHERE RN ='1'`);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;