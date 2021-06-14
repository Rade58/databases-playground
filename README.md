# QUERYING WITH MATCH AND CONSTRAINT

SADA CEMO NAPRAVITI QUERY ZA SVIM RELATIONSHIP-OVIMA, KOJE SMO NAPRAVILI U PROSLOM BRANCH-U, PAST-UJUCI IN ONIH NEKOLIKO KLUZULA KOJIMA SMO KREIRALI RELATIONSHIPS

- `MATCH (p: Person)-[r: ACTED_IN]->(m: Movie) RETURN r;`

```zsh
+-----------------------------------------+
| r                                       |
+-----------------------------------------+
| [:ACTED_IN {roles: ["Scott Pilgrim"]}]  |
| [:ACTED_IN {roles: ["Scott Pilgrim"]}]  |
| [:ACTED_IN {roles: ["Stacey Pilgrim"]}] |
| [:ACTED_IN {roles: ["Envy Adams"]}]     |
| [:ACTED_IN {roles: ["Julie Powers"]}]   |
| [:ACTED_IN {roles: ["Ramona Flowers"]}] |
| [:ACTED_IN {roles: ["Wallace Wells"]}]  |
| [:ACTED_IN {roles: ["Lucas Lee"]}]      |
+-----------------------------------------+

8 rows available after 332 ms, consumed after another 32 ms
```


