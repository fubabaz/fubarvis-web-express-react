// server/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const { rows } = await db
    .query(`SELECT 
      M.BAEKJOON_ID,
      M.GITHUB_ID,
      M.MEMBER_NM,
      M.IMAGE,
      R.LEV,
      R.RANKING,
      R.AC_RATING,
      T.TROPHY_CNT,
      (SELECT COUNT(*) 
      FROM POST_INFORMATION PI 
      WHERE PI.GITHUB_ID = M.GITHUB_ID) AS POSTING_CNT
FROM (
    SELECT *,
           ROW_NUMBER() OVER(PARTITION BY BAEKJOON_ID ORDER BY BAEKJOON_ID, BASE_DT DESC) AS RN
    FROM RANKING_INFORMATION
    WHERE ACCOUNT_TYPE = 'I'
) R
INNER JOIN MEMBER M ON R.BAEKJOON_ID = M.BAEKJOON_ID 
                    AND M.DEL_YN = 'N'
                    AND R.RN = 1
LEFT JOIN (
    SELECT BAEKJOON_ID, COUNT(*) AS TROPHY_CNT
    FROM (
        SELECT PROB_NO, BAEKJOON_ID, ROW_NUMBER() OVER(PARTITION BY PROB_NO ORDER BY MEMORY) AS RN
        FROM SUBMISSION_INFORMATION
        UNION ALL
        SELECT PROB_NO, BAEKJOON_ID, ROW_NUMBER() OVER(PARTITION BY PROB_NO ORDER BY TIME) AS RN
        FROM SUBMISSION_INFORMATION
        UNION ALL
        SELECT PROB_NO, BAEKJOON_ID, ROW_NUMBER() OVER(PARTITION BY PROB_NO ORDER BY CODE_LEN) AS RN
        FROM SUBMISSION_INFORMATION
    ) S
    WHERE S.RN = 1
    GROUP BY BAEKJOON_ID
) T ON R.BAEKJOON_ID = T.BAEKJOON_ID`);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;