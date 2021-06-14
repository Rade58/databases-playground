# REDIS DATA TYPES

DO SADA SMO SAMO UPOTREBLJAVALI STRINGOVE

```zsh
127.0.0.1:6379> SET some_num 8
OK
127.0.0.1:6379> GET some_num
"8"
```

KAO STO VIDES `8` SE NAZALI IMEDJU `""`, I TO ZNACI DA JE TO STRING

**A MOZEMO I SA `TYPE` DA PROVERIMO KOJI JE TYPE U PITANJU**

```zsh
127.0.0.1:6379> TYPE some_num
string
```

U TOM KAKPACITETU SVE JE STRING, REDIS DOESN'T CARE ABOUT NUMBERS

PA CAK IAKO KORISTIS `INCR` ILI `DECR` TI CES DOBITI STRINGOVE, KAO POVRATNU VREDNOST

## STRINGOVI SU I BINARY SAFE

TEHNICKI CELE IMAGE-OVE TI MOZES STORE-OVATI KAO STRINGOVE

AKO TREBAS TEMPORARY DA STORE-UJES NESTO LARGE, POPUT IMAGE-A INA CACH, TI MOZES KORISTITI REDIS, ALI SE TU OBICNO KORISTI CACHE NGINX-A, NA PRIMER

# KAO TYPE U REDISU, POSTOJE I LISTS, SETS, SORTED SETS, HASHES, HYPER LOG LOGS I STREAMS

STREAMS SU BRAND NEW I O NJIMA NECEMO GOVORITI

# POCECEMO SA LISTAMA

TO SU ARRAYS U SUSTINI

# DA KREIRAMO ARRAY KORISTIMO NESTO STO SE ZOVE RIGHT PUSH, TO JE USTVARI STACKING, A OZNACAVAMO TO SA `RPUSH`

MOZEMO NAPRAVITI TO DO LIST

- `RPUSH notifications:rade "Izbaci Smece" "Nahrani vidru" "Slozi knjige" "Odigraj boogie voogie"`

KAO POVRATNU VREDNOST DOBIJAS BROJ ITEM-A

```zsh
(integer) 4
```

### MEDJUTIM DA BI SMO UZELI ARRAY IL IDELOVE ARRAY-A, KORISTIMO `LRANGE` I POSTAVLJAMO BROJEVE, KOJI ODREDJUJU RANGE

`0` `-1` BUKVALNO ZANCI: **IDI OD POCETKA DO KRAJA ARRAY-A**

- `LRANGE notifications:rade 0 -1`

```zsh
1) "Izbaci smece"
2) "Nahrani vidru"
3) "Slozi knjige"
4) "odigraj boogie voogie"
```

MOGU O POMENUTOME DA RAZMISLAM KAO GET-U ZA ARRAYS, ODNOSNO LISTE

**MOGUCE JE DA OMMIT-UJES NEKE ITEMA, NA POCETKU ILI NA KRAJU, INKREMENTIAJUCI ONU NULII, ILI DECREMENTIRAJUCI BROJ JEDAN**

POKUSACU DA NA TKKAV NACIN UZMEM DVA CENTRALNA CLANA LISTE


- `LRANGE notifications:rade 1 -2`

```zsh
1) "Nahrani vidru"
2) "Slozi knjige"
```

### DA OBRAIN-UJEMO POSLEDNJEG MEMBER-A, ALI DA GA ISTOVREMENO UKLONIMO IZ LISTE, KORISTIMO `RPOP`

```zsh
127.0.0.1:6379> RPOP notifications:rade
"odigraj boogie voogie"
```

SADA LISTA VISE NECE IMATI, GORNJI ITEM

```zsh
127.0.0.1:6379> LRANGE notifications:rade 0 -1
1) "Izbaci smece"
2) "Nahrani vidru"
3) "Slozi knjige"
```

### DA OBRAIN-UJEMO PRVOG MEMBER-A, ALI DA GA ISTOVREMENO UKLONIMO IZ LISTE, KORISTIMO `LPOP`

```zsh
127.0.0.1:6379> LPOP notifications:rade
"Izbaci smece"
127.0.0.1:6379> LRANGE notifications:rade 0 -1
1) "Nahrani vidru"
2) "Slozi knjige"
```

### SA `LTRIM`, MOZES UKLONITI MULTIPLE MEMBERS SA POCETKA

# SADA CEMO DA GOVORIME O `HASH`-EVIMA, KOJI SU USTVARI OBJEKTI

KORISTI SE KOMANDA `HMSET`

- `HMSET movies title "Sex and Videotapes" gendre "non comedy"`

A ZA OBTAINING PROPERTIJA KORISTIS `HMGET`

```zsh
127.0.0.1:6379> HMGET movies title
1) "Sex and Videotapes"
```

ZA UZIMANJE CELOG OBJEKTA KORISTIS `HGETALL`

```zsh
127.0.0.1:6379> HGETALL movies
1) "title"
2) "Sex and Videotapes"
3) "gendre"
4) "non comedy"
```

ALI TI JE SVE SPREADED I KLJUCEVI I VALU-OVI

# SETOVI

BOLJE DA POKAZEM OVO PREKO PRIMERA NEGO DA BIL OSTA OBJASNJAVAM

SET-OVI SU USTVARI LISTE U KOJIMA NEMAS DUPLIKATE (TO SE SECAM IZ PYTHON-A)

ZADAJES SA `SADD`

```zsh
127.0.0.1:6379> SADD colors:rade red green blue yellow yellow
(integer) 4
```

EVO SA `SMEMBERS`, LIST-UJES SVE ITEM-E, **I KAO STO VIDIS DA SET KREIRAM SA DUPLIKATOM, NIJE MI TO USPELO JER SET DAKLE NEMA DUPLIKATE**

```zsh
127.0.0.1:6379> SMEMBERS colors:rade
1) "yellow"
2) "blue"
3) "green"
4) "red"

```

A PROVERAVAS DA LI IMA NEKI MEMBER, KORISTIS `SISMEMBER`

```zsh
127.0.0.1:6379> SISMEMBER colors:rade tinky
(integer) 0
```

# EVO TI LINK ZA OSTALE TYPE-OVE, I ZA METODE, SA KOJIMA SE ONE PRAVE I KORISTE

NA OVOJ STRANICI IMAS MNOG LINKOVE KOJI TE VODE DO MESTA GDE SU TI OBJASNJENE OSTALE KOMANDE

<https://btholt.github.io/complete-intro-to-databases/redis-data-types>



