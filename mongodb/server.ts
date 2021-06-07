import express from 'express'
import {MongoClient} from 'mongodb'

const connectionString = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017";

async function init(){

  const client = new MongoClient(connectionString, {
    useUnifiedTopology: true
  });

  await client.connect()

  const app = express()

  // -------------------------------

  app.get('/get', async (req, res) => {

    console.log(req.query)

    const search = req.query.search;

    res.send({search})
  })


  // -------------------------------

  const PORT = process.env.PORT || 3000;

  app.use(express.static("./static"))

  app.listen(PORT)

  console.log(`running on http://localhost:${PORT}`)

}

init()