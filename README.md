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

# MOZES KORISTITI I `DECR`, ODNONO DECREMENT

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

```zsh
127.0.0.1:6379> GET visits
"-4"
```

# MOZEMO I INCREMENTIRATI ZA SPECIFIC VALUE, ILI DECREMENTIRATI ZA SPECIFIC VALUE, KORISCENJEN `INCRBY` I `DECRBY`

```zsh
127.0.0.1:6379> SET rade:apples 58
OK
127.0.0.1:6379> SET rade:oranges 12
OK
127.0.0.1:6379> INCRBY rade:oranges 8
(integer) 20
127.0.0.1:6379> DECRBY rade:apples 28
(integer) 30
```

# MOZEMO PRAVITI MULTIPLE SET-OVA AT ONECE, KORISCENJEM `MSET`

```zsh
127.0.0.1:6379> MSET score:nugets 69 score:clipers 58
OK
```

EVO DA VIDIM DA LI SAM USPESNO SET-OVAO POMENUTE STVARI

```zsh
127.0.0.1:6379> GET score:nugets
"69"
127.0.0.1:6379> GET score:clipers
"58"
```

# ALI MOZEMO DA KORISTIMO `MGET` DA UZMEMO VISE STVARI AT THE SAME TIME

```zsh
127.0.0.1:6379> MGET score:clipers score:nugets
1) "58"
2) "69"
```

# MOGUCE JE I PROVERA DA LI NESTO POSTOJI, KORISCENJE `EXISTS`

AKO POSTOJI, DOBIJA SE `1`

```zsh
127.0.0.1:6379> EXISTS score:nugets
(integer) 1
```

AKO NE POSTOJI, DOBIJA SE `0`

```zsh
127.0.0.1:6379> EXISTS something
(integer) 0
```

# DELETING JE MOGUC SA `DEL`

```zsh
127.0.0.1:6379> DEL score:clipers
(integer) 1
```

```zsh
127.0.0.1:6379> EXISTS score:clipers
(integer) 0
```

## ALI U 96% SLUCJEVA SE KORISTI `SET` I `GET`
