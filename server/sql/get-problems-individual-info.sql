SELECT * FROM (
        SELECT BAEKJOON_ID,
                   SOL_PROB_CNT,
                   RANKING,
                   PROBLEMS,
                   BRONZE_CNT,
                   SILVER_CNT,
                   GOLD_CNT,
                   PLATINUM_CNT,
                   DIAMOND_CNT,
                   RUBY_CNT,
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