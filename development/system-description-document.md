# System Description Document

*System specification document (simple) such as data flow diagrams of components or screens, relationship of entities, contracts API, etc.*

## Contracts API

*For more information, see [RESTful Contracts API Guide](https://www.signom.com/api/rest/docs/).*

### 1. Get infomation user when login (`loginUser`)

Http request: `localhost:8080/app/user/login`

```json
POST /app/user/login HTTP/1.1
Content-Type: application/json;charset=UTF-8
Host: localhost

{
    "emailOrPhone" : "mihoang97@mail.com",
    "password" : "nguyenhoangmi",
    "type" : "email"
}

OR

{
    "emailOrPhone" : "0981234567",
    "password" : "nguyenhoangmi",
    "type" : "phone"
}
```

Reponse

```json
"data": {
    "errors": {},
    "status": 0,
    "user": {
        "address": "Tp HCM",
        "birthday": "25/10/2018",
        "email": "mihoang97@gmail.com",
        "gender": true,
        "id": "5bbe0940a83388153cad97ee",
       "isFirstTime": false,
        "memberAt": "01/01/2018",
        "money": 1000000,
        "name": "Nguyen Hoang Mi",
        "phone": 932311434
    }
}
```

### 2. etc

## Sequence Diagrams

### 1. Sequence diagram for Change information user

If user is not authenticated, user can change:

- Name
- Mail
- Phone
- Address
- Birthday
- Gender

Else user only change:

- Address

<image src="./../assets/change-information-user.png" height="450" />

### 2. Sequence diagram for Authentication information of user

<image src="./../assets/authentication-infomation-of-user.png" width="900" />