# DAKLE PARAVIM SIMPLE NODEJS APP, KOJI KORISTI MONGO

SVI [CODE SAMPLES SU OVDE, U OVOM GITHUB REPO-U](https://github.com/btholt/db-samples)

- `mkdir mongodb`

VIDECES I SAM STA IMA U TOM FOLDERU

# DA POKRENEMO PRVO DOCKER IMAGE I DA POPULATE-UJEMO DATABASE, ONDOSNO 'adoption' DATBASE, TACNIJE NJEGOVU 'pets' KOLEKCIJU SA MNOSTVOM DOKUMENATA

- `docker run --name test-mongo -dit -p 27017:27017 --rm mongo:4.4.1`

- `docker exec -it test-mongo mongo`

- `show dbs`

- `use adoption`

- `db.pets.insertMany( Array.from({ length: 10000 }).map((_, index) => ({ name: [ "Luna", "Fido", "Fluffy", "Carina", "Spot", "Beethoven", "Baxter", "Dug", "Zero", "Santa's Little Helper", "Snoopy", ][index % 9], type: ["dog", "cat", "bird", "reptile"][index % 4], age: (index % 18) + 1, breed: [ "Havanese", "Bichon Frise", "Beagle", "Cockatoo", "African Gray", "Tabby", "Iguana", ][index % 7], index: index, })) );`

TO RADIM, JER CU MOCI DA VIDIM ODMH, KAKO CE MOJA APLIKACIJA DOBIJATI REZULTATE FROM QUERYING,A, A DA NISAM POPULATE-OVAO NE BI IMAO STA DA QUERY-UJEM

MOZEMO DA POKRENEMO APP

- `cd mongodb`

- `yarn start`

## MEDJUTIM PRE NEGO STO POCNEMO A TESTIRAMO APLIKACIJU, TREBLO BI DA PODESIMO, ODNOSNO KREIRAMO TEXT SEARCH INDEX ZA pets KOLEKCIJU, POSTO SERVER SIDE, MI TEXT SEARCH NACIN KORISTIMO ZA QUERYING

[KAKO SE KREIRAO TEXT SEARCH INDEXES, MOZES VIDETI OVDE](https://github.com/Rade58/databases-playground/tree/0_1_1_TEXT_SEARCH_INDEXES)

I DALJE SMO U MONGO SHELL-U CONTAINER-A, I DALJE KORISTIMO adoption DATABASE, ZATO KUCAMO SLEDECE

- `db.pets.createIndex({type: "text", name: "text", breed: "text"})`

# SAD MOZEMO DA KORISTIMO NASU APLIKACIJU, ODNONO DA PROBAMO DA QUERY-UJEMO, TAKO STO CEMO DATI STRING, U KOJEM CE BITI TYPE, NAMI I BREED ANIMAL-A

NA PRIMER OVO `"beagle dog fido"`

I ZAISTA MOGA SAM VIDETI SEARCH RESULTS U BROWSER-U
