
import {promisify} from 'util'
import express from 'express'
import {createClient} from 'redis'

const client = createClient()

const rIncr = promisify(client.incr).bind(client)

function init(){
  const app = express()

  app.get('/pageview', async (req, res) => {

    // pageviews CE BITI KEY FROM REDIS
    const views = await rIncr("pageviews")

    res.json({status: "ok", views}).end()
  })

  const PORT = 3000;

  app.use(express.static('./static'))
  app.listen(() => {
    console.log(`application on http://localhost:${PORT}`)
  })

}

init()