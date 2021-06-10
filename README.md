# PostgreSQL

POKRENUCEMO CONTAINER, U KOJEM CE RUNN-OVATI VERZIJA `13.0` VERIJA `PostgreSQL`-A

- `docker run --name test-postgres -e POSTGRES_PASSWORD=schism -p 5432:5432 -d -rm postgres:13.0`

KAO STO VIDIS OVDE KORISTIMO: Run container in background and print container ID (-d FLAG, ODNOSNO --detach)

NE KORISTIMO -it FLAGOVE, KAO SA MONGO-OM

NARAVNO -e PREDSTAVLJA ENVIROMNT VARIABLE

`-rm` REMOVE-UJE LOGS KADA SE CONTAINER ZAUSTAVI SA `docker kill <containr id>` ILI `docker stop <container id>`