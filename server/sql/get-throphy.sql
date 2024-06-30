SELECT PROB.PROB_NO
       , PROB.PROB_TITLE
       , TROPHY_TYPE
       , BAEKJOON_ID, COUNT(*)
   FROM ( SELECT PROB_NO
        ,'Memory' AS TROPHY_TYPE
                            ,  BAEKJOON_ID
                            ,  ROW_NUMBER() OVER(PARTITION  BY PROB_NO  ORDER BY PROB_NO, MEMORY ) RN
                     FROM SUBMISSION_INFORMATION
                     UNION ALL
                      SELECT PROB_NO
                       ,'Time' AS TROPHY_TYPE
                              ,  BAEKJOON_ID
                            ,  ROW_NUMBER() OVER(PARTITION  BY PROB_NO  ORDER BY PROB_NO, TIME ) RN
                     FROM SUBMISSION_INFORMATION
                     UNION ALL
                     SELECT PROB_NO
                      ,'Short Code' AS TROPHY_TYPE
                            ,  BAEKJOON_ID
                            ,  ROW_NUMBER() OVER(PARTITION  BY PROB_NO  ORDER BY PROB_NO, CODE_LEN ) RN
                     FROM SUBMISSION_INFORMATION
    ) TROPHY INNER JOIN PROBLEM_INFORMATION  PROB
    ON TROPHY.PROB_NO = PROB.PROB_NO
    AND TROPHY.RN = 1
   /* AND TROPHY.BAEKJOON_ID = $1 */
    GROUP BY PROB.PROB_NO, TROPHY_TYPE, BAEKJOON_ID