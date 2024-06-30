const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const path = require('path');

const problemsSqlPath = path.join(__dirname, '../sql/get-problems.sql');

const loadQuery = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

const problemsSql = loadQuery(problemsSqlPath);

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(problemsSql);
    fs.writeFile('../client/src/data/problems.json', JSON.stringify(rows), 'utf8', (err) => {
      if (err) {
        console.error('problems.json 파일 저장 중 오류 발생:', err);
        res.status(500).send('파일 저장 중 오류 발생');
        return;
      }
      console.log('problems.json  파일에 JSON 데이터 저장 완료');
      res.status(200).json({
        success: true,
      });
    });

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
                   PROBLEMS,
                   CASE WHEN UPPER(LEV) !='UNRATED' THEN (SUBSTRING(SPLIT_PART(LEV, ' ', 1),1,1)||CASE 
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'I' THEN '1'
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'II' THEN '2'
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'III' THEN '3'
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'IV' THEN '4'
                   WHEN  SPLIT_PART(LEV, ' ', 2) = 'V' THEN '5'               
               END) ELSE UPPER(LEV)  END AS TIER,
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