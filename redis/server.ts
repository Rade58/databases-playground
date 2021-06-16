import {promisify} from 'util'
import express from 'express'
import {createClient} from 'redis'

const client = createClient()

const rIncr = promisify(client.incr).bind(client)

// OVO JE EXP
const rSetex = promisify(client.setex).bind(client)

// KORISTIO BIH OVO OVAKO



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