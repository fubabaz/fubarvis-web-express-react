const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const path = require('path');

const problemsSqlPath = path.join(__dirname, '../sql/get-problems.sql');
const problemsIndividualInfoSqlPath = path.join(__dirname, '../sql/get-problems-individual-info.sql');

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
    const { rows } = await db.query(loadQuery(problemsIndividualInfoSqlPath))
    fs.writeFile('../client/src/data/problems-individual-info.json', JSON.stringify(rows), 'utf8', (err) => {
      if (err) {
        console.error('파일 저장 중 오류 발생:', err);
        res.status(500).send('파일 저장 중 오류 발생');
        return;
      }
      console.log('problems-individual-info.json 파일에 JSON 데이터 저장 완료');
      res.status(200).json({
        success: true,
      });
    });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;