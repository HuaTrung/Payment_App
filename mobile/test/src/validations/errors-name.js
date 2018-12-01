const NAME_EMPTY = 'name is required';

const ADDRESS_EMPTY = 'address is required';

const EMAIL_EMPTY = 'email is required';
const EMAIL_INVALID = 'email is invalid';

const BIRTHDAY_LESS_CURRENT_DATE = 'birthday must less than current day'
const BIRTHDAY_GREATER_FIFTEEN = 'birthday must greater than fifteen year old'
const PASSWORD_EMPTY = 'password is required';
const PASSWORD_NOT_ENOUGH = 'at least 8 character';
const PASSWORD_NOT_UPPER_CHARACTER = 'must contain upper character';
const PASSWORD_NOT_LOWER_CHARACTER = 'must contain lower character';
const PASSWORD_TOO_STRENGTH = 'not exceed 16 character';

const USERNAME_EMPTY = 'username is required';
const USERNAME_INVALID = 'username incorrect';

const CONFIRM_PASSWORD_INCORRECT = 'confirm password incorrect';
const CONFIRM_PASSWORD_EMPTY = 'confirm password is require';

const PHONE_EMPTY = 'phone is required';
const PHONE_INVALID = 'phone is invalid';

const VERIFY_CODE_EMPTY = 'verify code is required';

const USERNAME_EXIST = 'username existed';
const USERNAME_FIRST_NUMBER = 'username begin with number';

const EMAIL_EXIST = 'email existed';
const PHONE_EXIST = 'phone existed';

const TOKEN_ERROR = 'send code error';

const NOT_VERIFY =  'user not verify';

const PASSWORD_NOTCORRECT = 'password not correct';

const EMAIL_PHONE_EMPTY = 'email or phone is required';

const EMAIL_PHONE_INVALID = 'email  or phone incorrect';

export {
    EMAIL_PHONE_EMPTY,
    EMAIL_PHONE_INVALID,
    NAME_EMPTY,

    EMAIL_EMPTY,
    EMAIL_INVALID,

    PASSWORD_EMPTY,
    PASSWORD_NOT_ENOUGH,
    PASSWORD_NOT_UPPER_CHARACTER,
    PASSWORD_TOO_STRENGTH,
    PASSWORD_NOT_LOWER_CHARACTER,

    USERNAME_INVALID,
    USERNAME_EMPTY,
    USERNAME_FIRST_NUMBER,

    CONFIRM_PASSWORD_INCORRECT,
    CONFIRM_PASSWORD_EMPTY,

    VERIFY_CODE_EMPTY,

    PHONE_INVALID,
    PHONE_EMPTY,

    USERNAME_EXIST,
    EMAIL_EXIST,
    PHONE_EXIST,

    TOKEN_ERROR,

    NOT_VERIFY,
    PASSWORD_NOTCORRECT,

    ADDRESS_EMPTY,

    BIRTHDAY_LESS_CURRENT_DATE,
    BIRTHDAY_GREATER_FIFTEEN
};