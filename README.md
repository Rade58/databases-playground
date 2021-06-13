# SQL INJECTION

ZASTO SMO KORISTILI `$1` DA REFERENCIRAMO PARAMETAR IZ ARRAY-JA (DRUGOG ARGUMENTA client.query FUNKCIJE)

- `cat postgres/server.ts`

```ts
import express from 'express'
import {Pool} from 'pg'

const pool = new Pool({
  connectionString: "postgresql://postgres:schism@localhost:5432/message_boards"
})

function init() {

  const app = express();

  app.get("/find", async (req, res) => {

    const client = await pool.connect()

    const search = req.query.search as string;

    const [commentResponse, boardResponse] = await Promise.all([
      client.query("SELECT * FROM comments NATURAL LEFT JOIN rich_content WHERE board_id=$1", [
        search
      ]),
      // GOVORIM RECIMO O OVOME
      client.query("SELECT * FROM boards WHERE board_id = $1", 
        [
          // $1 REFERENCIRA OVO
          search
        ]
      )
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
```

# DA SI KORISTIO TEMPLATE STRING UMESTO `$<number>` SINTAKSE, MOGAO BI BITI RANJIV NA NESTO STA SE ZOVE `SQL INJECTION`

I SAM ZNAS DA TI MOZES PISATI SUBQUERY-JE

**E PA STA DA MALICIOUS USER OBEZBEDI NEKI SUBQUERY**

PA ON BI MOGAO STVARNO URADITI NESTO LOSE

USER JE MOGAO UNETI NESTO POPUT `; DROP TABLE users;`

**`$<number>` SINTAKSU KORISTIMO, KAKO BI POSTGRES DRIVER MOGAO DA PROVERI DA LI JE ARGUMENT ANOTHER SQL KLAUZULA, KAKO BI MOGAO DA TO SPRECI AKO JESTE**

# DAKLE NAJVAZNIJA STVAR U OVOM WORKSHOPU KOJU MOZES NAUCITI, JESTE DA NIKAD DIREKTNO NE PASS-UJES ARGUMENTS INTO SQL QUERY

NIKAD NE KORISTI TEMPLATE STRING

MOGU SE DESITI STRASNE STVARI

