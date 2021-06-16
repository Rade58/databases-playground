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

    if(cachedResponse){
      return cachedResponse
    }

    const result = await slowFn(...props);

    await rSetex(key, ttl, result);

     
  }

}


// EXPENSIVE QUERY, CIJI CU REZULTAT CACHE-OVATI
async function verySlowExpensivePostgresSQLquery(){

}


function init(){
  const app = express()

  app.get('/pageview', async (req, res) => {

    const views = await rIncr("pageviews")

    res.json({status: "ok", views}).end()
  })

  const PORT = 3000;

  app.use(express.static('./static'))
  app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`)
  })

}

init()