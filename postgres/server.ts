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
    // AKO NE ISKORITI STARU KONEKCIJU NAPRAVICE NOVU
    const client = await pool.connect()

    const search = req.query.search as string;

    // MMOZEMO DAKLE SADA RUNN-OVATI QUERY
    // A ZNAMO DA JE SA FRONTENDA POSLAT board_id 

    // PRAVICEMO DVA QUERY-JA, ZATO KORISTIMO
    // Promise.all,, JER ZELIMO DA SE DVA QUERY-JA IZVRSE, PRE NEGO
    // STO POCNEMO DA RADIMO BILO STA DRUGO

    // $1 UKAZUJE NA REDNI BROJ VARIJABLE, KOJU PROSLEDJUJES U ARRAY-U, KOJI JE DRUGI ARGUMENT QUERY-JA
    // OVO SE RADI ZBOG SPRECAVANJE SQL INJECTION-A, O CEMU CEMO GOVORITI U SLEDECEM BRANCH-U

    const [commentResponse, boardResponse] = await Promise.all([
      client.query("SELECT * FROM comments NATURAL LEFT JOIN rich_content WHERE board_id=$1", [
        search
      ]),
      client.query("SELECT * FROM boards WHERE board_id = $1", [search])
    ])

    res.json({
      status: "ok",
      board: boardResponse.rows[0] || {},
      comments: commentResponse.rows
    }).end()


    client.release()




  })

  const PORT = process.env.PORT || 3000;
  app.use(express.static("./static"))
  app.listen(PORT);

  console.log(`running on http://localhost:${PORT}`)
}

init();