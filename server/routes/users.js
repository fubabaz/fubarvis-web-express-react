
const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const path = require('path');

const getUsersQueryPath = path.join(__dirname, '../sql/get-users.sql');
const getTrophiesQueryPath = path.join(__dirname, '../sql/get-throphy.sql');

const loadQuery = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

const getUsersQuery = loadQuery(getUsersQueryPath);
const getTrophiesQuery = loadQuery(getTrophiesQueryPath);

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(loadQuery(getUsersQueryPath));

    fs.writeFile('../client/src/data/users.json', JSON.stringify(rows), 'utf8', (err) => {
      if (err) {
        console.error('users.json 파일 저장 중 오류 발생:', err);
        res.status(500).send('파일 저장 중 오류 발생');
        return;
      }
      console.log('users.json  파일에 JSON 데이터 저장 완료');
      res.status(200).json({
        success: true,
      });
    });

  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:githubId/trophies', async (req, res) => {
  const githubId = req.params.githubId;
  console.log(githubId)
  try {
   // const { rows } = await db.query(query, [githubId]);
    const { rows } = await db.query(loadQuery(getTrophiesQueryPath))
    fs.writeFile('../client/src/data/throphy.json', JSON.stringify(rows), 'utf8', (err) => {
      if (err) {
        console.error('파일 저장 중 오류 발생:', err);
        res.status(500).send('파일 저장 중 오류 발생');
        return;
      }
      console.log('result.json 파일에 JSON 데이터 저장 완료');
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