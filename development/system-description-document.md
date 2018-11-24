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
{
    "status": 0,
    "errors": {},
    "user": {
        "id": "5bbe0940a83388153cad97ee",
        "name": "Nguyen Hoang Mi",
        "phone": 981311224,
        "money": 1000000,
        "gender": true,
        "memberAt": "01/01/2018",
        "address": "Tp HCM",
        "email": "mihoang97@gmail.com",
        "birthday": "1/11/2018",
        "isFirstTime": false
    }
}
```

### 2. Change information user

Http request: `localhost:8080/app/user/update-information-user`

```json
POST /app/user/update-information-user HTTP/1.1
Content-Type: application/json;charset=UTF-8
Host: localhost

{
  "name": "Hoang Mi Nguyen",
  "phone": 934363423,
  "gender": false,
  "address": "Ha Noi",
  "email": "hoangmi97@gmail.com",
  "birthday": "12/1/2019"
}
```

Reponse

```json
// success
{
    "status": 0,
    "errors": {},
    "user": {
        "id": "5bbe0940a83388153cad97ee",
        "name": "FFFFFnsdsdg long Hoasdsdsssdngh",
        "phone": 932311434,
        "money": 1000000,
        "gender": false,
        "memberAt": "01/01/2018",
        "address": "Hóc Môn, Hồ Chí Minh",
        "email": "81113tienlx97@gmail.com",
        "birthday": "12/1/2019",
        "isFirstTime": false
    }
}

// false
{
    "status": 1,
    "errors": {
        "phone": "update information user error because phone not exist "
    },
    "user": {}
}
```

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

### References

- PropTypes in React Native: [https://hackernoon.com/are-you-using-proptypes-in-react-native-6067e2e5b526](https://hackernoon.com/are-you-using-proptypes-in-react-native-6067e2e5b526)

- React Binding Patterns: [https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)

    What is line code doing?

    ```javascript
    <Input  
        iconType = "MCIcons"
        iconName = "human-greeting" 
        placeholder = "name"
        onChangeText={this.setUsername.bind(this)} // << here doing?
        value = { user.name }
    />
    ```