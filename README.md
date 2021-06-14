# REDIS MATHEMATICAL COMMANDS

SJANA STVR SA REDISOM JESTE DA: IT CAN DO SOME MATH FOR YOU

RECIMO DA KEEP-UJEMO TRACK OF visits TO OUR SITE

```zsh
127.0.0.1:6379> SET visits 0
OK
```

UMESTO SETING-A MI MOZEMO KORISTITI `INCR` CIME MOZEMO INCREMENTIRATI VREDNOST

```zsh
127.0.0.1:6379> INCR visits
(integer) 1
127.0.0.1:6379> INCR visits
(integer) 2
127.0.0.1:6379> INCR visits
(integer) 3
```

```zsh
127.0.0.1:6379> GET visits
"3"
```

## MOZES KORISTITI I `DECR`, ODNONO DECREMENT

```zsh
127.0.0.1:6379> DECR visits
(integer) 2
127.0.0.1:6379> DECR visits
(integer) 1
127.0.0.1:6379> DECR visits
(integer) 0
127.0.0.1:6379> DECR visits
(integer) -1
127.0.0.1:6379> DECR visits
(integer) -2
127.0.0.1:6379> DECR visits
(integer) -3
127.0.0.1:6379> DECR visits
(integer) -4
```


