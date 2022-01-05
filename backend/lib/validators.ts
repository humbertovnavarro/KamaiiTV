import { User } from '../types';

const MAX_USERNAME_LENGTH = parseInt(process.env.MAX_USERNAME_LENGTH || '10');
function isPositiveInt(value: any): boolean {
  return typeof value === 'number'
  && value % 1 === 0
  && value > 0;
}

function validateUser(user: any) {
  return isPositiveInt(user.id)
  && Object.keys(user).length === 2;
}

export { isPositiveInt, validateUser };
