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


Testing Risk Score POST endpoint

|  №  | Name                                                                        |                                 Testing data                                 |
|:---:|:----------------------------------------------------------------------------|:----------------------------------------------------------------------------:|
|  1  | Unsuccessful risk score calculation with null data in the body; 400         | income:null,debt:null,age:null,employed:true,loanAmount:null,loanPeriod:null |
|  2  | Unsuccessful risk score calculation with invalid data in the debt, age; 400 |      income:1,debt:-5,age:15,employed:true,loanAmount:500,loanPeriod:6       |
|  3  | Successful positive low risk level calculation; 200                         |    income:20000,debt:0,age:30,employed:true,loanAmount:500,loanPeriod:12     |
|  4  | Successful positive medium risk level calculation; 200                      |     income:20000,debt:0,age:30,employed:true,loanAmount:500,loanPeriod:6     |
|  5  | Successful negative high risk level calculation; 200                        |     income:100,debt:0,age:17,employed:true,loanAmount:1000,loanPeriod:12     |