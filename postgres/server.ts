import express from 'express'

// POSTGRES PRAVI VISE KONEKCIJA KOJE MOZW DA REUSE-UJE
// ZATO KORISTIMO POOL
import {Pool} from 'pg'

// schism JE ONO STO SAM PODESIO KAO SECRET
// A AKO SE SECAS DATBASE NAM SE ZOVE message_boards
const pool = new Pool({
  connectionString: "postgresql://postgres:schism@localhost:5432/message_boards"
})


function init() {

  const app = express();

  app.get("/find", async (req, res) => {

    // PRVO CEMO SE KONEKTOVATI, STO RADIMO U SAMMOM HANDLERU
    const client = await pool.connect()

    const search = req.query.search as string;

    // MMOZEMO DAKLE SADA RUNN-OVATI QUERY
    // A ZNAMO DA JE SA FRONTENDA POSLAT board_id


  })

  const PORT = process.env.PORT || 3000;
  app.use(express.static("./static"))
  app.listen(PORT);

  console.log(`running on http://localhost:${PORT}`)
}

init();