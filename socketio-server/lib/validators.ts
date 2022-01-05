import { User } from '../types';

const MAX_USERNAME_LENGTH = parseInt(process.env.MAX_USERNAME_LENGTH || '10');
const VALID_USERNAME_CHARS = /^[a-zA-Z0-9_]+$/;


function isPositiveInt(value: any): boolean {
  return typeof value === 'number'
  && value % 1 === 0
  && value >= 0;
}

function isValidUserName(value: any) {
  return typeof value === 'string'
  && value.length > MAX_USERNAME_LENGTH
  && VALID_USERNAME_CHARS.test(value);
}


function validateUser(user: User) {
  return isPositiveInt(user.id)
  && isValidUserName(user.username)
  && Object.keys(user).length === 2;
}

export { isPositiveInt, isValidUserName, validateUser };
