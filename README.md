# Redis

STANDS FOR: `"REMOTE DICTIONARY STORE"`

## POKRENUCEMO CONTAINER SA REDISOM

- `docker run -dit --rm --name=my-redis -p 6379:6379 redis:6.0.8`

## PA CEMO KORISTITI REDIS CLI

- `docker exec -it my-redis redis-cli`

## KORISTICEMO SADA REDIS SIMPLE WAY POSIBLE

PODESICEMO KEY-VALUE

```zsh
127.0.0.1:6379> SET name "Rade Bajic"
OK
127.0.0.1:6379> 
```

UZECEMO name

```SH
127.0.0.1:6379> GET name
"Rade Bajic"
127.0.0.1:6379> 
```