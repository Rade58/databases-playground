# SUB-QUERIES

OVO CES NAJBOLJE RAZUMETI AKO KRENES OD PROBLEMA

**RECIMO DA TREBAS DA QUERY-UJES ZA SVIM KOMENTARIMA, KOJE JE NARAVIO JEDAN USER SA SPECIFIC `full_name` FIELDOM**

KAKO TO URADITI, KADA ZNAS DA OVDE MORAS QUERY-OVATI NA SLEDECI NACIN: MORAS PRONACI user_id ZA TOG USERA, A  TO ZNACI DA MORAS QUERY-OVATI users KOLEKCIJU, PA ONDA KADA DOBIJES full_name NA TAJ NACIN, MORAS ONDA DA GA UZMES I NAPRAVIS QUERY U ZA RECORDISMA comments KOLEKCIJE, KOJI SVI IMAJU, POMENUTI user_id

DA TO JE ZAISTA MOGUCE RADITI, JER TI MOZES U KLAUZULAMA PISATI I SUBQUERIES

SADA CU NAPIATI QUERY, DA UZMEM SVE KOMENTARE ZA USER-A `"Maynord Simonich"`, ODNONO USERA, KOJI IMA full_name FIELD SA VREDNOSCU `"Maynord Simonich"`

- `SELECT comment_id, LEFT(comment, 20) AS preview FROM comments WHERE comments.user_id = (SELECT user_id FROM users WHERE users.full_name = 'Maynord Simonich');`

EVO ST SAM DOBIO

```zsh
 comment_id |       preview        
------------+----------------------
        208 | Nullam porttitor lac
        275 | Sed sagittis. Nam co
        624 | Integer ac leo. Pell
        917 | Cras mi pede, malesu
(4 rows)
```
