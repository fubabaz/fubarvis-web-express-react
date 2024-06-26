const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res) => {
  try {
    const { rows } = await db
    .query(`WITH RANKEDDATA AS (
    SELECT
        PROB.PROB_NO,
        PROB.PROB_TITLE,
        PROB.ST_DT,
        PROB.SUBMITTER,
        SUBMIT.BAEKJOON_ID,
        PROB.PROB_TIER,
        ROW_NUMBER() OVER (PARTITION BY SUBMIT.PROB_NO ORDER BY MEMORY) AS MEMORYRANK,
        ROW_NUMBER() OVER (PARTITION BY SUBMIT.PROB_NO ORDER BY TIME) AS TIMERANK,
        ROW_NUMBER() OVER (PARTITION BY SUBMIT.PROB_NO ORDER BY CODE_LEN) AS CODELENRANK
    FROM
        PROBLEM_INFORMATION PROB
        LEFT JOIN SUBMISSION_INFORMATION SUBMIT 
        ON SUBMIT.PROB_NO = PROB.PROB_NO
)
, MINIDS AS (
    SELECT
        PROB_NO,
        PROB_TITLE,
        ST_DT,
        SUBMITTER,
        PROB_TIER,
        MIN(CASE WHEN MEMORYRANK = 1 THEN BAEKJOON_ID END) AS MIN_MEMORY_ID,
        MIN(CASE WHEN TIMERANK = 1 THEN BAEKJOON_ID END) AS MIN_TIME_ID,
        MIN(CASE WHEN CODELENRANK = 1 THEN BAEKJOON_ID END) AS MIN_CODE_LEN_ID
    FROM
        RANKEDDATA
    GROUP BY PROB_NO, PROB_TITLE, ST_DT, SUBMITTER, PROB_TIER
)
SELECT
    M.PROB_NO,
    M.PROB_TITLE,
    M.ST_DT,
    M.SUBMITTER,
    M.PROB_TIER,
    SUBMITTER_MEM.IMAGE AS SUBMITTER_IMAGE,
    M.MIN_MEMORY_ID,
    MEM1.IMAGE AS MIN_MEMORY_IMAGE,
    M.MIN_TIME_ID,
    MEM2.IMAGE AS MIN_TIME_IMAGE,
    M.MIN_CODE_LEN_ID,
    MEM3.IMAGE AS MIN_CODE_LEN_IMAGE
FROM
    MINIDS M
LEFT JOIN MEMBER SUBMITTER_MEM ON M.SUBMITTER = SUBMITTER_MEM.GITHUB_ID
LEFT JOIN MEMBER MEM1 ON M.MIN_MEMORY_ID = MEM1.BAEKJOON_ID
LEFT JOIN MEMBER MEM2 ON M.MIN_TIME_ID = MEM2.BAEKJOON_ID
LEFT JOIN MEMBER MEM3 ON M.MIN_CODE_LEN_ID = MEM3.BAEKJOON_ID
ORDER BY
    M.ST_DT DESC
`);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/individual', async (req, res) => {
    try {
      const query = `
      SELECT * FROM (
        SELECT BAEKJOON_ID,
                   SOL_PROB_CNT,
                   RANKING,
                   SUBSTRING(SPLIT_PART(LEV, ' ', 1),1,1)||CASE 
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'I' THEN '1'
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'II' THEN '2'
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'III' THEN '3'
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'IV' THEN '4'
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'V' THEN '5'
                   ELSE 'UNRATED'
               END AS TIER,
                 ROW_NUMBER() OVER(PARTITION BY BAEKJOON_ID ORDER BY BAEKJOON_ID, BASE_DT DESC) AS RN
          FROM RANKING_INFORMATION
          WHERE ACCOUNT_TYPE = 'I'
          ) INFO INNER JOIN MEMBER MB
          ON INFO.BAEKJOON_ID = MB.BAEKJOON_ID
          AND MB.DEL_YN ='N'
          WHERE INFO.RN = 1
          ORDER BY SOL_PROB_CNT DESC
      `;
      
      const { rows } = await db.query(query);
      res.json(rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;


module.exports = router;