Testing PUT endpoint

|  №  | Name                                           |   Testing data    |
|:---:|:-----------------------------------------------|:-----------------:|
|  1  | Successful order change with correct id        |     1, 5, 10      |
|  2  | Unsuccessful order change with incorrect id    |       0, 11       |
|  3  | Unsuccessful order change with id null         |       null        |
|  4  | Unsuccessful order change with invalid id      |      'test'       |
|  5  | Unsuccessful order change with invalid api-key |  123456789012345  |

Testing Delete endpoint

|  №  | Name                                           |   Testing data    |
|:---:|:-----------------------------------------------|:-----------------:|
|  1  | Successful order delete with correct id        |     1, 5, 10      |
|  2  | Unsuccessful order delete with incorrect id    |       0, 11       |
|  3  | Unsuccessful order delete with id null         |       null        |
|  4  | Unsuccessful order delete with invalid id      |      'test'       |
|  5  | Unsuccessful order delete with invalid api-key |  123456789012345  |

Testing GET endpoint

| № | Name                                                             |   Testing data   |
|:-:|:-----------------------------------------------------------------|:----------------:|
| 1 | Successful authorisation with correct data and returning api-key | 'test', 'test123 |
| 2 | Unsuccessful authorisation with null name                        |       null       |
| 3 | Unsuccessful authorisation with null password                    |       null       |