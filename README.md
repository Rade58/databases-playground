# Neo4j

<https://neo4j.com/>

POKRENUCEMO INSTANCU OVOG DATBASE-A INSIDE A DOCKER CONTAINER

- `docker run -dit --rm --name=my-neo4j -p 7474:7474 -p 7687:7687 --env=NEO4J_AUTH=none neo4j:4.1.3`

7474 JE PORT ZA BROWSER INTERFACE, A 7687 JE PORT ZA READING I WRITING TO DATBASE

NE KORISTIMO AUTH JER SE SAMO IGRAM OSA DATBASE-OM NA NASEM LOKALNOM KOMPJUTERU

- `docker ps`

```zsh
CONTAINER ID   IMAGE         COMMAND                  CREATED              STATUS              PORTS                                                                                            NAMES
4a3348638e95   neo4j:4.1.3   "/sbin/tini -g -- /d…"   About a minute ago   Up About a minute   0.0.0.0:7474->7474/tcp, :::7474->7474/tcp, 7473/tcp, 0.0.0.0:7687->7687/tcp, :::7687->7687/tcp   my-neo4j
```

DA SADA UDJEMO U CLI DATBASE-A, ODNOSNO U OVOM SLUCAJU MI KORISTIME NESTO STO SE ZOVE cypher-shell

- `docker exec -it my-neo4j cypher-shell`

QUERY LANGUAGE FOR Neo4j SE ZOVE `CYPHER LANGUAGE`

NE KORISTI SE NIGDE NEGO SAM OOZA Neo4j
