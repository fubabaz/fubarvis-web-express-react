const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res) => {
  try {
    const { rows } = await db
    .query(`SELECT * FROM 
PROBLEM_INFORMATION PROB LEFT JOIN MEMBER MB 
ON PROB.SUBMITTER  = MB.GITHUB_ID 
ORDER BY ST_DT DESC`);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;