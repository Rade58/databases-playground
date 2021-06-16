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

SIMULIRACU USTVARI NEKI EXPENSSIVE QUERY


```ts
import {promisify} from 'util'
import express from 'express'
import {createClient} from 'redis'

const client = createClient()

const rIncr = promisify(client.incr).bind(client)
const rGet = promisify(client.get).bind(client)

// OVO JE EXP
const rSetex = promisify(client.setex).bind(client)

// KORISTIO BIH OVO OVAKO
// KLJUC JE key, ttl JE TITME TO EXOIRATION, SLOW FUNCTION KOJU CIJI REZULTAT SE CACJHE-UJE 
function cache(key: string, ttl: number, slowFn: (...props: any) => Promise<any>){

  return async function cachedFn(...props: any[]) {
    const cachedResponse = await rGet(key)

    // AKO SMO RANIJE PODESILI KLJUC, I AKO NIJE EXPIRED
    // RETURN-OVACEMO VREDNOST

    if(cachedResponse){
      return cachedResponse
    }

    // AKO NISMO PRONASLI U REDISU NISTA, ZNACI DA JE EXPIRED
    // I OPT POKRECEMO SPORU EXPENSIVE FUNKCIJU
    const result = await slowFn(...props);

    // I OPET KESIRAMO, U REDIS, I POSTAVLJAMO EXPPIRATION TIME

    await rSetex(key, ttl, result);

    // RETURN-UJEMO REZULTAT
    return result
  }

}



// SIMULIRAMO EXPENSIVE QUERY
// EXPENSIVE QUERY, CIJI CU REZULTAT CACHE-OVATI
// OVA FUNKCIJA, ODNOSNO NJEN REZULTAT CE SE KESIRATI
async function verySlowExpensivePostgresSQLquery(){
  // OVDE BI RADIO BIG UGLY QUERY

  console.log("Oh no, very expenssive query")

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res(new Date().toUTCString())
    }, 10000)
  })


  return promise


}


// MOZEMO SADA DA NAPRAVIMO CACHED FUNCTION, ODNOSNO
// GORNJU FUNKCIJU PASS-UJEMO U CACHING FUNKCIJU
// OBEZBEDJUJEMO key NARAVNO A I TTL
// CACHE CE TRAJATI 10 SEKUNDI
const cachedFn = cache("expensive_call:rade", 10, verySlowExpensivePostgresSQLquery)




function init(){
  const app = express()

  app.get('/pageview', async (req, res) => {

    const views = await rIncr("pageviews")

    res.json({status: "ok", views}).end()
  })

  // NAPRAVICEMO NOVI ROURE
  app.get('/get', async (req, res) => {

    // EVO OVDE KORISTIMO cachedFn

    const data = await cachedFn()

    res.status(200).send({data})

  })


  const PORT = 3000;

  app.use(express.static('./static'))
  app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`)
  })

}

init()
```

OVO MOZES I TESTIRATI