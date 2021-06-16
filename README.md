# REDIS AND NODEJS APP

- `mkdir redis`

PREKOPIRAO SAM `package.json`, A HTML FILE I SERVER FILE CU NAPRAVITI BY MYSELF 

INSTALIRAM [SLEDECE](https://www.npmjs.com/package/redis) (OVO JE COMUNITY DRIVER (A POSTOJI IH NEKOLIKO)):

- `cd redis`

- `yarn add redis@3.0.2 @types/redis`

- `code redis/server.ts`

```ts
import {promisify} from 'util'
import express from 'express'
import {createClient} from 'redis'

const client = createClient()

const rIncr = promisify(client.incr).bind(client)
// DA ZI ZELEO DA KORISTIS NA PRIMER SET ILI GET
const rGet = promisify(client.get).bind(client)
// NAMA GET I SET NE TREBAJU SADA

function init(){
  const app = express()

  app.get('/pageview', async (req, res) => {

    // pageviews CE BITI KEY FROM REDIS
    const views = await rIncr("pageviews")

    // DAKLE RADICE SE ONAJ INCREMENTING, O KOJEM SMO UCILI

    res.json({status: "ok", views}).end()
  })

  const PORT = 3000;

  app.use(express.static('./static'))
  app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`)
  })

}

init()
```

U OVOM SLUCAJU SVAKI PUT KADA SE RELOAD-UJE, ILI REVISIT-UJES PAGE BICE INCREMENTED KER `pageviews`

A TO CES MOCI DA VIDIS NA PAGE-U, JER SMO U [HTML-U](redis/static/index.html) NAPRAVILI FETCHING I INSERTING REULTATA INTO h1 ELEMENT

- `cd redis`

- `yarn start`

# REDIS IN COMBINATION WITH POSTGRES

OVDE NECU KORISTITI REDIS, ALI CU POKAZATI KAKO BI TEKAO CACHING REZULTATA, NEKOG EXPENSIVE I SPOROG QUERY-JA

